const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();


let app = require('./app');


exports.app = functions.https.onRequest(app);