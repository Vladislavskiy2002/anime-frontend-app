import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { AuthContext,useAuth } from './security/AuthContext'


import React, { useEffect, useState } from 'react';

export default function WatchComponent() {
  const {id,contentURL} = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log('filename: ' + contentURL)
        const videoModule = await import(`../../assets/${contentURL}`);
        setVideoUrl(videoModule.default);
      } catch (error) {
        navigate('/not-found'); // Або ведіть користувача на сторінку з повідомленням про "не знайдено"
        // return(<h1>фільм незнайдено :/ </h1>)
      }
    };

    fetchVideo();
  }, [id,contentURL, navigate]);

  const videoStyle = {
    width: '50%',
    height: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return videoUrl ? (
    <ReactPlayer
      url={videoUrl}
      playing
      loop={true}
      style={videoStyle}
      width='50%'
      height='50%'
      className="video-player"
      controls
    />
  ) : null;
}



// export default function WatchComponent(){
    
    // const{id} = useParams()
    // const videoPromise = import(`../../assets/${id}.mp4`);

    // const videoStyle = {
    //     width: '100%',
    //     height: '100%',
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    // };
    // console.log(videoPromise);
    // return(<ReactPlayer  url={videoPromise} playing loop={true} style = {videoStyle} width='100%' height='100%' className="video-player" controls/>)

//     if(id == 1)
//     {
//         return(<ReactPlayer  url={a} playing loop={true} style = {videoStyle} width='100%' height='100%' className="video-player" controls/>)
//     }
//     else if(id == 2) 
//     {
//         return(
//         <ReactPlayer  url={b} playing loop={true} style = {videoStyle} width='100%' height='100%' className="video-player" controls/>
//         )
//     }
//     else if(id == 3) {
//         return(
//         <ReactPlayer  url={c} playing loop={true} style = {videoStyle} width='100%' height='100%' className="video-player" controls/>
//         )
//     }
//     else if(id == 4) {
//         return(
//         <ReactPlayer  url={d} playing loop={true} style = {videoStyle} width='100%' height='100%' className="video-player" controls/>
//         )
//     }
//     else if(id == 5) {
//         return(
//         <ReactPlayer  url={e} playing loop={true} style = {videoStyle} width='50%' height='50%' className="video-player" controls/>
//         )
//     }
//     else{
//         return(<h1>фільм незнайдено :/ </h1>)
//     }
// }