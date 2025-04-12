import { Meteor } from 'meteor/meteor'
import { userMethods } from '/imports/api/userMethods'

Meteor.startup(async () => {
  // Meteor メソッドを定義
  Meteor.methods({...userMethods})
})
