import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import debounce from 'lodash/debounce';


class SearchBooks extends PureComponent {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
  }

  constructor(props) {
        super(props);
        this.searchBook = debounce(this.searchBook,400);
  }


  state = {
    query: '',
    foundBooks: []
  }


  setCategory(books) {
    books.map((b) => {
      b.shelf = 'none'
      return b
    })

    this.props.books.map((book) => {
      const index = books.findIndex(b => b.id === book.id)
      console.log(index)
      if(index >= 0) {
        books[index].shelf = book.shelf
      }
      return book
    })

    return books;
  }


  updateQuery = (query) => {
    this.setState({ query },
      () => {
        if(query.length > 0) {
          this.searchBook()
        }
      }
    )
  }

  searchBook() {
    BooksAPI.search(this.state.query, 20).then((books) => {
      if(Array.isArray(books)) {
        this.setState(state => ({
          foundBooks: this.setCategory(books)
        }))
      } else {
        this.setState({ foundBooks: [] })
      }

    })
  }

  render() {
    const { updateBook } = this.props
    const { query, foundBooks } = this.state
    /*
    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    } else {
      showingBooks = books
    }
    */
    // let debouncer = _.debounce(updateQuery, 400)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) =>
                this.updateQuery(event.target.value)
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {foundBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBook={updateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
