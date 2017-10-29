import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

console.log(BooksAPI.getAll())

// console.log(BooksAPI.get())


class BooksApp extends Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([ book ])
      }))
    })
  }

  getBook = (shelf, books) => {
    return books.filter((b) => b.shelf === shelf)
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
            getBook={this.getBook}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
