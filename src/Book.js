import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

// Class for individual books
class Book extends Component {
  /**
  * The shelf property is the only property that changes, so it's
  * stored in the state. One book object is passed to this component as a prop.
  */
  state = {
    shelf: "none"
  }

  // Set the shelf state variable when the component mounts.
  componentWillMount() {
    this.setState({ shelf: this.props.shelf })
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
    let book = this.props.book
    let title = book.title
    let thumbnail = book.imageLinks.thumbnail
    let authors = book.authors ? book.authors : []

    return ( 
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ thumbnail })` }}></div>
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
        <div className="book-title">{ title }</div>
        <ol className="book-authors">
          { authors.map(author => (
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