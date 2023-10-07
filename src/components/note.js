import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import toast from "react-hot-toast";

function Note({title,paragraph,id}) {
    const newParagraph = paragraph.slice(0,150)

    const deleteNote = async() =>{
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };
  
      try {
        await axios.delete(`/api/note/${id}`,config);
        toast.success('note successfully deleted')
        window.location.reload()
  
      } catch (err) {
        toast.error(err.response.data.message)
      }
  
    }
  return (
    
   <Main>
        <h3 className='title'>{title.substring(0,60)}</h3>
        <p className='paragraph'>{newParagraph}<Link to={`/view-note/${id}`}>...read more </Link></p>
        <div className='buttons'>
        <Link to={`/edit-note/${id}`} className='edit'>Edit</Link>
        <a className='delete' onClick={()=>deleteNote()}><FontAwesomeIcon icon={faTrash}/></a>
        </div>     
    </Main>

  )
}

export default Note

const Main = styled.div`
  width:100%;
  height:max-content;
  padding:5px;
  box-shadow:1px 1px 6px 2px rgba(173, 173, 173, 0.733);
  margin:1rem 0;
  background:rgba(192, 168, 105 , .3);
  transition:.3s;

  h3{
    font-family:Poppins,sans-serif;
    font-size:2rem;
    text-transform:capitalize;
  }
  .paragraph{
    margin-top:1rem;
    text-align:left;
    font-family:Inter,sans-serif;
    font-size:1.2rem;
  }



  cursor:pointer;
  :hover{
    transform:translateY(-5px);
  }
`