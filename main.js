require('dotenv').config()
const admin = require('firebase-admin')
const serviceAccountKey = require(`./keys/${process.env.FIREBASE_SERVICE_ACCOUNT}`)

// Configuration
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const firestoreDB = admin.firestore()
firestoreDB.settings({ timestampsInSnapshots: true })

const usersRef = firestoreDB.collection('users')

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const usersArray = []
  usersRef
    .where('lastName', '==', 'Silva')
    .orderBy('firstName')
    .get()
    .then(users => {
      users.forEach(user => {
        console.log('ID: ', user.id)
        console.log('Data: ', user.data())
        usersArray.push({
          id: user.id,
          ...user.data()
        })
      })
      res.json(usersArray)
    })
})

app.listen(port, () => console.log('Server started!'))
