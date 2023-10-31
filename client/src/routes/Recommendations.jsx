import React, { useState } from 'react';

export default function Recommendations() {
    // const [searchText, setSearchText] = useState('');
    const [query, setQuery] = useState('');
    const [recommend, setRecommend] = useState([]);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4001/recommend?query=${query}`);
            const data = await response.json();
            setRecommend(data);
            } catch (error) {
            console.log('Error fetching recommendations: ', error);
        }
    };

    //   useEffect(() => {
    //     const fetchRecommendations = async() => {
    //         try {
    //             const response = await axios.get("http://localhost:4001/recommendations");
    //             setRecommend(response.data);
    //             // if(response.ok) {
    //             //     const data = await response.data;
    //             // }
    //             // else {
    //             //     console.log("Error fetching response for recommendations", response.statusText);
    //             // }
    //         } catch (error) {
    //             console.log("Caught Error: ", error);
    //         }
    //     }
    //     if (searchText) {
    //         fetchRecommendations();
    //     }
    //   }, [searchText]);

    // fetching recommendations from backend

    //   const searchForm = document.getElementById('searchForm');
    //   const searchQuery = document.getElementById('searchQuery');
    //   const recommendationsList = document.getElementById('recommendations');

    return (
        <>
            <div>
                <h1>Book Recommendation System</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="searchQuery">
                        search books
                    </label>
                    <input type="text" id='searchQuery' name='query' value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type='submit'>Search</button>
                </form>
                <h2>Recommend Books:</h2>
                {recommend.map((data, index) => {
                    console.log(data);
                    return (
                        <div className="card-container" key={data._id}>
                            <div className="card-article">
                                <figure>
                                    <img src={data.Image} alt="" />
                                </figure>
                                <div className="card-body">
                                    <h2>{data.BookTitle}</h2>
                                    <p>{data.Genre}</p>
                                    <p>{data.ISBN}</p>
                                    <p>{data.Publisher}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}
