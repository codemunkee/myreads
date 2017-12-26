import React from 'react'
import PropTypes from 'prop-types'
import deepExtend from 'deep-extend'

const Book = ({book, updateShelf}) => {

  // We occasionally populate book properties with default empty values for situations
  // where the API doesn't return back any information (e.g. no authors provided)
  // We use deep-extend to do this https://www.npmjs.com/package/deep-extend
  const baseBook = { authors: [], imageLinks: {smallThumbnail: 'none'}};
  const extBook = deepExtend(baseBook, book);

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
                      backgroundImage: 'url("' + extBook.imageLinks.smallThumbnail + '")' }}>
        </div>
          <div className="book-shelf-changer">
            <select onChange={onShelfSelect} defaultValue={(extBook.shelf) ? extBook.shelf : 'none'}>
              <option value="nope" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      <div className="book-title">{extBook.name}</div>
      { extBook.authors.map(author => ( <div className="book-authors" key={author}>{author}</div> )) }

    </div>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
};

export default Book;
