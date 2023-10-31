import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function BookForm() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        book: "",
        author: "",
        genre: "",
        isbn: "",
        availability: "",
        imgUrl:""
    });
    
    const [uploadStatus, setUploadStatus] = useState(false);
    const [errors,setErrors] =useState(null);
 
    const [bookImage,setBookImage] = useState(null);

    const {book, author, genre, isbn, availability } = details;

    const handleOnChange = (e) => {
        const { name, value, files } = e.target;
        // if (name === "image" && files.length > 0) {
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //       if (reader.readyState === 2) {
        //         setBookImage(reader.result);
        //       }
        //     };
      
        //     reader.readAsDataURL(files[0]);
        //   } else {
            //   }
            setDetails({ ...details, [name]: value });


    };

    const handleImageChange = async (event) => {
        
        alert("Do you want to upload the cover images");
        let formData = new FormData();
        formData.append("image", event.target.files[0]);
        console.log(event.target.files[0]);
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            },
         withCredentials: true
          };
        try {
           
            const response = await axios.post('http://localhost:4001/upload-image',  
           formData,        
            config
            );
          if (response.status === 200 && response.statusText === "OK") {
            setUploadStatus(true);
            setErrors(null);
            setDetails((prev) => ({
              ...prev,
              imgUrl: response.data.path,
            }));
          } else {
          }
        } catch (err) {
            setUploadStatus(false);
        //   console.log(err);errorserrors

        setErrors("Error to upload image");
        }
    };

    const handleError = (err) => {
        toast.success(err, {
            position: "bottom-right"
        });
    }

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right"
        });
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append("data",JSON.stringify(details));
            
        try {
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                },
             withCredentials: true
              };
            const {data} = await axios.post('http://localhost:4001/bookform',  
           myForm,        
            config
            );

            const { success, message } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            }
            else {
                handleError(message);
            }
        }
        catch (error) {
            console.log("Error:  " + error);
        }

    }

    return (
        <>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Picture of the book</Form.Label>
                    <Form.Control type="file" name ="image" onChange={handleImageChange} />
                    <span>
                        {errors && errors }
                        {uploadStatus && "Image uploade Successs"}
                    
                    </span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBook">
                    <Form.Label>Book</Form.Label>
                    <Form.Control type="text" name="book" placeholder="Enter name of the book" onChange={handleOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name ="author" placeholder="Enter the author's name" onChange={handleOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" placeholder="Enter name of the Genre" onChange={handleOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicISBN">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="number" name="isbn" placeholder="Enter the ISBN Number" onChange={handleOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAvilability">
                    <Form.Label>Books available for (*days)</Form.Label>
                    <Form.Control type="number"  name = "availability" placeholder="Enter the days for books to be available" onChange={handleOnChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I agree to follow the terms and condition of this site. The book uploaded by me is available for others to borrow" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit} >
                    Submit
                </Button>
            </Form>
            <ToastContainer />
        </>
    );
}

export default BookForm;