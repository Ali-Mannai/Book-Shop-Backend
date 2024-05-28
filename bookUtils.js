const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/books'; // Update the URL as per your API

// Task 10: Get all books – Using async callback function
const getAllBooksAsyncCallback = () => {
  return new Promise((resolve, reject) => {
    axios.get(BASE_URL)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response.data));
  });
};

// Task 11: Search by ISBN – Using Promises
const searchByISBN = (isbn) => {
  return axios.get(`${BASE_URL}?isbn=${isbn}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response.data);
    });
};

// Task 12: Search by Author
const searchByAuthor = (author) => {
  return axios.get(`${BASE_URL}?author=${author}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response.data);
    });
};

// Task 13: Search by Title
const searchByTitle = (title) => {
  return axios.get(`${BASE_URL}?title=${title}`)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.response.data);
    });
};

module.exports = {
  getAllBooksAsyncCallback,
  searchByISBN,
  searchByAuthor,
  searchByTitle
};
