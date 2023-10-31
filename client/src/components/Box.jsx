import React, { useState } from 'react';
// import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useEffect } from 'react';
// import ListGroup from 'react-bootstrap/ListGroup';
// import { ToastContainer } from 'react-toastify';

export default function Box() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4001/books"
        );
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <br />
      <div>
        <h3>Books </h3>
      </div>
      <br />

      <div className='row'>
        {books.length > 0 && books.map(book => {
          return (
            // <div className='col-md-3' key={book._id}>
            //   <div className='Card'>
            //     <div className='card-body'>
            //       <img className='card-img-top' src={book.imgUrl} alt={book.book} />
            //     </div>
            //     <h3>{book.book}</h3>
            //     <p>Author: {book.author}</p>
            //     <p>Genre: {book.genre}</p>
            //   </div>

            // </div>
            <div className='col-md-3' key={book._id}>
              <div className="card" style={{width: "18rem" }} >
                <img src={book.imgUrl} className="card-img-top" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">Title: {book.book}</h5>
                    <p className="card-text">Author: {book.author}</p>
                    <p className="card-text">Genre: {book.genre}</p>
                    <p className="card-text">ISBN: {book.isbn}</p>
                  </div>
              </div>
            </div>
          )
        })
        }

      </div>

    </div>

  )
}

