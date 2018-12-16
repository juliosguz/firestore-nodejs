require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccountKey = require(`./keys/${process.env.FIREBASE_SERVICE_ACCOUNT}`)

// Configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const firestoreDB = admin.firestore()

// Check README.md
firestoreDB.settings({ timestampsInSnapshots: true })

// firestoreDB.collection('products').add({
//   name: `Arroz ${Date.now()}`,
//   price: 666,
//   quantity: 123
// })

// console.log('Collection reference: ', firestoreDB.collection('products').get())

// firestoreDB
//   .collection('products')
//   .get()
//   .then(collection => {
//     console.log('Collection products')
//     collection.forEach(document => {
//       console.log(document.id)
//       console.log(document.data())
//     })
//   })

// async await
const updateProduct = async (productId) => {
  console.log(`Actualizando el producto ${productId}`)
  await firestoreDB
    .doc(`products/${productId}`)
    .update({
      newField: true,
      price: 999
    })

  console.log('Listar producto')
  const document = await firestoreDB
    .doc(`products/${productId}`)
    .get()

  console.log(`Document products/${productId}`)
  console.log(document.id)
  console.log(document.data())
}

updateProduct('8QAxnJJmYqjxkxOHDeTe')
