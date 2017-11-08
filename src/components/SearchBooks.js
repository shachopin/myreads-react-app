import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'

export default class SearchBooks extends Component {
  
  state = {
    query: "",
    matchedBooks: []
  }

  handleInputChange = (e) => {
    let query = e.target.value
    this.setState({query})
    this.searchBooks(query);
  }
  
  searchBooks = (term) => {
    BooksAPI.search(term).then(matchedBooks => {
      matchedBooks = matchedBooks || []; //in case matchedBooks resolved to undefined, this is happeing when the api fails
      this.setState({matchedBooks})
    })
  }
  
  isBookOnShelf(currentBook) {
    let bookOnShelf = this.props.books.find(function(book) {
      return book.id === currentBook.id
    })
    
    return bookOnShelf
  }
  
  showBookList = () => {
    if (!this.state.matchedBooks.error && this.state.matchedBooks.length > 0) {//this.state.matchedBooks is object containing error property when no book is found
      return this.state.matchedBooks.map(book => 
        <Book key={book.id} book={this.isBookOnShelf(book) || book} onShelfChange={this.props.onUpdateBook}/>
      );
    }
  }
    
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input value={this.state.query} onChange={this.handleInputChange} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showBookList()}
          </ol>
        </div>
      </div>
    )
  } 
}

