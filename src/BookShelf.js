import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'


class BookShelf extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
	}

  render() {
    const { books, updateBook } = this.props


    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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

export default BookShelf
