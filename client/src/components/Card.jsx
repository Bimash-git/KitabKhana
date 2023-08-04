// import React, { useState } from 'react';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

// export default function Card({ imgUrl, book, author, genre, isbn, availability }) {

//     return (
//         <div>
//             <Card style={{ width: '18rem' }}>
//                 <Card.Img variant="top" src={books.imgUrl} />
//                 <Card.Body>
//                     <Card.Title>{books.book}</Card.Title>
//                     <Card.Text>
//                         Some quick example text to build on the card title and make up the
//                         bulk of the card's content.
//                     </Card.Text>
//                 </Card.Body>
//                 <ListGroup className="list-group-flush">
//                     <ListGroup.Item>{books.author}</ListGroup.Item>
//                     <ListGroup.Item>{books.isbn}</ListGroup.Item>
//                     <ListGroup.Item>{books.genre}</ListGroup.Item>
//                     <ListGroup.Item>{books.availability}</ListGroup.Item>
//                 </ListGroup>
//                 <Card.Body>
//                     <Card.Link href="#">Borrow</Card.Link>
//                     <Card.Link href="#">Another Link</Card.Link>
//                 </Card.Body>
//             </Card>
//             <ToastContainer />
//         </div>
//     )
// }

// export default function cardList() {

//     const [books, setBooks] = useState();
    
//     useEffect(() => {
//         const fetchedBooks = async () => {
//             try {
//                 const response = await axios.get("localhost:4001/:id");
//                 setBooks(response.data);
//             }
//             catch (error) {
//                 console.error("error fetching books");
//             }
//         }
//         fetchedBooks();
//     }, []);
//     return(
//         <h1>hello</h1>
//     )
// }