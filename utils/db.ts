import { drizzle } from 'npm:drizzle-orm/neon-http'
import { neon } from 'npm:@neondatabase/serverless'
import { env } from './constants.ts'
import * as schema from "../db/schema.ts"
import { marketSentiments } from '../db/schema.ts'
import { and, eq } from 'npm:drizzle-orm'
import { v4 as uuidv4 } from 'npm:uuid'
import { MarketSentimentRow } from './types.ts'
import { sendEvent } from './event-api.ts'


const sql = neon(env.DB_CONNECTION_STRING!)
const db = drizzle(sql, { schema })


export async function insertMarketSentimentsIntoDb(inputData: MarketSentimentRow[]) {
    for (const data of inputData) {
        for (const provider of data.sentimentProviders) {

            const existingEntry = await db
                .select()
                .from(marketSentiments)
                .where(
                    and(
                        eq(marketSentiments.coinName, data.name),
                        eq(marketSentiments.providerName, provider.name)
                    )
                )
                .limit(1)

            if (existingEntry.length > 0) {
                const existing = existingEntry[0];
                const changes: Partial<typeof existing> = {};

                // Check for changes
                if (existing.sentimentName !== provider.sentiment.name) {
                    changes.sentimentName = provider.sentiment.name;
                }

                if (Object.keys(changes).length > 0) {
                    await db
                        .update(marketSentiments)
                        .set({
                            ...changes,
                            updatedAt: new Date(),
                        })
                        .where(eq(marketSentiments.id, existing.id));

                    await sendEvent(`Market sentiment change! ${data.name} on ${provider.name} turned ${provider.sentiment.name}`, true)
                }
            } else {
                await db.insert(marketSentiments).values({
                    id: uuidv4(),
                    coinName: data.name,
                    providerName: provider.name,
                    sentimentName: provider.sentiment.name,
                    sentimentScore: provider.sentiment.score,
                    details: provider.details,
                })
                await sendEvent(`Created new sentiment row! ${data.name} on ${provider.name} has sentiment ${provider.sentiment.name}`)
            }
        }
    }
}