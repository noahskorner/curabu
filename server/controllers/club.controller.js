const {
  createResponse,
  createUnkownErrorResponse,
} = require("../common/functions");
const { clubTypes } = require("../common/constants");
const {
  Clubs,
  BookClubs,
  Books,
  BookClubBooks,
  Users,
  Posts,
} = require("../models");

// Variables
const clubNameRegex = /^([a-zA-Z\s']){5,25}$/;
const MAX_POST_TITLE_LENGTH = 25;
const MAX_POST_BODY_LENGTH = 255;

// Functions
const validateClub = async (name) => {
  const errors = [];

  if (!name) {
    errors.push("Must provide club name.");
  } else {
    const clubExists = await Clubs.findAll({
      where: {
        name,
      },
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unexpected error has occured. Please try again.");
        return errors;
      });

    if (clubExists.length) errors.push(`A club named ${name} already exists.`);
    if (!clubNameRegex.test(name))
      errors.push(
        "Club name can only consist of letters spaces and apostrophes."
      );
  }

  return errors;
};

const validateBookClub = async (name) => {
  const errors = await validateClub(name);
  return errors;
};

const validateClubBook = async (book) => {
  const { bookClubId, bookId, isCurrentBook, startDate, endDate } = book;

  const errors = [];

  if (startDate && new Date(startDate) >= new Date()) {
    errors.push("Start date must be today or later.");
  }
  if (endDate && endDate < startDate) {
    errors.push("End date must be after start date.");
  }
  if (isCurrentBook !== true && isCurrentBook !== false) {
    errors.push("Must provide if this will be the current book.");
  }
  if (!bookClubId) {
    errors.push("Must provide book id.");
  } else {
    const bookExists = await Books.findByPk(bookId)
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unknown error has occured. Please try again.");
        return errors;
      });

    if (!bookExists) {
      errors.push(`Book with id: ${bookId} does not exist.`);
    }
  }
  if (!bookClubId) {
    errors.push("Must provide book club id.");
  } else {
    const clubExists = await BookClubs.findByPk(bookClubId)
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unknown error has occured. Please try again.");
        return errors;
      });

    if (!clubExists) {
      errors.push(`Book with id: ${bookClubId} does not exist.`);
    }
  }

  return errors;
};

const validateClubBookUpdate = async (book) => {
  const errors = [];

  const { bookClubBookId, isCurrentBook, startDate, endDate } = book;

  const bookClubBook = await BookClubBooks.findByPk(bookClubBookId)
    .then((data) => data)
    .catch((error) => {
      console.log(error.message);
      errors.push("An unknown error has occured. Please try again.");
      return errors;
    });

  if (!bookClubBook) {
    errors.push(`Club book with id: ${bookClubBookId} does not exist.`);
  }

  if (isCurrentBook) {
    if (!startDate) {
      errors.push("Must provide start date if this is the current book.");
    } else if (new Date(startDate) <= new Date()) {
      errors.push("Start date must be today or later.");
    }
    if (endDate && endDate < startDate) {
      errors.push("End date must be after start date.");
    }
  }

  return {
    bookClubBook,
    errors,
  };
};

const removeCurrentBook = async (bookClubId) => {
  const currentBooks = await BookClubBooks.update(
    { isCurrentBook: false },
    {
      where: { bookClubId, isCurrentBook: true },
    }
  )
    .then((data) => data)
    .catch((error) => console.log(error));

  currentBooks.save();
};

const validatePost = async (post) => {
  const { userId, clubId, title, body } = post;
  const errors = [];

  const user = await Users.findByPk(userId)
    .then((data) => data)
    .catch((error) => {
      console.log(error.message);
      errors.push("An unknown error has occured. Please try again.");
      return errors;
    });

  if (!user) {
    errors.push("User does not exist.");
  } else {
    const { clubs } = user.toJSON();
    if (!clubs.some((club) => club.id === clubId)) {
      errors.push("Must belong to club to post in it.");
    }
  }

  if (!title) {
    errors.push("Must provide a title.");
  } else if (title.length > MAX_POST_TITLE_LENGTH) {
    errors.push(
      `Post title must contain less than ${MAX_POST_TITLE_LENGTH} characters.`
    );
  }
  if (body.length > MAX_POST_BODY_LENGTH) {
    errors.push(
      `Post body must contain less then ${MAX_POST_BODY_LENGTH} characters.`
    );
  }

  return errors;
};

