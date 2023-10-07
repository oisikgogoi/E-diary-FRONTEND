import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
    <nav>
            
            <h3 className='logo'>E-Diary <FontAwesomeIcon className='logo-icon' icon={faPencil} /></h3>
            <ul className='nav-links'>
                <li>about</li>
                <li><Link className='nav-login' to={'/login'}>login</Link></li>
                <li><Link className='nav-signup' to={'/signup'}><button>sign up</button></Link></li>
            </ul>
        </nav>
    <div className='home'>
      <div className='home-main'>
        <h1>diary writting app</h1>
        
        <p>Have u ever thought of writing down your feelings and thoughts in a piece of paper but dont have enought money to buy a diary? 
        So here we are to solve your problem! E-Diary app is a online diary writting app that allows you to express your thoughts and feelings and store them </p>
        
        <button type="button" className="home-btn cube cube-hover">
          <Link to={'/view-all-notes'} className='home-startWriting-button-link'>
            <div class="bg-top">
            <div class="bg-inner"></div>
            </div>
            <div class="bg-right">
            <div class="bg-inner"></div>
            </div>
            <div class="bg">
            <div class="bg-inner"></div>
            </div>
            <div class="text">start writting</div>
          </Link>
      </button>


      </div>
    </div>

    <footer className='home-footer'>
       <address>@copyright 2023, made by oisik gogoi </address>
    </footer>
        
    </>
  )
}

export default HomePage