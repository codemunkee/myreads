import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    });
  }

  getBooks = () => {
    return this.state.books;
  };

  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resp => {
      // On a successful API response we could manually update the book that's been updated
      // in our local state (more efficient) but instead we just pull down all books from the
      // API to keep it simple and guarantee our view state matches the model
      BooksAPI.getAll().then((books) => {
        this.setState({books});
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  shelfTitle="Currently Reading"
                  shelfType="currentlyReading"
                  books={this.state.books}
                  updateBookshelf={this.updateBookshelf}
                />
                <Bookshelf
                  shelfTitle="Want to Read"
                  shelfType="wantToRead"
                  books={this.state.books}
                  updateBookshelf={this.updateBookshelf}
                />
                <Bookshelf
                  shelfTitle="Read"
                  shelfType="read"
                  books={this.state.books}
                  updateBookshelf={this.updateBookshelf}
                />
              </div>
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search updateBookshelf={this.updateBookshelf} ourBooks={this.getBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
