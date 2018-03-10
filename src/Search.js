import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import ReactQueryParams from 'react-query-params'
import escapeStringRegexp from 'escape-string-regexp'

class Search extends ReactQueryParams {
  /**
  * Store the search query and results in the component state.
  * Tagged books are passed to the component as props.
  */
  state = {
    query: "",
    results: []
  }

  /**
  * When then component mounts, check for query parameters in the URL.
  *  If there are query parameters, automatically search for them and display results.
  *  This allows users to share URLs for searches.
  */
  componentWillMount() {
    if (window.location.search && window.location.search.substring(1, 3) === "q=") {
      this.setQueryParams({ q: window.location.search.substring(3) })
      BooksAPI.search(escapeStringRegexp(this.queryParams.q))
      .then(results => Array.isArray(results) ?
          this.setState({ results: results }) : this.setState({ results: [] }))
    }
  }

  /*
  * Change the value of the query state variable when the text in the search
  * form changes.
  */
  handleChange = (event) => {
    this.setState({ query: event.target.value })
  }

  /**
  * When the search form is submitted, search the API and display the search
  * term in the query parameters.
  */
  handleSubmit = (event) => {
    event.preventDefault()
    this.setQueryParams({ q: escapeStringRegexp(this.state.query)})
    BooksAPI.search(escapeStringRegexp(this.state.query))
    .then(results => {
      if (Array.isArray(results)) {
        this.setState({ results: results })
      } else {
        this.setState({ results: [] })
      }
    })
  }

  /**
  * Search the array of tagged books to find the shelf for a particular book,
  * and return the shelf (or "none" if the shelf isn't found).
  */
  getShelf = (result) => {
    let found = this.props.books.filter(book => book.id === result.id)
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