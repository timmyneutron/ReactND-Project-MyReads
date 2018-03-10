import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import serializeForm from 'form-serialize'
import Book from './Book'

class Search extends Component {
  state = {
    query: "",
    books: []
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    BooksAPI.search(values.searchTerm)
    .then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={ this.handleSubmit }>
              <input
                type="text"
                name="searchTerm"
                placeholder="Search by title or author"
                value={ this.state.query }
                onChange={ this.handleChange }
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.books.map(book => (
              <li key={ book.id }>
                <Book book={ book }/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search