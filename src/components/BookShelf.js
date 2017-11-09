import React from 'react'

export default props => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookList}   
        </ol>
      </div>
    </div>
  )
}