// Controllers
const addClub = async (req, res) => {
  try {
    const { clubType } = req.body;
    switch (clubType) {
      case clubTypes.bookClub:
        return addBookClub(req, res);
      default:
        const response = createResponse(
          false,
          "Unable to add new club.",
          [`Club type ${clubType} does not exist`],
          {}
        );
        return res.status(500).json(response);
    }
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const addBookClub = async (req, res) => {
  const { name, clubType } = req.body;
  const errors = await validateBookClub(name);

  if (errors.length) {
    const response = createResponse(
      false,
      "Unable to add new club.",
      errors,
      {}
    );
    return res.status(400).json(response);
  } else {
    const club = await Clubs.create(
      {
        name,
        clubType,
        createdBy: req.user.id,
        bookClub: {},
        admins: {
          userId: req.user.id,
        },
        userClubs: {
          userId: req.user.id,
        },
      },
      { include: ["bookClub", "admins", "userClubs"] }
    ).catch((error) => {
      console.log(error);
      const response = createUnkownErrorResponse();
      return res.status(500).json(response);
    });

    const response = createResponse(
      true,
      `Succesfully created new book club ${name}!`,
      [],
      club
    );
    return res.status(200).json(response);
  }
};

const getClubs = async (req, res) => {
  try {
    const clubs = await Clubs.findAll()
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

    const response = createResponse(
      true,
      `Found ${clubs.length} clubs.`,
      [],
      clubs
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const addClubBook = async (req, res) => {
  try {
    const { bookClubId, bookId, isCurrentBook, startDate, endDate } = req.body;

    const errors = await validateClubBook({
      bookClubId,
      bookId,
      isCurrentBook,
      startDate,
      endDate,
    });

    if (errors.length) {
      const response = createResponse(
        false,
        "Unable to add new club book.",
        errors,
        {}
      );
      return res.status(400).json(response);
    }

    const clubBook = await BookClubBooks.create(
      {
        bookClubId,
        bookId,
        isCurrentBook,
        startDate,
        endDate,
      },
      { include: ["book"] }
    )
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

    const response = createResponse(
      true,
      "Club has successfully added book.",
      [],
      clubBook
    );

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const updateClubBook = async (req, res) => {
  try {
    const { bookClubBookId, isCurrentBook, startDate, endDate } = req.body;

    const { bookClubBook, errors } = await validateClubBookUpdate({
      bookClubBookId,
      isCurrentBook,
      startDate,
      endDate,
    });

    if (errors.length) {
      const response = createResponse(
        false,
        "Unable to update book",
        errors,
        {}
      );
      return res.status(400).json(response);
    }

    const { bookClubId } = bookClubBook.dataValues;
    if (isCurrentBook) {
      removeCurrentBook(bookClubId);
    }

    const updatedValues = {
      isCurrentBook,
      startDate,
    };
    if (endDate) updatedValues.endDate = endDate;

    bookClubBook.set(updatedValues);
    await bookClubBook.save();

    const response = createResponse(
      true,
      "Successfully updated club book!",
      [],
      bookClubBook
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const addPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { clubId, title, body } = req.body;

    const errors = await validatePost({ userId, clubId, title, body });
    if (errors.length) {
      const response = createResponse(
        false,
        "Unable to create post.",
        errors,
        {}
      );
      return res.status(400).json(response);
    }

    const post = await Posts.create({ userId, clubId, title, body })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

    const response = createResponse(
      true,
      "Successfully created post!",
      [],
      post
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

module.exports = {
  addClub,
  getClubs,
  addClubBook,
  updateClubBook,
  addPost,
};
