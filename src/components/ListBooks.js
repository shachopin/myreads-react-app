import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import BookShelf from './BookShelf'

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
            <BookShelf title="Current Reading" bookList={this.showBookList("currentlyReading")} /> {/*more DRY*/}
            <BookShelf title="Want to Read" bookList={this.showBookList("wantToRead")} />
            <BookShelf title="Read" bookList={this.showBookList("read")} />
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    )
  } 
}

    


