import logo from './logo.svg';
import './App.css';
import{useState} from 'react'
import Firstpage from './Components/Firstpage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import VideoList from './Components/VideoList';
import Video from './Components/Video';


function App() {
  return(
    <div className='bg-black min-h-screen flex items-center justify-center inset-0'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Firstpage />}/>
        <Route path='/videos' element={<VideoList />}/>
        <Route path='/video/:id' element={<Video />}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
 
}

export default App;
