import React,{useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import LoadingScreen from './loadingScreen'
function Login() {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()



  const loginHandler = async (event) =>{
    event.preventDefault()

    try{
     setLoading(true)

     const response = await axios.post('/api/user/login',{password,email})
     if(response && response.data.accesstoken){
        toast.success("logged in successfully")
        localStorage.setItem("accessToken", response.data.accesstoken)
        navigate('/view-all-notes')
      }else{
        toast.error(response.data.msg)
      }
     
    }
    catch(err){
      toast.error(err.response.data.msg)
    }

     setLoading(false)
  }



  return (
    <Wrap>
        <Main >
            <div className='signup-logo'> login </div>
            <input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button 
            
            disabled = {loading}
            
            onClick={(e)=>{
              if( email.length === 0 || password.length === 0){
                toast.error("all fields are mandatory")
              }
              else{
                loginHandler(e)
              }
              }} >{ (loading)?<LoadingScreen/> : "log in"}</button>

            <p>Dont have an account ? <Link to='/signup'>sign up</Link></p>
        </Main>
    </Wrap>
  )
}

export default Login 

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
  grid-template-rows: 2fr 1fr 1fr 1.5fr;
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
  button:hover{
    background:white;
  }
  p{
    margin:auto;
  }

`