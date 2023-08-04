import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// import Books from "../components/bookForm";

export default function Home() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const verifyCookie = async () => {

      if (!cookies.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        "http://localhost:4001",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;
      setUsername(user);

      return status
        ? toast(`Hello ${user}`, {
          position: "top-right"
        })
        : (removeCookie("token"), navigate("/login"));

    };

    verifyCookie();
  }, [cookies, removeCookie, navigate]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup")
  }

  return (
    <>
      <div className='home_page'>
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>Logout</button>
        {/* {books.map((book) => (
          <Card key={book.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={book.image} />
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Author: {book.author}</ListGroup.Item>
              <ListGroup.Item>Genre: {book.genre}</ListGroup.Item>
              <ListGroup.Item>Price: {book.price}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        ))} */}
        <ToastContainer />
      </div>

    </>
  )
}
