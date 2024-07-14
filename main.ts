import { collectMarketSentiment } from './modules/collect-market-sentiment.ts'
import { env } from './utils/constants.ts'
import { insertMarketSentimentsIntoDb } from './utils/db.ts'
import { MarketSentimentRow } from './utils/types.ts'
import { sendEvent } from './utils/event-api.ts'


Deno.cron("Collect and write market sentiment", env.CRON_SETTINGS ?? '', async () => {
    setTimeout(async () => {
        const marketSentiments: MarketSentimentRow[] = await collectMarketSentiment()
        await insertMarketSentimentsIntoDb(marketSentiments)

        await sendEvent(`Checked sentiment for ${marketSentiments.length} markets`)
        // await writeJsonToFile(marketSentiment, `./temporary-json/${new Date().toISOString()}.json`)
    }, 20000)
})
