const firestore = require('./database').firestore

const usersRef = firestore.collection('users')

const getAll = async () => {
  const usersArray = []
  const users = await usersRef.get()

  users.forEach(user => {
    usersArray.push({
      id: user.id,
      ...user.data()
    })
  })
  return usersArray
}

const createUser = async () => {
  const newUser = await usersRef.add({
    firstName: 'Sergio',
    lastName: 'Perez',
    age: 28,
    salary: 6666,
    creationDate: new Date()
  })
  return newUser
}

const getUser = async (userId) => {
  const user = await usersRef.doc(userId).get()
  return user
}

module.exports = {
  getUser,
  getAll,
  createUser
}
