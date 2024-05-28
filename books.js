const express = require('express');
const router = express.Router();

// Example book data with reviews
const books = [
    { 
        isbn: '1234567890',
        title: 'Book One',
        author: 'Author One',
        reviews: [
          { userId: 'user1', review: 'Great book!' },
          { userId: 'user2', review: 'Enjoyed reading it' }
        ]
      },
      { 
        isbn: '0987654321',
        title: 'Book Two',
        author: 'Author Two',
        reviews: [
          { userId: 'user3', review: 'Highly recommend!' },
          { userId: 'user4', review: 'Must-read!' }
        ]
      },
    { 
      isbn: '1112223334',
      title: 'Book Three',
      author: 'Author Three',
      reviews: []
    },
    { 
      isbn: '5556667778',
      title: 'Book Four',
      author: 'Author Four',
      reviews: []
    },
    // Add more books with reviews as needed
  ];
  

// Route to get all books
router.get('/', async (req, res) => {
  try {
    // Simulate asynchronous operation
    const getAllBooks = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(books), 500);
      });
    };
    
    const booksData = await getAllBooks();
    res.json(booksData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get book by ISBN
router.get('/isbn', async (req, res) => {
  const isbn = req.query.isbn;
  try {
    // Simulate asynchronous operation
    const getBookByISBN = async (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books.find(b => b.isbn === isbn);
        if (book) {
          resolve(book);
        } else {
          reject('Book not found');
        }
      });
    };
    
    const book = await getBookByISBN(isbn);
    res.json(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get books by Author
router.get('/author', async (req, res) => {
  const author = req.query.author;
  try {
    // Simulate asynchronous operation
    const getBooksByAuthor = async (author) => {
      return new Promise((resolve) => {
        const authorBooks = books.filter(b => b.author === author);
        resolve(authorBooks);
      });
    };
    
    const authorBooks = await getBooksByAuthor(author);
    res.json(authorBooks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get books by Title
router.get('/title', async (req, res) => {
  const title = req.query.title;
  try {
    // Simulate asynchronous operation
    const getBooksByTitle = async (title) => {
      return new Promise((resolve) => {
        const titleBooks = books.filter(b => b.title === title);
        resolve(titleBooks);
      });
    };
    
    const titleBooks = await getBooksByTitle(title);
    res.json(titleBooks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Task 5: Get book reviews by ISBN
router.get('/:isbn/reviews', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).send('Book not found');
    }
  });


// Route to add or modify a book review
router.put('/:isbn/review', async (req, res) => {
    const isbn = req.params.isbn;
    const { userId, review } = req.body;
  
    try {
      const bookIndex = books.findIndex(book => book.isbn === isbn);
      if (bookIndex !== -1) {
        // Check if the user has already left a review for this book
        const existingReviewIndex = books[bookIndex].reviews.findIndex(r => r.userId === userId);
        if (existingReviewIndex !== -1) {
          // If the user has already left a review, modify it
          books[bookIndex].reviews[existingReviewIndex].review = review;
        } else {
          // If the user hasn't left a review yet, add a new one
          books[bookIndex].reviews.push({ userId, review });
        }
        res.status(200).send('Review added/modified successfully');
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Route to delete a book review
  router.delete('/:isbn/review', async (req, res) => {
    const isbn = req.params.isbn;
    const { userId } = req.body;
  
    try {
      const bookIndex = books.findIndex(book => book.isbn === isbn);
      if (bookIndex !== -1) {
        const reviewIndex = books[bookIndex].reviews.findIndex(r => r.userId === userId);
        if (reviewIndex !== -1) {
          // Remove the review
          books[bookIndex].reviews.splice(reviewIndex, 1);
          res.status(200).send('Review deleted successfully');
        } else {
          res.status(404).send('Review not found');
        }
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


module.exports = router;
