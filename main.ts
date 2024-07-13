import { writeJsonToFile } from './utils/helpers/write-to-json.ts'
import { collectMarketSentiment } from './collect-market-sentiment.ts'
import { env } from './utils/constants.ts'


Deno.cron("Collect and write market sentiment", env.CRON_SETTINGS ?? '', async () => {
    const marketSentiment = await collectMarketSentiment()
    await writeJsonToFile(marketSentiment, `./temporary-json/${new Date().toISOString()}.json`)
})
