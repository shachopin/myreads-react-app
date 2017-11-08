import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  handleUpdateBook = (currentBook, newShelf) => {
    this.setState(prevState => {
      let selectedBook = prevState.books.find(book => book.id === currentBook.id)
      if (selectedBook) {
        let changedBook =  Object.assign({}, selectedBook) //deep copy
        changedBook.shelf = newShelf
        return {
          books: prevState.books.filter(book => book.id !== currentBook.id).concat(changedBook)
        }    
      } else {
        currentBook.shelf = newShelf;
        this.setState(prevState => {
          return {
            books: prevState.books.concat(currentBook)
          }
        });
      }
    });
    
    BooksAPI.update(currentBook, newShelf)
  }
  

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} onUpdateBook={this.handleUpdateBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
