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
    currentlyReading: [],
    wantToRead: [],
    readAlready: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // showSearchPage: false
  }

  change

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
