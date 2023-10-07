import React, { useState , useEffect } from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil, faSearch , faPlus} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Note from './note'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function MainPage() {

  const [data,setData] = useState(JSON.parse(localStorage.getItem('notes')) || [])
  const [error,setError] = useState(null)



  
  useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
      setError('no access token')
      return
    }

    
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      try {
        const response = await axios.get('/api/note/', config);
        const newData = response.data.note;
        setData(newData);
        // Store the data in localStorage to persist it across page refreshes
        localStorage.setItem('notes', JSON.stringify(newData));
      } catch (err) {
        localStorage.removeItem('accessToken');
        setError(err.message);
      }
    };

    fetchPrivateData();
  }, []);





  return (
    <>

    {
      (error)?
         <p className='main-page-error-container'>
          unauthorized
          <Link to={'/login'}>login</Link>
          </p>

      : 
        <>
      <NavBar>
              <h3 className='logo'>E-Diary <FontAwesomeIcon className='logo-icon' icon={faPencil} /></h3> 

          <div className='main-nav-right'>
              {/* <div className='search'>
                  <input />
                  <Link to={''}>
                      <FontAwesomeIcon className="search-icon" icon={faSearch} />
                  </Link>
              </div> */}

              <Link to={'/create-note'}><button className='create-button'>create <FontAwesomeIcon className='plus-icon' icon={faPlus} /></button></Link>
          </div>
      </NavBar>


        <Main>
          
           {
            (data.length===0)?
            <p>No notes found</p>

            :
            data.map((note) => (
              <Note
                key={note.id} 
                title={note.title}
                paragraph={note.description}
                id={note._id}
              />
            ))

            }
          
    
        </Main>
        </>
         
    }


    </>
  )
}

export default MainPage
const NavBar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:1rem;
    box-shadow:1px 1px 10px 3px rgba(173, 173, 173, 0.733);
    position:fixed;
    width:100vw;
    background:white;

      .main-nav-right{
        display:flex;
        align-items:center;
        flex-direction:row;
      }


      .create-button{
        padding:0 1.5rem;
        height:2rem;
        font-size:15px;
        background:cyan;
        border:none;
        cursor:pointer;
      }
      .create-button:hover{
        background:  rgb(82, 197, 255);
      }

`

const Main = styled.div`
width:min( 1300px , 80% );
height:100vh;
margin:auto;
padding-top:5rem;
display:grid;
grid-template-columns: repeat(3,1fr);
row-gap:1rem;
column-gap:1rem;


@media all and (max-width:790px){
grid-template-columns: repeat(2,1fr);
}

@media all and (max-width:450px){
  grid-template-columns: 1fr;
  }
  

@media all and (max-width:630px){
  width:95%;
}



p{
  font-size:40px;
  text-align:center;
  grid-column: 1 / 5;
  
}
`

