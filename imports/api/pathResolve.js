import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 絶対パスに変換
export const path_resolve = function(tmpPath) {
    return path.resolve(__dirname, tmpPath)
}
