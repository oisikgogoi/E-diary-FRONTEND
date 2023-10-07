import React,{useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import LoadingScreen from './loadingScreen'
function SignUp () {
  const [email , setEmail] = useState("")
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()



  const registerHandler = async (event) =>{
    event.preventDefault()

    try{
     setLoading(true)

     await axios.post('/api/user/register',{username,password,email})
        toast.success("registered successfully")
        navigate('/login')
    }
    catch(err){
      toast.error(err.response.data.msg)
    }

     setLoading(false)
  }

 console.log(loading)

  return (
    <Wrap>

        

        <Main >
            <div className='signup-logo'> Sign up </div>
            <input placeholder='Enter Your Name' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button 
            
            disabled = {loading}
            
            onClick={(e)=>{
              
                registerHandler(e)
             
              }} >{ (loading)?<LoadingScreen/> : "sign up"}</button>
            <p>Aleady signed in? <Link to='/login'>login</Link></p>

           
        </Main>


    </Wrap>
  )
}

export default SignUp

const Wrap = styled.div`
 display:flex;
 align-items:center;
 justify-content:center;
 width:100%;
 height:100vh;
`

const Main = styled.div`
  height:400px;
  width:350px;
  border-radius:.1rem ;
  box-shadow:2px 2px 20px rgba(119, 119, 119, 0.694);
  display:grid;
  grid-template-rows: 2fr 1fr 1fr 1fr 1.5fr;
  padding-bottom: 3rem;


  input{
    width:80%;
    height:2rem;
    font-size:1.05rem;
    padding:0 0 0 1rem;
    margin:auto;
    outline:none;
  }

  .signup-logo{
    width:100%;
    height:5rem;
    background: cyan;
    display:grid;
    place-items:center;
    font-size:1.5rem;
    text-transform:capitalize;
  }

  button{
    height:2rem;
    width:80%;
    margin:auto;
    text-transform:capitalize;
    border:2px solid cyan;
    background:cyan;
    color: black;
    cursor:pointer;
    border-radius:0;
    display:grid;
    place-items:center;
  }

  p{
    margin:auto;
  }

`