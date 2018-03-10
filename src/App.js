import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
  }

  changeShelf = () => {
    BooksAPI.getAll()
    .then(books => this.setState({ books }))
  }

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={() => (
        <ListBooks
          books={ this.state.books }
          onShelfChange={ () => { this.changeShelf() }}
        />
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
