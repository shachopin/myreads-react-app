import React, { Component } from 'react'

export default class Book extends Component {
  state = {
    shelf: this.props.book.shelf || "none" //this shows that it is not run as constructor because it has access to this.props directly
  }

  handleChange = (e) => {
    let shelf = e.target.value
    this.setState({shelf})  
    this.props.onShelfChange(this.props.book, shelf)
  }
  
  render() {
    const {book} = this.props
    
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.handleChange}>
                <option value="anything" disabled>Move to...</option>{/*changed the value from "none" to "anything" here to avoid the interception*/}
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {/*<div className="book-authors">{book.authors && book.authors[0]</div>*/} {/*works! in case book.authors is undefined which I found one case*/}
          <div className="book-authors">{book.authors ? book.authors.join(', '): ''}</div> {/*Better way, also shows all authors, instead of just showing the 1st author*/}
        </div>
      </li>
    )
  }
}
