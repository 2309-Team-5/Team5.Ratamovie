import { useEffect, useState } from 'react';
import Navigate from './components/Navigate';
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Login from './components/Login';
import Movies from './components/Movies';
import SingleMovie from './components/SingleMovie';
import Register from './components/Register';
import Account from './components/Account';
import Admin from './components/Admin';


function App() {
  const [ token, setToken ] = useState(null);
  const [myReviews, setMyReviews] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [userId, setUserId] = useState(null);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const {id} = useParams();

  // useEffect(() =>{
  //   const roleFromToken = token ? token.role : null;
  //   setUserId(token ? token.userId : null);
  //   setUserRole(roleFromToken);
  // }, [token]);
  // // const handleInputChange = (e) => {
  // //   setSearchMovie(e.target.value);
  // // };


  return (
  <> 
   <div className="App">
        <nav className="navbar">
          <div className="site-name">RataMovie</div>
          <Link className="nav-link" to="/movies">
            Movies
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>

          {token ? (
            <Link className="nav-link" to={`/users/${userId}`}>
              User
            </Link>
          ) : null}
          
          {token ? (
            <Link className="nav-link" to={`/admin`}>
              Admin
            </Link>
          ) : null}

        </nav>
    </div>

    <Routes> 
      <Route path="/movies" element={<Movies/>}/>
      <Route path='/movies/:id' element={<SingleMovie token={token} setMyReviews={setMyReviews}/>} />
      <Route path="/login" element={<Login userId={userId} setUserId={setUserId} token={token} setToken={setToken}/>}/>
      <Route path="/register" element={<Register token={token} setToken={setToken}/>}/>
      <Route path="/users/:userId" element={<Account userId={userId} setUserId={setUserId} token={token} setToken={setToken} myReviews={myReviews}/>}/>
      <Route path="/admin" element={<Admin token={token} setToken={setToken}/>}/>
    </Routes>
    </>


    
  );
  
}
 {/* <div className="search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchMovie}
                onChange={handleInputChange}
              />
              <button onClick={handleSearch}>Search</button>
            </div> */}

  //);
  




export default App;
