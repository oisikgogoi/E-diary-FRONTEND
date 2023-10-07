import React,{useEffect, useReducer , useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import toast from "react-hot-toast";
import LoadingScreen from './loadingScreen'
import { useNavigate } from 'react-router-dom'


const initialTextState = {
  title:{
    text:'',
    touched:false,
    err:null
  },
  description:{
    text:'',
    touched:false,
    err:null
  }
}
const updateTextValue = (state , {type, payload }) => {
  switch (type) {
    case 'updateTextValue':
      return {...state ,
         [payload.key] : {
          text : payload.value,
          touched : true,
          err : payload.error
        }}
      
    default :
      throw new Error(`Unknown action type: ${type}`);
  }
}
function CreateNote() {

  const [currentTextState , dispatch ] = useReducer(updateTextValue,initialTextState)
  const [error,setError] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()


  const clickHandler = async() =>{
    setLoading(true)
    const config = {
      headers:{
        'Content-Type': 'application/json',
        Authentication: `Bearer ${localStorage.getItem('accessToken')}`,

      }
    }
    
    try {
      let title = currentTextState.title.text
      let description = currentTextState.description.text

      const response = await axios.post('/api/note/', {title,description},config);
      console.log(response.data)
      toast.success('successfully created a note')
      navigate('/view-all-notes')
     
    } catch (err) {
      toast.error(err.response.data.message)

    }

    setLoading(false)
  }


  useEffect(()=>{
    if(!localStorage.getItem('accessToken')){
      setError('unauthorzed')
    }
  })

  return (

    
      <Main>
      {
            error ?
            <p>{error}</p>
            :
      <>
      <input
       className={  currentTextState.title.err ? 'inputError' : 'noInputError'}
       placeholder='enter title'
       onChange={(event)=>{ 
        dispatch({
          type:"updateTextValue",
          payload:{ 
            key:'title' ,
            value:event.target.value,
            error : currentTextState.title.touched? event.target.value.length === 0 :null
          }
        }) 
        }}
       height={2} 
       value={currentTextState.title.text}/>

      <textarea 
         height={20}
         className={ currentTextState.description.err ? 'inputError' : 'noInputError'}
         rows={15}
         onChange={(event)=>{ 
            dispatch({
              type:"updateTextValue", 
              payload:{ 
                key:'description' ,
                value:event.target.value,
                error : currentTextState.description.touched ? event.target.value.length === 0 : null
              }
            }) 
         }}
         value={currentTextState.description.text}
         placeholder='enter your note / experience / journal'
         />
      <button onClick={()=>{
        if(currentTextState.description.text.length != 0 && currentTextState.title.text.length != 0 )
        { clickHandler() }
        }}>{ (loading)?<LoadingScreen/> : "create"}</button>
        </>

        }
  
    </Main>

    
   
  )
}

export default CreateNote

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


  .inputError{
    border:  1px solid red;
  }
  .inputError:focus{
    outline-color: red;
  }
  
  .noInputError{
    outline: none;
    border: 1px solid black;
  }

  p{
    font-size:20px;
  }

`