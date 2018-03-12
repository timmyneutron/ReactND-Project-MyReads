import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import escapeStringRegexp from 'escape-string-regexp'
import queryString from 'query-string'
import PropTypes from 'prop-types'

// Search page component
class Search extends Component {
  // set PropTypes
  static PropTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func
  }

  /**
  * Store the search query and results in the component state.
  * Tagged books are passed to the component as props.
  */
  state = {
    query: "",
    results: []
  }

  /**
  * Check URL for query parameters, and if "q" query parameter exists,
  * search for its value. This allows search URLs to be shared.
  */
  componentWillMount() {
    const parsed = queryString.parse(location.search)
    if ("q" in parsed) {
      this.setState({ query: parsed.q }, this.getResults )
    }
  }

  /**
  * Change the value of the query state variable when the text in the search
  * form changes.
  */
  handleChange = (event) => {
    this.setState({ query: escapeStringRegexp(event.target.value) }, this.getResults )
  }

  /**
  * Callback function for submitting search form (pressing return).
  * Updates URL with query parameters so search URL can be shared.
  */
  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.query !== "") {
      this.setQueryParam(this.state.query)
    } else {
      this.resetURL()
    }
  }

  /**
  * Callback function that searches the BooksAPI for the query and then
  * sets the results in the component state.
  */
  getResults = () => {
    if (this.state.query !== "") {
      BooksAPI.search(this.state.query)
      .then(results => {
        // check the query state variable again, in case it's changed since the last API call
        if (this.state.query !== "" && Array.isArray(results)) {
          this.setState({ results: results })
        } else {
          this.setState({ results: [] })
        }
      })
    } else {
      this.setState({ results: [] })
      this.resetURL()
    }
  }

  // set "q" query param in URL
  setQueryParam = (value) => {
    location.search = "?" + queryString.stringify({ q: value })
  }

  // remove query parameters from URL
  resetURL = () => {
    location.href = location.origin + location.pathname
  }

  /**
  * Search the array of tagged books to find the shelf for a particular book,
  * and return the shelf (or "none" if the shelf isn't found).
  */
  getShelf = (result) => {
    const found = this.props.books.filter(book => book.id === result.id)
    if (found.length === 1) {
      return found[0].shelf
    } else {
      return "none"
    }
  }

  // Render the search bar, and the books returned by the API call.
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
                name="q"
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