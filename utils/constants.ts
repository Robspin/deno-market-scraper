import { load } from "https://deno.land/std@0.181.0/dotenv/mod.ts"

const localEnv = await load({ allowEmptyValues: true })

export const env = {
    ICHIMOKU_TIMEFRAME: localEnv.ICHIMOKU_TIMEFRAME || Deno.env.get('ICHIMOKU_TIMEFRAME'),
    CRON_SETTINGS: localEnv.CRON_SETTINGS || Deno.env.get('CRON_SETTINGS'),

    EVENT_API_URL: localEnv.EVENT_API_URL || Deno.env.get('EVENT_API_URL'),
    EVENT_API_TOKEN: localEnv.EVENT_API_TOKEN || Deno.env.get('EVENT_API_TOKEN'),
    EVENT_API_SOURCE: localEnv.EVENT_API_SOURCE || Deno.env.get('EVENT_API_SOURCE'),

    DB_CONNECTION_STRING: localEnv.DB_CONNECTION_STRING || Deno.env.get('DB_CONNECTION_STRING'),
}
