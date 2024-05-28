const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./books'); // Import the routes
const userRoutes = require('./users'); // Import the routes


const app = express();
app.use(bodyParser.json());

app.use('/api/books', bookRoutes); // Use the book routes
app.use('/api/users', userRoutes); // Use the user routes


const { getAllBooksAsyncCallback, searchByISBN, searchByAuthor, searchByTitle } = require('./bookUtils');

// Example usage of each method
getAllBooksAsyncCallback()
  .then(books => console.log('All books:', books))
  .catch(error => console.error('Error getting all books:', error));

searchByISBN('1234567890')
  .then(book => console.log('Book found by ISBN:', book))
  .catch(error => console.error('Error searching by ISBN:', error));

searchByAuthor('Author One')
  .then(books => console.log('Books found by author:', books))
  .catch(error => console.error('Error searching by author:', error));

searchByTitle('Book One')
  .then(books => console.log('Books found by title:', books))
  .catch(error => console.error('Error searching by title:', error));



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
