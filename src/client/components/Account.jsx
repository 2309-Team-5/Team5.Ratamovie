import { useState, useEffect } from 'react'
import Axios from 'axios';
// eslint-disable-next-line react/prop-types
function Account({ token }) {
  // const [userData, setUserData] = useState({});
  // const [reviewedMovies, setReviewedMovies] =useState([]);
  // let API = "http://localhost:3000/api"
  const [name, SetName] = useState('')
  const [lastname, SetLastName] = useState('')
  const [email, SetEmail] = useState('')
  const [reservedMovies, setReservedMovies] = useState([])
  const [ user, setOwner ] = useState({})
  

  useEffect(() =>{
    async function fetchUser() {
      // await fetchAccount();
      // await fetchReviewedMovies();
      // setLoading(false);
      try{
        const API = "http://localhost:3000/api"
        const response = await Axios.get(`${API}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        // fetchUser()
      const userData = response.data

      SetName(userData.firstname)
      SetLastName(userData.lastname)
      SetEmail(userData.email)

      const reserveResponse = await Axios.get(`${API}/reservations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if(Array.isArray(reserveResponse.data.reservation)) {
        setReservedMovies(reserveResponse.data.reservation)
      } else {
        console.error('Wrong data', reserveResponse.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
    if (token) {
      fetchUser()
    }
  }, [token])
  const handleDelete = async (movieId) => {
    try{
      const API = "http://localhost:3000/api"
      await Axios.delete(`${API}/reservations/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      setReservedMovies((beforeReservedMovies) => 
      beforeReservedMovies.filter((movie) => movie.id !== movieId)
      )
    } catch (error) {
      console.error('error delete', error)
    }
  }
  return (
    <div className="account-container">
      <h1>Account Information</h1>
      <h2>{name} {lastname} </h2>
      <h4>{email}</h4>
        <div>
          <h2>Reserved  </h2>
          <ul>
         
          </ul>
        </div>
    </div>
  )
}
    
  
                        

  
//   async function fetchAccount(){
//       if (token){
//         try{ 
//           const response = await fetch (`${API}/users/me`,
//           {
//           headers:{
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//         const result = await response.json();
//         setUserData(result);
//       }catch(error){
//         console.error(error.message)
//       }
//     }else{
//       console.log("Sorry, you are not logged in!")
      
//     }
//   }
//   async function fetchReviewedMovies(){
//     if (token){
//       try{
//         const response = await fetch(`${API}/users/reviews`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();
//         setReviewedMovies(result.reviews);
//       } catch(error) {
//         console.error(error.message);
//       }
//     }
//   }

//   async function handleEditProfile() {
//     try{
//       const response = await fetch(`${API}/users/me`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           newUsername,
//           newPassword,
//         }),
//       });
//       if (response.ok){
//         fetchAccount();
//         setNewUsername('');
//         setNewPassword('');
//         setEditProfileMode(false);
//       } else {
//         console.error('Failed to update profile:', response.statusText);
//       }
//     } catch (error){
//       console.error('Error updating your profile:', error.message);
//     }
//   };
//     return (
//       <div>
        
//         { token ? (
//             <div>
//           <h2>My Account</h2>
//               <p>Name: {userData.firstname} {userData.lastname}</p>
//               <p>Username: {userData.email}</p>
//          <h3>Reviewed Movies:</h3>
//          { reviewedMovies.length > 0 ? (

//          <ul>    
//           {reviewedMovies.map((movie) => {
//             return (
//                 <li key={movie.id}>
//                   {movie.title}
//                   {movie.year}
//                   {/* {movie.userid.review} */}
//                   {/*CHANGE THIS TO BE WHEN U CLICK ON THE REVIEW YOU GET THE SINGLE PAGE RENDERED <button onClick={() => handleReturn(book.id)}>Return</button> */}
//                 </li>
//             )
//           } )}
       
//          </ul>
         
//          ) : (
//           <h2> You havent reserved any movies yet!!</h2>
//          )}
//     </div>
//          ) : (
//           <h3> logged in</h3>
//          )}
//      </div>
// );
// }

export default Account