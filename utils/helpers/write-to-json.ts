import { ensureDir } from "https://deno.land/std/fs/mod.ts"

export async function writeJsonToFile(
    data: unknown,
    filePath: string,
    options: { indent?: number; createDir?: boolean } = {}
): Promise<void> {
    const { indent = 2, createDir = false } = options

    try {
        if (createDir) {
            const dirPath = filePath.substring(0, filePath.lastIndexOf("/"))
            await ensureDir(dirPath)
        }

        const jsonString = JSON.stringify(data, null, indent)

        await Deno.writeTextFile(filePath, jsonString)

        console.log(`Successfully wrote JSON to ${filePath}`)
    } catch (error) {
        console.error(`Error writing JSON to file: ${error.message}`)
        throw error
    }
}
