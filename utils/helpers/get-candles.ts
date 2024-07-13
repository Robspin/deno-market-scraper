
export type CandleConfig = {
    ticker: string
    timeframe: string
    limit?: number
    reverse?: boolean
}

export const getCandles = async ({ ticker, timeframe, limit = 42, reverse = false }: CandleConfig) => {
    const candles = await (await fetch(`https://api-pub.bitfinex.com/v2/candles/trade%3A${timeframe}%3At${ticker}/hist?limit=${limit}`)).json()
    console.log(`https://api-pub.bitfinex.com/v2/candles/trade%3A${timeframe}%3At${ticker}/hist?limit=${limit}`)
    if (reverse) candles.reverse()

    return candles
}
