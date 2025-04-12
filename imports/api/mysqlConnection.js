import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

// .envファイル DB接続情報を読み込む
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') }) 
export class DB {
    constructor() {
        if (!DB.instance) {
            this.connection = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                waitForConnections: true,
                connectionLimit: 30,
                queueLimit: 0
            })
            DB.instance = this
        }
        return DB.instance
    }

    // SQL を実行する関数
    async executeQuery(query, params = []) {
        try {
            const [rows] = await this.connection.execute(query, params)
            return rows
        } catch (error) {
            console.error('MySQL エラー:', error)
        }
    }
}

export const db = new DB()
