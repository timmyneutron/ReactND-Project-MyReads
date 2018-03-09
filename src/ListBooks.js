import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelf="currentlyReading" title="Currently Reading" books={ this.state.books }/>
          <BookShelf shelf="wantToRead" title="Want To Read" books={ this.state.books }/>
          <BookShelf shelf="read" title="Read" books={ this.state.books }/>
        </div>
        <Link className="open-search" to="/search">Add a book</Link>
      </div>
    )
  }
}

export default ListBooks