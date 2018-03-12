import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

// Class for individual books
class Book extends Component {
  // set PropTypes
  static PropTypes = {
    book: PropTypes.object,
    shelf: PropTypes.string,
    onShelfChange: PropTypes.func
  }

  /**
  * Set default values for state variables that are displayed.
  * This way, if no values are passed for the book's title,
  * authors, or thumbnail, the default values are displayed.
  * The shelf state variable can be updated by the shelf prop, or by the user.
  */
  state = {
    title: "",
    authors: [],
    thumbnail: "https://dummyimage.com/128x193/000000/ffffff.jpg&text=No+Thumbnail+Found",
    shelf: "none"
  }

  // Set the state variables when the component mounts (and if values are given)
  componentWillMount() {
    if (this.props.book.title) {
      this.setState({ title: this.props.book.title })
    }

    if (this.props.book.authors && Array.isArray(this.props.book.authors)) {
      this.setState({ authors: this.props.book.authors })
    }

    if (this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) {
      this.setState({ thumbnail: this.props.book.imageLinks.thumbnail })
    }

    if (this.props.shelf) {
      this.setState({ shelf: this.props.shelf })
    }
  }

  /**
  * If a new shelf is selected for a book, update the book's state and
  * call the parent component's method for handling that change.
  */
  handleChange(event) {
    let newShelf = event.target.value
    this.setState({ shelf: newShelf })
    BooksAPI.update(this.props.book, newShelf)
    .then(result => {
      this.props.onShelfChange()
    })
  }

  // Display the book, along with a drop-down menu for tag choices.
  render() {
    return ( 
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url(${ this.state.thumbnail })` }}></div>
          <div className="book-shelf-changer">
            <select value={ this.state.shelf } onChange={ (event) => { this.handleChange(event) }}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ this.state.title }</div>
        <ol className="book-authors">
          { this.state.authors.map(author => (
              <li key={ author }>
                { author }
              </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Book