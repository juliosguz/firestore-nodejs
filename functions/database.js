const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

module.exports = {
  firestore
}
