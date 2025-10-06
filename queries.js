// queries.js
const { MongoClient } = require("mongodb");

// MongoDB connection URI (change if needed)
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Select the database and collection
    const db = client.db("bookstore"); // replace with your database name
    const books = db.collection("books");

    // ---------- Basic Reads / CRUD ----------

    // 1) Find all books in a specific genre (example: "Fantasy")
    const fantasyBooks = await books.find({ genre: "Fantasy" }).toArray();
    console.log("\n📚 Fantasy Books:");
    console.table(fantasyBooks);

    // 2) Find books published after a certain year (example: after 1950)
    const after1950 = await books.find({ published_year: { $gt: 1950 } }).toArray();
    console.log("\n📅 Books published after 1950:");
    console.table(after1950);

    // 3) Find books by a specific author (example: "George Orwell")
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("\n✍️ Books by George Orwell:");
    console.table(orwellBooks);

    // 4) Update the price of a specific book (example: "The Hobbit")
    const updateResult = await books.updateOne(
      { title: "The Hobbit" },
      { $set: { price: 16.99 } }
    );
    console.log(`\n💰 Updated ${updateResult.modifiedCount} document(s)`);

    // 5) Verify the updated book
    const updatedHobbit = await books.findOne({ title: "The Hobbit" });
    console.log("\n🆕 Updated 'The Hobbit':");
    console.log(updatedHobbit);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // Always close the connection
    await client.close();
    console.log("\n🔒 MongoDB connection closed.");
  }
}

run();
