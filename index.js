require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccountKey = require(`./keys/${process.env.FIREBASE_SERVICE_ACCOUNT}`)

// Configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const firestoreDB = admin.firestore()
firestoreDB.settings({ timestampsInSnapshots: true })

console.log('Timezone:: ', process.env.TZ)

const updateUser = async (userId, newData) => {
  await firestoreDB
    .collection('users')
    .doc(userId)
    .update(newData)

  const response = await firestoreDB
    .doc(`users/${userId}`)
    .get()

  console.log('response.id', response.id)
  console.log('response.data', response.data())
}

updateUser('w8PvMsgiMBjPibioHND8', {
  updateDate: (new Date()).toISOString()
})

const newDocRef = firestoreDB.collection('users').doc()
newDocRef.set({ qwer: 1, asdf: 777 })

firestoreDB
  .collection('users')
  .add({ firstName: ' OMG', lastName: 'LOL' })

