import './css/index.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './components/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainPage from './components/MainPage';
import ReadNote from './components/readNote';
import CreateNote from './components/CreateNote';
import { Toaster } from "react-hot-toast";
import EditNote from './components/EditNote';
function App() {
  return (
      <>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/view-all-notes' element={<MainPage />} />
        <Route exact path='/view-note/:id' element={<ReadNote />} />
        <Route exact path='/create-note' element={<CreateNote />} />
        <Route exact path='/edit-note/:id' element={<EditNote />} />

      </Routes> 

      <Toaster />

     </>

  );
}

export default App;
