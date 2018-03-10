import React, { Component } from 'react'
import Book from './Book'

// Display all the books that fit the "shelf" property.
class BookShelf extends Component {
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