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
  .then(collection => {
    console.log('Collection products')
    collection.forEach(document => {
      console.log(document.id)
      console.log(document.data())
    })
  })

firestoreDB
  .doc('products/8QAxnJJmYqjxkxOHDeTe')
  .update({
    nodeJSField: true,
    price: 111111
  })
  .then(() => {
    firestoreDB
      .doc('products/8QAxnJJmYqjxkxOHDeTe')
      .get()
      .then(document => {
        console.log('Document products/8QAxnJJmYqjxkxOHDeTe')
        console.log(document.id)
        console.log(document.data())
      })
  })
