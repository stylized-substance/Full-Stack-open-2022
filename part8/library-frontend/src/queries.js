import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title,
      published,
      author {
        name,
        id,
        born,
        bookCount
      },
      id,
      genres
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name,
        id,
        born,
        bookCount
      }
      id
      genres
    }
  }
`

export const CHANGE_BIRTHYEAR = gql`
  mutation changeBirthYear($name: String!, $year: Int!) {
    editAuthor(
      name: $name,
      born: $year
    ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      username
      favoritegenre
    }
  }
`