// Imports
const { allSettled } = require('bluebird');
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./firebase/config');
const serviceAccount = require('./firebase/serviceAccount.json');

module.exports = { jsonToFirestore };


// JSON To Firestore
async function jsonToFirestore () {
  console.log('Initialzing Firebase...');
  await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
  console.log('Firebase Initialized');

  console.log('Uploading json to FireStore...');
  await firestoreService.restore('./data.json');

  return true;
};