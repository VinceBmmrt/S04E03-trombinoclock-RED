require('dotenv').config()

// Connection à la DB
const { Client } = require('pg')
const db = new Client(process.env.DB_URL)

db.connect().then(console.log("💾 Connecté à la DB !")).catch((error) => console.log(error))

module.exports = db;