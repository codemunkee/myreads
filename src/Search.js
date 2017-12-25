import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'


class Search extends React.Component {

  static propTypes = {
    updateBookshelf: PropTypes.func.isRequired
  };

  state = {
    bookResults: []
  };

  queryUpdate = event => {
    const query = event.target.value;
    if (query.length > 0) {
      BooksAPI.search(event.target.value)
        .then(resp => {
          this.setState({bookResults: resp});
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