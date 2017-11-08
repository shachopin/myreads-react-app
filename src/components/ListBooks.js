import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

export default class ListBooks extends Component{
  showBookList(category) {
    return this.props.books
      .filter(book => book.shelf === category)
      .map(book => (
        <Book key={book.id} book={book} onShelfChange={this.props.onUpdateBook}/>
      ));
  }
  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.showBookList("currentlyReading")}   
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.showBookList("wantToRead")} 
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.showBookList("read")} 
                </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
      </div>
    )
  } 
}

    


