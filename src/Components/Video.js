import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfinitySpin} from 'react-loader-spinner'

function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
 

  useEffect(() => {
    const fetchVideo = async () => {
      
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/video/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideo();
  }, [id]);

  return (
    video ? (<div className=" p-4 md:p-8 flex flex-col">
      <div className=" flex items-center justify-center">
      <video
        className=" w-[400px] h-[200px] md:w-[650px] lg:w-[1000px] md:h-[450px] lg:h-[600px] bg-gray-800 rounded-xl"
        src={video.videoUrl}
        controls
        autoPlay
        loop
      />
      </div>
      <div className=" flex flex-col mx-auto justify-center lg:w-[1000px] ">
      <h2 className=" font-bold text-md text-[14px] md:text-[20px] text-slate-200 ">{video.title}</h2>
      <p className=" font-thin md:w-[650px] lg:w-[1000px] text-[10px] md:text-[16px] text-slate-200 text-ellipsis overflow-hidden ">{video.description}</p>
      </div>
      
    </div>) : (
      <div className="z-10 inset-0 fixed flex justify-center items-center ">
        <InfinitySpin  color="#1664e0" />
      </div>
               
    )
  );
}

export default Video;



