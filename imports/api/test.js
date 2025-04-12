import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    dotenv.config({ path: path.resolve(__dirname, '../../.env') })

    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USER)
    console.log(process.env.DB_PASSWORD)
    console.log(process.env.DB_NAME)

    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 30,
        queueLimit: 0
    })
    console.log('✅ MySQL createPool')
    const [rows] = await pool.execute('SELECT * FROM users', [])
    console.log(rows)
} catch (e) {
    console.error('❌ MySQL 接続エラー:', e)
}
