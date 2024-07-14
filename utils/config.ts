import { Sentiment, SentimentKey, SentimentProviderResponse } from './types.ts'
import { ichimokuGeneralSentimentProvider } from '../modules/sentiment-providers/ichimoku-general.ts'
import { env } from './constants.ts'

export type SentimentProviders = 'ICHIMOKU_GENERAL'

export const sentimentFunctions: {[key in SentimentProviders]: (...args: any[]) => Promise<SentimentProviderResponse> } = {
    'ICHIMOKU_GENERAL': (ticker: string) => ichimokuGeneralSentimentProvider(ticker, env.ICHIMOKU_TIMEFRAME ?? '1d')
}

type Markets = {
    name: string
    ticker: string
    image?: string
    sentimentProviders: SentimentProviders[]
}

export const sentimentObject: { [key in SentimentKey]: Sentiment } = {
    capitulation: {
        name: 'capitulation',
        score: -2,
    },
    bearish: {
        name: 'bearish',
        score: -1,
    },
    neutral: {
        name: 'neutral',
        score: 0,
    },
    bullish: {
        name: 'bullish',
        score: 1,
    },
    euphoric: {
        name: 'euphoric',
        score: 2,
    }
}

export const markets: Markets[] = [
    {
        name: 'BTC',
        ticker: 'BTCUSD',
        sentimentProviders: ['ICHIMOKU_GENERAL'],
    },
    {
        name: 'ETH',
        ticker: 'ETHUSD',
        sentimentProviders: ['ICHIMOKU_GENERAL']
    },
    {
        name: 'DOGE',
        ticker: 'DOGE:USD',
        sentimentProviders: ['ICHIMOKU_GENERAL'],
    },
    {
        name: 'SOL',
        ticker: 'SOLUSD',
        sentimentProviders: ['ICHIMOKU_GENERAL'],
    },
    {
        name: 'LTC',
        ticker: 'LTCUSD',
        sentimentProviders: ['ICHIMOKU_GENERAL'],
    },
    {
        name: 'PEPE',
        ticker: 'PEPE:USD',
        sentimentProviders: ['ICHIMOKU_GENERAL'],
    },
]
