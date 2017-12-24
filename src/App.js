import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'

class BooksApp extends React.Component {

  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
      console.log(this.state);
    });
  }

  updateBookshelf = (book, shelf) => {
    console.log('Updating shelf for ', book, shelf);
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
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                 NOTES: The search from BooksAPI is limited to a particular set of search terms.
                 You can find these search terms here:
                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                 you don't find a specific author or title. Every search is limited by search terms.
                 */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
