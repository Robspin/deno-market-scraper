import { SentimentProviders } from './config.ts'

export type SentimentKey = 'capitulation' | 'bearish' | 'neutral' | 'bullish' | 'euphoric'

export type Sentiment = {
    name: SentimentKey
    score: number
}

export type SentimentProviderResponse = {
    sentiment: Sentiment
    details: string[]
}

export type MarketSentimentRow = {
    name: string
    sentimentProviders: {
        "name": SentimentProviders
        "sentiment": {
            "name": SentimentKey
            "score": number
        },
        "details": string[]
    }[]
}