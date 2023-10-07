import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './loadingScreen'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

function ReadNote() {

  let params = useParams()
  const [data,setData] = useState()
  const [error,setError] = useState()
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  useEffect(()=>{
    if(params?.id) getNote()
  },[params?.id])

  const getNote = async () => {
      setLoading(true)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      try {
        const response = await axios.get(`/api/note/${params.id}`,config);
        const newData = response.data;
        setData(newData)

      } catch (err) {
        setError(err.response.data.message);
      }

      setLoading(false)
  }

  const deleteNote = async() =>{
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    try {
      await axios.delete(`/api/note/${params.id}`,config);
      toast.success('note successfully deleted')
      navigate('/view-all-notes')

    } catch (err) {
      toast.error(err.response.data.message)
    }

    setLoading(false)
  }


  return (
    
    <Wrap>

    {
      loading? 
        <LoadingScreen>
          <Loader />
        </LoadingScreen> 
      : 
      <Main>
      <h2>{data?.title}</h2>
      <p>{data?.description}</p>

      
        <div className='buttons'>

          <Link to={`/edit-note/${params?.id}`} className='edit'>Edit</Link>

          <a className='delete'  onClick={()=>{
            deleteNote()
          }}><FontAwesomeIcon icon={faTrash}/></a>

        </div>

      </Main>
      
    }
     
    </Wrap>
  )
}

export default ReadNote

const Wrap = styled.div`
width:100%;
height:100vh;
padding: 5rem 0 ;

`

const Main = styled.div`
margin:auto;
width:min( 1300px , 80% );
height:100%;
padding:5px;
box-shadow:1px 1px 10px 9px   rgba(184, 184, 184, 0.493);





h2{
  text-align:center;
  font-size:2.5rem;
  text-transform:uppercase;
  font-family:Poppins,sans-serif;
  margin-top:3rem;
}

p{
  font-size:1.5rem;
  font-family:Inter,sans-serif;
  text-transform:capitalize;
  word-wrap: break-word;
  line-height:2rem;
  margin:3rem 0;
}


@media all and (max-width:630px){
  width:95%;
}


`

const LoadingScreen = styled.div`

width:100%;
height:100%;
display:grid;
place-items:center;

`