import { markets, sentimentFunctions } from '../utils/config.ts'
import { MarketSentimentRow } from '../utils/types.ts'


export const collectMarketSentiment = async (): Promise<Awaited<MarketSentimentRow>[]> => await Promise.all(markets.map(async (market) => {
    const sentimentProviderResponses = await Promise.all(market.sentimentProviders.map(async (providerKey) => {
        const { sentiment, details } = await sentimentFunctions[providerKey](market.ticker)

        return {
            name: providerKey,
            sentiment,
            details
        }
    }))

    return {
        name: market.name,
        sentimentProviders: sentimentProviderResponses
    }
}))
