import { Meteor } from 'meteor/meteor'
import { db } from './mysqlConnection'
import argon2 from 'argon2'
import { check } from 'meteor/check'

export const userMethods = {
    'getUsers': async function () {
        try {
            const users = await db.executeQuery('SELECT * FROM users')
            return users
        } catch (error) {
            throw new Meteor.Error('database-error', error.message)
        }
    },
    'registerUser': async function (email, password) {
        check(email, String)
        check(password, String)
    
        const [exists] = await db.executeQuery('SELECT id FROM users WHERE email = ?', [email])
        if (exists.length > 0) {
          throw new Meteor.Error('email-exists', 'このメールアドレスは既に登録されています。')
        }

        const password_hash = await argon2.hash(password)
console.log(password_hash)
        const result = await db.executeQuery('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [email, email, password_hash])
    
        return { userId: result.insertId, email }
    },
    'verifyLogin': async function (email, password) {
        check(email, String)
        check(password, String)

        const rows = await db.executeQuery('SELECT id, password_hash FROM users WHERE email = ?', [email])

        if (rows.length === 0) return false
    
        const user = rows[0]
        const isValid = await argon2.verify(user.password_hash, password)
        return isValid ? user.id : false
    }
}

