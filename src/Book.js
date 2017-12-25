import React from 'react'
import PropTypes from 'prop-types'

const Book = ({book, updateShelf}) => {

  const onShelfSelect = event => {
    // callsBack to Bookshelf, event.target.value === shelfType
    updateShelf(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
             style={{ width: 128,
                      height: 193,
                      backgroundImage: 'url("' + book.imageLinks.smallThumbnail + '")' }}>
        </div>
          <div className="book-shelf-changer">
            <select onChange={onShelfSelect} defaultValue={book.shelf}>
              <option value="nope" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      <div className="book-title">{book.name}</div>
      { book.authors.map(author => ( <div className="book-authors" key={author}>{author}</div> )) }

    </div>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Book;
