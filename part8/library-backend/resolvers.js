const Book = require('./models/book')
const Author = require('./models/author');
const User = require('./models/user')
const { GraphQLError } = require("graphql");
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      console.log('allbooks find')
      let books = await Book.find({}).populate('author')
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    singleAuthor: async (root, args) => {
      const result = await Author.find({ name: args.name })
      return result[0]
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    },
    books: async (root) => {
      const books = await Book.find({ author: root.id }).populate('author')
      console.log('book find')
      return books
    }
  },
  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Authorization header missing')
      }

      let author = await Author.findOne({ name: args.author }).populate('books')
      
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }

      const book = new Book({ ...args, author: author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      
      author = await Author.findOne({ name: args.author })
      author.books.push(book)

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Authorization header missing')
        //return null
      }
      let author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.born
        try {
          await author.save()
          return author
        } catch (error) {
          throw new GraphQLError('Editing author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      } else {
        return null
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save()
        .catch((error) => {
          throw new GraphQLError('Creating new user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Wrong password', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      const responseObject = {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
        username: user.username,
        favoritegenre: user.favoriteGenre

      }
      return responseObject
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
};

module.exports = resolvers