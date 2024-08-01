import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function Firstpage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const thumbnailRef = useRef(null);
    const videoRef = useRef(null);

    const toastOptions= {
      position:"top-center",
      autoClose:5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
  }

    const handleSubmit = async(event) => {
      event.preventDefault();
      setLoading(true);
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          formData.append('thumbnail', thumbnail);
          formData.append('video', video);
      
          try {
            
            const res = await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/upload`, formData);
            console.log(res.data);

            toast.success(res.data.message, toastOptions)
            setTitle('');
            setDescription('');
            setThumbnail(null);
            setVideo(null);
            thumbnailRef.current.value = '';
            videoRef.current.value = '';
            
            
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false); 
          }      
    
    };

    const handleClick = () =>{
        navigate('/videos')
    }
  
    return (
      <div className="App flex flex-col items-center m-4 m:m-0 pt-10">
        <h1 className='font-bold text-slate-200 text-[20px] pb-8'> UPLOAD YOUR VIDEO</h1>
        
       {/* <button className=' border-2 p-2  mx-auto my-20 rounded-lg border-red-400 hover:bg-red-500/50 hover:-translate-y-4 transition duration-500' onClick={()=>setfirst(!first)}>show</button> */}
       <div className=' border-2 border-gray-900 p-10 rounded-xl shadow-xl  shadow-blue-800  '>

       <form onSubmit={handleSubmit}  className=' '>
        <div className=' flex flex-col items-start '>
          <label className=' font-medium text-slate-300 ' htmlFor='title'> Title  </label>
          <input  id='title' type='text' value={title} className='border-2 text-slate-300 border-gray-800 bg-transparent rounded-lg w-full shadow-lg p-2 hover:border-blue-600 hover:shadow-blue-800 outline-none focus:border-blue-600 transition duration-500' maxLength={50} onChange={(e)=>setTitle(e.target.value)} required></input>
        </div>

        <div className='mt-4 flex flex-col items-start '>
        <label className=' font-medium text-slate-300 ' htmlFor='desc'> Description  </label>
          <textarea  id='desc' type='text' value={description}  className='border-2  bg-transparent text-slate-300 border-gray-800 rounded-lg w-full shadow-lg p-2 hover:border-blue-600 hover:shadow-blue-800 outline-none focus:border-blue-600 transition duration-500 h-20' maxLength={200} onChange={(e)=> setDescription(e.target.value) } required></textarea>
        </div>

        <div className='mt-4 flex flex-col items-start '>
        <label className=' font-medium text-slate-300 ' htmlFor='thumb'> Thumbnail  </label>
          <input id='thumb'  ref={thumbnailRef} type={'file'} accept='image/jpeg, image/png'  className='border-2 file:bg-blue-600 file:rounded-lg file:border-none file:text-slate-300  text-slate-400 border-gray-800 rounded-lg w-full shadow-lg p-2 hover:border-blue-600 hover:shadow-blue-800 outline-none focus:border-blue-600 transition duration-500' onChange={(e)=> setThumbnail((prev)=>e.target.files[0]) } required></input>
        </div>

        <div className='mt-4 flex flex-col items-start '>
        <label className=' font-medium text-slate-300 ' htmlFor='video'> Video  </label>
          <input id='video'  ref={videoRef}   type={'file'} accept="video/mpg, video/avi, video/mp4" className='border-2 file:bg-blue-600 file:rounded-lg file:border-none file:text-slate-300  text-slate-400 border-gray-800 rounded-lg w-full shadow-lg p-2 hover:border-blue-600 hover:shadow-blue-800 outline-none focus:border-blue-600 transition duration-500' onChange={(e)=> setVideo((prev)=>e.target.files[0]) } required></input>
        </div>
  
        <button className=' mt-8 p-2 text-white font-semibold rounded-full bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-800 transition duration-500' type="submit">Upload Video</button>
       </form>
       </div>
       <button onClick={handleClick} className=' ml-4 mt-8 p-2 border-2 text-black font-semibold rounded-full bg-white hover:border-blue-600  hover:bg-blue-500 hover:text-slate-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-800 transition duration-500'> View Videos </button>
       {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/30 z-50">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      )}

      <ToastContainer />

      </div>
      
    );
}

export default Firstpage


