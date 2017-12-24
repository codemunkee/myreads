import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const Bookshelf = ({shelfTitle, shelfType, books, updateBookshelf}) => {

  const updateShelf = (bookID, shelfType) => {
    // callback to main App where we keep state for the books
    updateBookshelf(bookID, shelfType);
  };

  return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelfTitle }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.filter(book => book.shelf === shelfType)
              .map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    updateShelf={updateShelf}
                  />
                </li>))}
          </ol>
        </div>
      </div>
  )
};

Bookshelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  shelfType: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookshelf: PropTypes.func.isRequired
};

export default Bookshelf
