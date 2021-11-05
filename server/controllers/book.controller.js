const { createResponse } = require("../common/functions");
const { Books } = require("../models");

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

module.exports = {
  addBook,
};
