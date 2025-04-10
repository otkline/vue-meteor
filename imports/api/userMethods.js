import { Meteor } from 'meteor/meteor'
import { db } from './mysqlConnection'

export const userMethods = {
    'getUsers': async function () {
        try {
            const users = await db.executeQuery('SELECT * FROM users')
            return users
        } catch (error) {
            throw new Meteor.Error('database-error', error.message)
        }
    },
    'getUsers2': function () {
        return 'test getUsers2'
    }
}

