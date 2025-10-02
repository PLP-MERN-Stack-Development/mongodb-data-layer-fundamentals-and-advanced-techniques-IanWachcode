// Note: Run these in mongosh after you’ve inserted the sample data and switched to the database:

// ---------- Basic Reads / CRUD ----------  

// 1) Find all books in a specific genre (example: "Fantasy")  
db.books.find({ genre: "Fantasy" }).pretty();  

// 2) Find books published after a certain year (example: after 2000)  
db.books.find({ published_year: { $gt: 1950 } }).pretty();  

// 3) Find books by a specific author (example: "George Orwell")  
db.books.find({ author: "George Orwell" }).pretty();  

// 4) Update the price of a specific book (example: set "The Hobbit" price to 16.99)  
db.books.updateOne(  
  { title: "The Hobbit" },  
  { $set: { price: 16.99 } }  
);  

// Confirm update  
db.books.find({ title: "The Hobbit" }, { title: 1, price: 1, _id: 0 }).pretty();  

// 5) Delete a book by its title (example: delete "Moby Dick")  
db.books.deleteOne({ title: "Moby Dick" });  

// Confirm deletion (should return 0 results)  
db.books.find({ title: "Moby Dick" }).pretty();  


// ---------- Task 3: Advanced Queries ----------  

// 1) Find books that are both in stock and published after 2010  
db.books.find(  
  { in_stock: true, published_year: { $gt: 2010 } }  
).pretty();  

// 2) Use projection to return only title, author, and price fields  
db.books.find(  
  { in_stock: true, published_year: { $gt: 2010 } },  
  { title: 1, author: 1, price: 1, _id: 0 }  
).pretty();  

// 3) Sorting by price ascending  
db.books.find(  
  {},  
  { title: 1, price: 1, _id: 0 }  
).sort({ price: 1 }).pretty();  

// Sorting by price descending  
db.books.find(  
  {},  
  { title: 1, price: 1, _id: 0 }  
).sort({ price: -1 }).pretty();  

// 4) Pagination: 5 books per page  
// Page 1 (first 5)  
db.books.find(  
  {},  
  { title: 1, author: 1, price: 1, _id: 0 }  
).sort({ title: 1 }).limit(5);  

// Page 2 (next 5)  
db.books.find(  
  {},  
  { title: 1, author: 1, price: 1, _id: 0 }  
).sort({ title: 1 }).skip(5).limit(5);  

// Page 3 (if needed)  
db.books.find(  
  {},  
  { title: 1, author: 1, price: 1, _id: 0 }  
).sort({ title: 1 }).skip(10).limit(5);  


// ---------- Task 4: Aggregation Pipelines ----------  

// 1) Average price of books by genre  
db.books.aggregate([  
  {  
    $group: {  
      _id: "$genre",  
      averagePrice: { $avg: "$price" },  
      count: { $sum: 1 }  
    }  
  },  
  { $sort: { averagePrice: -1 } } // optional sort by avg price descending  
]);  

// 2) Find the author with the most books in the collection  
db.books.aggregate([  
  {  
    $group: {  
      _id: "$author",  
      booksCount: { $sum: 1 }  
    }  
  },  
  { $sort: { booksCount: -1 } },  
  { $limit: 1 }  
]);  

// 3) Group books by publication decade and count them  
db.books.aggregate([  
  {  
    $project: {  
      title: 1,  
      published_year: 1,  
      // compute decade: e.g., 1999 -> 1990, 2005 -> 2000  
      decade: { $subtract: [ "$published_year", { $mod: [ "$published_year", 10 ] } ] }  
    }  
  },  
  {  
    $group: {  
      _id: "$decade",  
      count: { $sum: 1 },  
      books: { $push: { title: "$title", year: "$published_year" } } // optional  
    }  
  },  
  { $sort: { _id: 1 } }  
]);  


// ---------- Task 5: Indexing ----------

// 1) Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// 2) Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3) Use explain() to demonstrate performance improvement
// Example query: find by title
// Without index: run this before creating indexes (or drop them to test)
/*
db.books.find({ title: "Dune" }).explain("executionStats")
*/

// With index (after creation)
db.books.find({ title: "Deep work" }).explain("executionStats");

// Example of compound-indexed query
db.books.find({ author: "George R. R. Martin", published_year: 2018 }).explain("executionStats");

// To drop indexes and compare:
 // db.books.dropIndex("title_1")
 // db.books.dropIndex("author_1_published_year_1")