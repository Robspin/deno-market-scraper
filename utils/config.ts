import { SentimentResponse } from './types.ts'
import { ichimokuGeneralSentimentProvider } from '../sentiment-providers/ichimoku-general.ts'
import { env } from './constants.ts'

type SentimentProviders = 'ICHIMOKU_GENERAL'

const sentimentFunctions: {[key in SentimentProviders]: any } = {
    'ICHIMOKU_GENERAL': (ticker: string) => ichimokuGeneralSentimentProvider(ticker, env.ICHIMOKU_TIMEFRAME ?? '1d')
}

type Markets = {
    name: string
    image?: string
    sentimentFunction: () => Promise<SentimentResponse>
}

export const markets: Markets[] = [
    {
        name: 'BTC',
        sentimentFunction: () => sentimentFunctions['ICHIMOKU_GENERAL']('BTCUSD')
    },
    {
        name: 'ETH',
        sentimentFunction: () => sentimentFunctions['ICHIMOKU_GENERAL']('ETHUSD')
    },
    {
        name: 'DOGE',
        sentimentFunction: () => sentimentFunctions['ICHIMOKU_GENERAL']('DOGE:USD')
    }
]
