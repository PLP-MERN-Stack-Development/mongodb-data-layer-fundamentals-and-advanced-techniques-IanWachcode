// insert_books.js - Script to populate MongoDB with sample book data

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI (replace with your MongoDB connection string if using Atlas)
const uri = 'mongodb://localhost:27017';

// Database and collection names
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  },
  {
    title: "Fire & Blood",
    author: "George R. R. Martin",
    genre: "Fantasy",
    published_year: 2018,
    price: 11.60,
    in_stock: true,
    pages: 736,
    publisher: "Bantam Books"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    published_year: 2018,
    price: 20.00,
    in_stock: true,
    pages: 320,
    publisher: "Avery"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    published_year: 2016,
    price: 17.00,
    in_stock: true,
    pages: 304,
    publisher: "Grand Central Publishing"
  },
  {
    title: "The Atlas of AI",
    author: "Kate Crawford",
    genre: "Non-fiction",
    published_year: 2021,
    price: 18.99,
    in_stock: true,
    pages: 256,
    publisher: "Yale University Press"
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    published_year: 2020,
    price: 13.50,
    in_stock: true,
    pages: 304,
    publisher: "Viking"
  },
   {
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    genre: "Science Fiction",
    published_year: 2015,
    price: 11.50,
    in_stock: false,
    pages: 640,
    publisher: "Orbit"
  },
  {
    title: "The Game of Thrones",
    author: "George R. R. Martin",
    genre: "Historical fantasy",
    published_year: 1996,
    price: 39.99,
    in_stock: false,
    pages: 694,
    publisher: "Bantam Spectra (US), HarperCollins Voyager (UK)"
  },
  {
    title: "The River Between",
    author: "Ngũgĩ wa Thiong'o",
    genre: "Novel",
    published_year: 1965,
    price: 39.99,
    in_stock: true,
    pages: 352,
    publisher: "Heinemann-African Writers Series"
  },
  {
    title: "Thinking Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Non-fiction",
    published_year: 2011,
    price: 12.03,
    in_stock: true,
    pages: 498,
    publisher: "Farrar, Straus and Giroux"
  },
  {
    title: "The Pragmatic Programmer",
    author: "harles Duhigg",
    genre: "Self-Help",
    published_year: 2012,
    price: 15.99,
    in_stock: false,
    pages: 317,
    publisher: "Random House Trade Paperbacks"
  },

];

// Function to insert books into MongoDB
async function insertBooks() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if collection already has documents
    const count = await collection.countDocuments();
    if (count > 0) {
      console.log(`Collection already contains ${count} documents. Dropping collection...`);
      await collection.drop();
      console.log('Collection dropped successfully');
    }

    // Insert the books
    const result = await collection.insertMany(books);
    console.log(`${result.insertedCount} books were successfully inserted into the database`);

    // Display the inserted books
    console.log('\nInserted books:');
    const insertedBooks = await collection.find({}).toArray();
    insertedBooks.forEach((book, index) => {
      console.log(`${index + 1}. "${book.title}" by ${book.author} (${book.published_year})`);
    });

  } catch (err) {
    console.error('Error occurred:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the function
insertBooks().catch(console.error);

/*
 * Example MongoDB queries you can try after running this script:
 *
 * 1. Find all books:
 *    db.books.find()
 *
 * 2. Find books by a specific author:
 *    db.books.find({ author: "George Orwell" })
 *
 * 3. Find books published after 1950:
 *    db.books.find({ published_year: { $gt: 1950 } })
 *
 * 4. Find books in a specific genre:
 *    db.books.find({ genre: "Fiction" })
 *
 * 5. Find in-stock books:
 *    db.books.find({ in_stock: true })
 */ 