import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'


class Search extends React.Component {

  static propTypes = {
    updateBookshelf: PropTypes.func.isRequired,
    ourBooks: PropTypes.func.isRequired
  };

  state = {
    bookResults: []
  };

  queryUpdate = event => {
    const query = event.target.value;
    if (query.length > 0) {
      BooksAPI.search(event.target.value)
        .then(resp => {
          // get our bookshelf books
          const ourBooks = this.props.ourBooks();

          // resp is an array of book objects that match our search
          const results = resp.map(book => {
            // check if the books is in our bookshelf books
            const bookMatch = ourBooks.filter(ourBook => ourBook.id === book.id);
            // if it is return the matched book in OUR book list,
            // this is important because it lets us indicate what shelf a book is ALREADY on if it
            // appears in our search results.
            if (bookMatch.length > 0) {
              return bookMatch[0];
            } else {
              return book;
            }
          });
          this.setState({bookResults: results});
        })
        .catch(e => { console.log('Searching for "' + query + '" gave us:\n ' + e)});
    } else {
      this.setState({bookResults: []});
    }
  };

  render() {

    const { bookResults } = this.state;
    const { updateBookshelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={this.queryUpdate} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { (bookResults.length > 0) &&  bookResults.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateShelf={updateBookshelf}
                />
              </li>))}
          </ol>
        </div>
      </div> )
  }
}

export default Search