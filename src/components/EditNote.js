import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import toast from "react-hot-toast";
import Loader from './loadingScreen'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


function EditNote() {

    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')


    let params = useParams()


    useEffect(()=>{
        if(params?.id) fetchDetails()
    },[params?.id])

    const fetchDetails = async() =>{
        setLoading(true)
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
  
        try {
          const response = await axios.get(`/api/note/${params.id}`,config);
          setTitle(response.data.title)
          setDescription(response.data.description)

  
        } catch (err) {
          toast.error('something went wrong , try again');
          navigate('/view-all-notes')
        }
  
        setLoading(false)
    }


    const updateNote = async() =>{
        setLoading(true)
        const config = {
            headers: {
              "Content-Type":'application/json',
              Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          };
    
        try {

        const res = await axios.put(`/api/note/${params.id}`,{title,description},config);
        console.log(res)
        toast.success('successfully updated the note')
        navigate('/view-all-notes')
        
        } catch (err) {
          toast.error(err.response.data.message)
          console.log(err)
        }

        setLoading(false)
    }

  return (
    <Main>
    {
          loading? 
          <LoadingScreen>
            <Loader />
          </LoadingScreen> 
        : 
     <>
    <input 
    height={2} 
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    />

    <textarea  
    height={20} 
    rows={15} 
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
    />

    <button onClick={()=>{updateNote()}}>edit</button>
    </>
    }

  </Main>
  )
}

export default EditNote

const Main = styled.div`
margin:auto;
width:min( 1300px , 80% );
height:100vh;
padding:5px;
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;

input,textarea{
    font-size:1.2rem;
    width:80%;
    padding:.5rem 1rem ;
    margin:.5rem;

  }
  button{
    font-size:1.2rem;
    width:10rem;
    height:3rem;
    background:cyan;
    color:black;
    text-transform:capitalize;
    cursor:pointer;
    border:none;
    display:grid;
    place-items:center;
  }
  button:hover{
    background:rgb(0, 190, 190);
    color:white;
  }

  @media all and (max-width:630px){
    width:95%;

  }

  p{
    font-size:20px;
  }


`


const LoadingScreen = styled.div`

width:100%;
height:100%;
display:grid;
place-items:center;

`