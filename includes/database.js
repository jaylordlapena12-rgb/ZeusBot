// src/includes/database.js
const { MongoClient } = require("mongodb");

let client;
let db;

async function connect() {
    if (db) return db;

    const uri = process.env.MONGO_URI; // nasa .env file mo
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // pwede mong palitan yung "myBotDB" ng pangalan ng DB na gusto mo
    db = client.db("myBotDB");

    console.log("✅ Connected to MongoDB");
    return db;
}

function getDB() {
    if (!db) throw new Error("❌ Database not connected. Call connect() first.");
    return db;
}

module.exports = { connect, getDB };
