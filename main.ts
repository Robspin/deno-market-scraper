import { collectMarketSentiment } from './modules/collect-market-sentiment.ts'
import { env } from './utils/constants.ts'
import { insertMarketSentimentsIntoDb } from './utils/db.ts'
import { MarketSentimentRow } from './utils/types.ts'


Deno.cron("Collect and write market sentiment", env.CRON_SETTINGS ?? '', async () => {

    setTimeout(async () => {
        console.log(new Date().toISOString())
        const marketSentiments: MarketSentimentRow[] = await collectMarketSentiment()
        await insertMarketSentimentsIntoDb(marketSentiments)

        // await writeJsonToFile(marketSentiment, `./temporary-json/${new Date().toISOString()}.json`)
    }, 20000)
})
