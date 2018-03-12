import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

// Bookshelf component that displays all books for a given shelf
class BookShelf extends Component {
  // set PropTypes
  static PropTypes = {
    shelf: PropTypes.string,
    title: PropTypes.string,
    books: PropTypes.array,
    onShelfChange: PropTypes.func
  }
  
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ this.props.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.filter(book => book.shelf === this.props.shelf)
              .map(book => (
                <li key={ book.id }>
                  <Book
                    book={ book }
                    shelf={ book.shelf }
                    onShelfChange={ () => { this.props.onShelfChange() } }
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf