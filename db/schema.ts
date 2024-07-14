import { pgTable, text, uuid, timestamp, json, integer } from 'npm:drizzle-orm/pg-core'
// import { json, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const marketSentiments = pgTable('market_sentiments', {
    id: uuid('id').primaryKey(),
    coinName: text('coin_name').notNull(),
    providerName: text('provider_name').notNull(),
    sentimentName: text('sentiment_name').notNull(),
    sentimentScore: integer('sentiment_score').notNull(),
    details: json('details').$type<string[]>().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at')
})
