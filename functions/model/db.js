
const functions = require('firebase-functions');
const admin = require('firebase-admin');
let db = admin.firestore();

module.exports = db;