import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import ReactQueryParams from 'react-query-params'
import escapeStringRegexp from 'escape-string-regexp'

class Search extends ReactQueryParams {
  state = {
    query: "",
    results: []
  }

  componentWillMount() {
    if (window.location.search) {
      this.setQueryParams({ q: window.location.search.substring(3) })
      BooksAPI.search(escapeStringRegexp(this.queryParams.q))
      .then(results => Array.isArray(results) ? this.setState({ results: results }) : this.setState({ results: [] }))
    }
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setQueryParams({ q: escapeStringRegexp(this.state.query)})
    BooksAPI.search(escapeStringRegexp(this.state.query))
    .then(results => Array.isArray(results) ? this.setState({ results: results }) : this.setState({ results: [] }))
  }

  getShelf = (result) => {
    let found = this.props.books.filter(book => book.id === result.id)
    if (found.length === 1) {
      return found[0].shelf
    } else {
      return "none"
    }
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
                placeholder="Search by title or author"
                value={ this.state.query }
                onChange={ this.handleChange }
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.results.map(result => (
              <li key={ result.id }>
                <Book
                  book={ result }
                  shelf={ this.getShelf(result) }
                  onShelfChange={ () => { this.props.onShelfChange() }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search