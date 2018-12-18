const admin = require('firebase-admin')
const serviceAccountKey = require(`../keys/${process.env.FIREBASE_SERVICE_ACCOUNT}`)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

module.exports = {
  firestore
}
