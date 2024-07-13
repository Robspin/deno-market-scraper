import { markets } from './utils/config.ts'


export const collectMarketSentiment = async () => await Promise.all(markets.map(async (market) => {
    const { sentiment, details } = await market.sentimentFunction()

    return {
        name: market.name,
        sentiment,
        details
    }
}))
