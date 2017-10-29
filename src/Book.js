import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


class Book extends Component {
  state = {
    value: this.props.book.shelf
  }

  static propTypes = {
		book: PropTypes.array.isRequired,
    updateBook: PropTypes.func.isRequired
	}


  update = (shelf) => {
    this.setState({ value: shelf},
    () => {
      this.props.updateBook(this.props.book, shelf)
    })
  }

  render() {
    const { book, updateBook } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select
            value={this.state.value}
            onChange={ (event) => this.update(event.target.value) }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(' & ')}</div>
      </div>
    )
  }
}

export default Book
