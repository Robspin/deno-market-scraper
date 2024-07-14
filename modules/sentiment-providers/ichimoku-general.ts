// ichimoku cloud with 20 60 120 30 as settings
import { getCandles } from '../../utils/helpers/get-candles.ts'
import { Sentiment } from '../../utils/types.ts'
import { sentimentObject } from '../../utils/config.ts'

interface IchimokuData {
    tenkan: number;
    kijun: number;
    senkouA: number;
    senkouB: number;
}

interface IchimokuState {
    priceAboveTenkan: boolean;
    bullishCross: boolean;
    bullishCloud: boolean;
    priceAboveCloud: boolean;
    priceBelowCloud: boolean;
}

const findExtremeValue = (arrayAll: any[], index: number, compareFn: (a: number, b: number) => boolean) => {
    const values = arrayAll.map(int => Number(int[index]));
    return values.reduce((extreme, current) => compareFn(current, extreme) ? current : extreme, values[0]);
};

const findHighest = (arrayAll: any[]) => findExtremeValue(arrayAll, 3, (a, b) => a > b);
const findLowest = (arrayAll: any[]) => findExtremeValue(arrayAll, 4, (a, b) => a < b);

const calculateLine = (candles: string[], startSlice: number, endSlice: number) => {
    const highestHigh = findHighest(candles.slice(startSlice, endSlice));
    const lowestLow = findLowest(candles.slice(startSlice, endSlice));
    return (highestHigh + lowestLow) / 2;
};

const calculateIchimokuData = (candles: string[]): IchimokuData => ({
    tenkan: calculateLine(candles, 132, 151),
    kijun: calculateLine(candles, 92, 151),
    senkouA: (calculateLine(candles, 103, 123) + calculateLine(candles, 63, 123)) / 2,
    senkouB: calculateLine(candles, 3, 123)
});

const determinePricePosition = (currentPrice: number, senkouA: number, senkouB: number): string => {
    if (currentPrice > senkouA && currentPrice > senkouB) return 'Price above cloud';
    if (currentPrice < senkouA && currentPrice < senkouB) return 'Price below cloud';
    return 'Price in cloud';
};

const updateIchimokuState = (candles: any[], ichimokuData: IchimokuData): IchimokuState => {
    const currentPrice = candles[150][2];
    const { tenkan, kijun, senkouA, senkouB } = ichimokuData;

    return {
        priceAboveTenkan: currentPrice > tenkan,
        bullishCross: tenkan > kijun,
        bullishCloud: senkouA > senkouB,
        priceAboveCloud: currentPrice > senkouA && currentPrice > senkouB,
        priceBelowCloud: currentPrice < senkouA && currentPrice < senkouB
    };
};

const determineIchimokuSentiment = (state: IchimokuState): Sentiment => {
    const { priceAboveCloud, priceAboveTenkan, bullishCross, bullishCloud, priceBelowCloud } = state;

    if (priceAboveCloud && priceAboveTenkan && bullishCross && bullishCloud) return sentimentObject['bullish'];
    if (priceBelowCloud && !priceAboveTenkan && !bullishCross && !bullishCloud) return sentimentObject['bearish'];
    return sentimentObject['neutral'];
};

export const ichimokuGeneralSentimentProvider = async (
    ticker: string,
    timeframe: string
): Promise<{ sentiment: Sentiment; details: string[] }> => {
    const candles = await getCandles({ ticker, timeframe, limit: 152, reverse: true });
    const ichimokuData = calculateIchimokuData(candles);
    const state = updateIchimokuState(candles, ichimokuData);

    const details = [
        state.bullishCross ? 'Bullish cross' : 'Bearish cross',
        state.bullishCloud ? 'Bullish cloud' : 'Bearish cloud',
        determinePricePosition(candles[150][2], ichimokuData.senkouA, ichimokuData.senkouB)
    ]

    return {
        sentiment: determineIchimokuSentiment(state),
        details
    }
}