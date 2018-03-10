import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            shelf="currentlyReading"
            title="Currently Reading"
            books={ this.props.books }
            onShelfChange={ () => { this.props.onShelfChange() } }
          />
          <BookShelf
            shelf="wantToRead"
            title="Want To Read"
            books={ this.props.books }
            onShelfChange={ () => { this.props.onShelfChange() } }
          />
          <BookShelf
            shelf="read"
            title="Read"
            books={ this.props.books }
            onShelfChange={ () => { this.props.onShelfChange() } }
          />
        </div>
        <Link className="open-search" to="/search">Add a book</Link>
      </div>
    )
  }
}

export default ListBooks