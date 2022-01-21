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
  Comments,
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
  const { clubId, isCurrentBook, title, author, summary, numPages } = book;

  const fieldErrors = {
    clubId: [],
    isCurrentBook: [],
    title: [],
    author: [],
    summary: [],
    numPages: [],
  };

  if (!clubId) {
    fieldErrors.clubId.push("Must provide club id.");
  } else {
    const clubExists = await BookClubs.findByPk(clubId)
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        fieldErrors.clubId.push(
          "An unknown error has occured. Please try again."
        );
        return fieldErrors.clubId;
      });

    if (!clubExists) {
      fieldErrors.clubId.push(`Club with id: ${clubId} does not exist.`);
    }
  }

  if (isCurrentBook !== true && isCurrentBook !== false) {
    fieldErrors.isCurrentBook.push(
      "Must provide if this will be the current book."
    );
  }

  if (!title || title.length < 1 || title.length > 255) {
    fieldErrors.title.push("Book title must be between 1 and 255 characters.");
  }

  if (!author || author.length < 1 || author.length > 255) {
    fieldErrors.author.push(
      "Book author must be between 1 and 255 characters."
    );
  }

  if (!summary || summary.length < 1) {
    fieldErrors.summary.push("Book summary must > 1 characters.");
  }

  if (!numPages || numPages < 1) {
    fieldErrors.numPages.push("Must provide valid number of pages.");
  }

  return fieldErrors;
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
  const fieldErrors = {
    title: [],
    body: [],
  };

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
    fieldErrors.title.push("Must provide a title.");
  } else if (title.length > MAX_POST_TITLE_LENGTH) {
    fieldErrors.title.push(
      `Post title must contain less than ${MAX_POST_TITLE_LENGTH} characters.`
    );
  }
  if (body.length > MAX_POST_BODY_LENGTH) {
    fieldErrors.body.push(
      `Post body must contain less then ${MAX_POST_BODY_LENGTH} characters.`
    );
  }

  return { errors, fieldErrors };
};

const validateComment = async (comment) => {
  const { userId, postId, parentCommentId, body } = comment;
  const errors = [];
  const fieldErrors = {
    body: [],
  };

  const user = await Users.findByPk(userId)
    .then((data) => data)
    .catch((error) => {
      console.log(error.message);
      errors.push("An unknown error has occured. Please try again.");
      return errors;
    });

  if (!user) {
    errors.push("User does not exist.");
  }

  const post = await Posts.findByPk(postId)
    .then((data) => data)
    .catch((error) => {
      console.log(error.message);
      errors.push("An unknown error has occured. Please try again.");
      return errors;
    });

  if (!post) {
    errors.push("Post does not exist.");
  } else {
    const { clubId } = post.dataValues;
    const { clubs } = user.toJSON();
    if (!clubs.some((club) => club.id === clubId)) {
      errors.push("Must belong to club to comment on a post.");
    }
  }

  if (parentCommentId) {
    const parentComment = Comments.findByPk(parentCommentId)
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        errors.push("An unknown error has occured. Please try again.");
        return errors;
      });

    if (!parentComment) {
      errors.push("Parent comment does not exist.");
    }
  }

  if (!body) {
    fieldErrors.body.push("Must provide comment body");
  } else if (body.length > MAX_POST_BODY_LENGTH) {
    fieldErrors.body.push(
      `Post body must contain less then ${MAX_POST_BODY_LENGTH} characters.`
    );
  }

  return { errors, fieldErrors };
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

const getClub = async (req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Clubs.findByPk(clubId, { include: ["posts"] })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

    if (!club) {
      const response = createResponse(
        false,
        `Club with id: ${clubId} does not exist.`,
        [],
        {}
      );
      return res.status(400).json(response);
    }

    const response = createResponse(
      true,
      `Successfully found club: ${club.dataValues.name}`,
      [],
      club
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
    const {
      clubId,
      bookId,
      isCurrentBook,
      imageURL,
      title,
      author,
      summary,
      numPages,
    } = req.body;

    const bookExists = await Books.findByPk(bookId)
      .then((data) => data)
      .catch((error) => {
        console.log(error);
        return res.status(500).json(createUnkownErrorResponse());
      });

    let clubBook = null;

    if (bookExists) {
      clubBook = await BookClubBooks.create({
        bookClubId: clubId,
        bookId,
        isCurrentBook,
      })
        .then((data) => data)
        .catch((error) => {
          console.log(error.message);
          const response = createUnkownErrorResponse();
          return res.status(500).json(response);
        });
    } else {
      const fieldErrors = await validateClubBook({
        clubId,
        isCurrentBook,
        title,
        author,
        summary,
        numPages,
      });
      if (
        fieldErrors.clubId.length ||
        fieldErrors.isCurrentBook.length ||
        fieldErrors.title.length ||
        fieldErrors.author.length ||
        fieldErrors.summary.length ||
        fieldErrors.numPages.length
      ) {
        const response = createResponse(
          false,
          "Unable to add new club book.",
          fieldErrors,
          {}
        );
        return res.status(400).json(response);
      }
      clubBook = await Books.create(
        {
          title,
          author,
          summary,
          numPages,
          imageURL,
          bookClubBooks: [
            {
              bookClubId: clubId,
              bookId,
              isCurrentBook,
            },
          ],
        },
        { include: ["bookClubBooks"] }
      )
        .then((data) => data)
        .catch((error) => {
          console.log(error.message);
          const response = createUnkownErrorResponse();
          return res.status(500).json(response);
        });
    }

    const book = await BookClubBooks.findOne({
      where: {
        bookId: clubBook.dataValues.id,
        bookClubId: clubId,
      },
    });

    const response = createResponse(
      true,
      "Club has successfully added book.",
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

    const { errors, fieldErrors } = await validatePost({
      userId,
      clubId,
      title,
      body,
    });
    if (errors.length || fieldErrors.title.length || fieldErrors.body.length) {
      const response = createResponse(false, "Unable to create post.", errors, {
        fieldErrors,
      });
      return res.status(400).json(response);
    }

    const post = await Posts.create({ userId, clubId, title, body })
      .then((data) => {
        return data;
      })
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

const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, parentCommentId, body } = req.body;

    const { errors, fieldErrors } = await validateComment({
      userId,
      postId,
      parentCommentId,
      body,
    });
    if (errors.length || fieldErrors.body.length) {
      const response = createResponse(
        false,
        "Unable to create comment.",
        errors,
        {
          fieldErrors,
        }
      );
      return res.status(400).json(response);
    }

    const comment = await Comments.create({
      postId,
      userId,
      parentCommentId,
      body,
    })
      .then((data) => data)
      .catch((error) => {
        console.log(error.message);
        const response = createUnkownErrorResponse();
        return res.status(500).json(response);
      });

    const response = createResponse(
      true,
      "Successfully created comment!",
      [],
      comment
    );
    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    const response = createUnkownErrorResponse();
    return res.status(500).json(response);
  }
};

const findComment = async (req, res) => {
  const comment = await Comments.findByPk(1).then((data) => data);
  return res.status(200).json(comment);
};

module.exports = {
  addClub,
  getClubs,
  getClub,
  addClubBook,
  updateClubBook,
  addPost,
  addComment,
  findComment,
};
