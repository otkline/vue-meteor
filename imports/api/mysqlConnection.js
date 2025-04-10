import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config(); // .envファイル DB接続情報を読み込む

export class DB {
    constructor() {
        if (!DB.instance) {
            this.connection = mysql.createPool({
                host: process.env.MYSQL_HOST || 'mysql',
                user: process.env.MYSQL_USER || 'user',
                password: process.env.MYSQL_PASSWORD || 'password',
                database: process.env.MYSQL_DATABASE || 'meteor_db',
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
