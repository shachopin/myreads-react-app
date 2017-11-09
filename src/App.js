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

  //refractored version using ternary operator
  handleUpdateBook = (currentBook, newShelf) => {
    this.setState(prevState => {
      
      let selectedBook = prevState.books.find(book => book.id === currentBook.id)
      let changedBook
      return {  //javascript ternary operators with multiple statements - https://stackoverflow.com/questions/6678411/javascript-ternary-operator-with-multiple-statements
        books: selectedBook ? (
                 changedBook = Object.assign({}, selectedBook), //deep copy, because we should never mutate the state
                 changedBook.shelf = newShelf,
                 prevState.books.filter(book => book.id !== currentBook.id).concat(changedBook) //only the last statment got evaluated to expression
               ) : (
                 currentBook.shelf = newShelf,
                 prevState.books.concat(currentBook)
               )
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
