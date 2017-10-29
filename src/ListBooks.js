import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'


class ListBooks extends Component {
  static propTypes = {
		books: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired,
    getBook: PropTypes.func.isRequired
	}


  render() {
    const { books, updateBook, getBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            shelf="Currently Reading"
            books={getBook("currentlyReading", books)}
            updateBook={updateBook}
          />
          <BookShelf
            shelf="Want to Read"
            books={getBook("wantToRead", books)}
            updateBook={updateBook}
          />
          <BookShelf
            shelf="Read"
            books={getBook("read", books)}
            updateBook={updateBook}
          />
        </div>
        <div className="open-search">
          <Link className='open-search' to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
