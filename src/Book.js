import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    //updateShelf: PropTypes.function.isRequired,
  };

  onShelfSelect = event => {
    // callsBack to Bookshelf, event.target.value === shelfType
    this.props.updateShelf(this.props.book.id, event.target.value);
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128,
                                               height: 193,
                                               backgroundImage: 'url("' + book.imageLinks.smallThumbnail + '")' }}>
          </div>
            <div className="book-shelf-changer">
              <select onChange={this.onShelfSelect}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        <div className="book-title">{book.name}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book;