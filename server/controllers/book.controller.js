const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { Books } = require("../models");
const axios = require("axios");

// Functions
const validateBook = async (book) => {
  const { name, author, summary, numPages } = book;
  const errors = [];

  if (!author) {
    errors.push("Must provide author.");
  }
  if (!summary) {
    errors.push("Must provide summary");
  }
  if (!numPages) {
    errors.push("Must provide number of pages.");
  } else if (numPages < 0) {
    errors.push("Number of pages must be a postive number.");
  }
  if (!name) {
    errors.push("Must provide book name.");
  } else {
    const bookExists = await Books.findAll({
      where: {
        name,
        author,
        summary,
        numPages,
      },
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unexpected error has occured please try again.");
        return errors;
      });

    if (bookExists.length) {
      errors.push("This book already exists");
    }
  }

  return errors;
};

const searchGoogleBooks = async (query) => {
  // https://developers.google.com/books/docs/v1/using#APIKey
  // intitle: Returns results where the text following this keyword is found in the title.
  // inauthor: Returns results where the text following this keyword is found in the author.
  // inpublisher: Returns results where the text following this keyword is found in the publisher.
  // subject: Returns results where the text following this keyword is listed in the category list of the volume.
  // isbn: Returns results where the text following this keyword is the ISBN number.
  // lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
  // oclc: Returns results where the text following this keyword is the Online Computer Library Center number.

  const apiResponse = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );

  const googleBooks = apiResponse.data.items.sort((a, b) => {
    if (
      a.volumeInfo.averageRating === undefined &&
      b.volumeInfo.averageRating !== undefined
    ) {
      return 1;
    } else if (
      a.volumeInfo.averageRating !== undefined &&
      b.volumeInfo.averageRating === undefined
    ) {
      return -1;
    } else if (
      a.volumeInfo.averageRating === undefined &&
      b.volumeInfo.averageRating === undefined
    ) {
      return 0;
    } else if (a.volumeInfo.averageRating < b.volumeInfo.averageRating) {
      return 1;
    } else if (a.volumeInfo.averageRating > b.volumeInfo.averageRating) {
      return -1;
    } else return 0;
  });

  return googleBooks.map((book) => {
    return {
      id: null,
      name: book.volumeInfo.title,
      imageURL:
        book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
      dateCreated: null,
      author: book.volumeInfo.authors.length && book.volumeInfo.authors[0],
      summary: book.volumeInfo.description,
      numPages: book.volumeInfo.pageCount,
    };
  });
};

// Controllers
const addBook = async (req, res) => {
  try {
    const { name, author, summary, numPages } = req.body;

    const errors = await validateBook({ name, author, summary, numPages });
    if (errors.length) {
      const response = createResponse(
        false,
        `Unable to create book ${name}`,
        errors,
        {}
      );

      return res.status(400).json(response);
    }

    const book = await Books.create({
      name,
      author,
      summary,
      numPages,
    }).catch((error) => {
      console.log(error);
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    });

    const response = createResponse(
      true,
      `Successfully created book ${name}!`,
      [],
      book
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const searchBook = async (req, res) => {
  try {
    const { q: query } = req.query;
    const googleBooks = await searchGoogleBooks(query);

    const response = createResponse(
      true,
      `Found ${googleBooks.length} books!`,
      [],
      googleBooks
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

module.exports = {
  addBook,
  searchBook,
};
