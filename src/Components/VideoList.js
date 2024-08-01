import React, { useEffect, useState } from 'react'
import { videoData } from './data'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { InfinitySpin} from 'react-loader-spinner'

function VideoList() {
  
    const [videos, setVideos] = useState([]);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
   
    useEffect(() => {
      const fetchVideos = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/videos`);
          setVideos(res.data);
          console.log(res.data)
        } catch (err) {
          console.error(err);
        }finally{
          setLoading(false);
        }
      }; 
  
      fetchVideos();
    }, []);

    const handleClick = () =>{
      navigate('/')
  }

  return (
    <div>
      <div className='flex items-center justify-center gap-2 pt-8'>
        <h1 className='text-slate-300 '>Want to upload more videos ? </h1>
    <button onClick={handleClick} className='  p-2 border-2 text-black font-semibold rounded-full bg-white hover:border-blue-600  hover:bg-blue-500 hover:text-slate-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-800 transition duration-500'> Upload Video </button>
    </div>
    <div className='grid md:grid-cols-2 lg:grid-cols-3 m-8 gap-4'>

      { videos.map((video)=>(
        
        <div key={video._id} className='flex  flex-col items-center justify-center p-4 rounded-2xl bg-gray-800 hover:shadow-blue-800 hover:bg-blue-600/30 hover:-translate-y-2 hover:shadow-xl  transition ease-in duration-500'>
          <Link to={`/video/${video._id}`} >
          <img className=' rounded-xl w-[400px] h-[200px] md:w-[500px] md:h-[300px]' src={video.thumbnailUrl} />
          <h1 className=' p-2 font-semibold text-white'>{video.title} </h1>
          </Link>
        </div>
      ))}
      {
        loading && <div className="z-10 inset-0 fixed flex justify-center items-center ">
        <InfinitySpin  color="#1664e0" />
      </div>
      } 
    </div>
    </div>
  )
}

export default VideoList




