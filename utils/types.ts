
export type Sentiment = 'capitulation' | 'bearish' | 'neutral' | 'bullish' | 'euphoria'

export type SentimentResponse = {
    sentiment: Sentiment
    details: string[]
}
