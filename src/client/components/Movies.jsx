import { useState, useEffect } from 'react'
// import { Movies } from 'react-router-dom'
// import Axios from 'axios'


let API = 'http://localhost:3000/api'

function Movies() {
 
  const [filtered, setFiltered] = useState([]);

  const [movies, setMovies] = useState([]);

  

  async function fetchMovies() {
    try {
  
      // const data = {movies:[{...API}]}
      // const {data} = await Axios.get(`${API}/movies`);
      const response = await fetch(`${API}/movies`);
      const result = await response.json();
      setMovies(result.movies);
      setFiltered(result.movies);
      // const { data: response } = await Axios.get(`${API}movies`); 
      // console.log(data);


      // setMovies(data.movies);

    } catch (error) {
      console.error('help with this error:', error);
      
    }
    
    
  }
  useEffect(() => {
    fetchMovies();

  }, [])

  
function filterMovies(searchString) {
  const result = movies.filter((movie) => {
    if (
      movie.title.toLowerCase().includes(searchString.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchString.toLowerCase())
     
      );
      
    });
    
  setFiltered(result);
}




return (
  <div>
   
    <input
      type="text"
      placeholder="Search by movie title or director..."
      onChange={(e) => filterMovies(e.target.value)}
    />

   
    {filtered.length ? (
      filtered.map((movie) => (
        <Movies key={movie.id} to={`/details/${movie.id}`}>
          <div>
            <h3>{movie.title}</h3>
            <h4>{movie.director}</h4>
          </div>
        </Movies>
      ))
    ) : (
      <h2>Loading...</h2>
    )}
  </div>
);
}

export default Movies