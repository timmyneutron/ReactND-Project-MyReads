import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  // Store the list of tagged books in the top-level state of the app.
  state = {
    books: []
  }

  // Get all tagged books when the app loads, and store them in the state.
  componentWillMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
  }

  // When a book's shelf is changed, this function is called to refresh the state of the app.
  changeShelf = () => {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
  }

  /** 
  * Front page of app is three bookshelves with books displayed according
  * to their shelf property, and search page is linked to under
  * /search URL.
  */
  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf
              shelf="currentlyReading"
              title="Currently Reading"
              books={ this.state.books }
              onShelfChange={ () => { this.changeShelf() } }
            />
            <BookShelf
              shelf="wantToRead"
              title="Want To Read"
              books={ this.state.books }
              onShelfChange={ () => { this.changeShelf() } }
            />
            <BookShelf
              shelf="read"
              title="Read"
              books={ this.state.books }
              onShelfChange={ () => { this.changeShelf() } }
            />
          </div>
          <Link className="open-search" to="/search">Add a book</Link>
        </div>
      )}/>
      <Route path="/search" render={() => (
        <Search
          books={ this.state.books }
          onShelfChange={ () => { this.changeShelf() }}
        />
      )}/>
      </div>
    )
  }
}

export default BooksApp
