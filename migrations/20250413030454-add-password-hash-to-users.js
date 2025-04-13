'use strict';

exports.up = function (db, callback) {
  db.addColumn('users', 'password_hash', {
    type: 'string',
    length: 255,
    notNull: true,
  }, callback);
};

exports.down = function (db, callback) {
  db.removeColumn('users', 'password_hash', callback);
};

exports._meta = {
  "version": 1
};
