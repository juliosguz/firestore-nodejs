require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccountKey = require(`./keys/${process.env.FIREBASE_SERVICE_ACCOUNT}`)

// Configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const firestoreDB = admin.firestore()

// firestoreDB.collection('products').add({
//   name: `Arroz ${Date.now()}`,
//   price: 666,
//   quantity: 123
// })

// console.log('Collection reference: ', firestoreDB.collection('products').get())

firestoreDB
  .collection('products')
  .get()
  .then(data => {
    data.forEach(document => {
      console.log(document.id)
      console.log(document.data())
    })
  })
