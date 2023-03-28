import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { IoPlayCircleSharp } from 'react-icons/io5'
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import axios from "axios"
import { useDispatch } from "react-redux";
import { unlikeMovie } from "../store";
import { TMDB_BASE_URL, API_KEY } from "../utils/constaints";
import ReactPlayer from 'react-player';


export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false)
  const [email, setEmail] = useState(undefined)
  const [trailerUrl, setTrailerUrl] = useState({
    key: '',
    url: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login")
  });

  // useEffect(() => {
  //   handleTrailer()
  // }, [isHovered])

  const handleTrailer = async () => {
    try { 
      console.log(movieData.id);
      await axios.get(`${TMDB_BASE_URL}/movie/${movieData.id}/videos?api_key=${API_KEY}`)
      .then(res => {
        console.log(res.data.results.length);
        if(res.data === null || res.data.length === 0){
          console.log("not found this: ", movieData);
        }else{
            // console.log(res.data.r);
            // console.log(movieData.results);
            const trailer = res.data.results.find(video =>   (video.type === 'Trailer' || video.type === 'Teaser') && video.site === 'YouTube')
            if(trailer){
              setTrailerUrl({
                key: trailer.key,
                url: `https://www.youtube.com/watch?v=${trailer.key}`
              })
              // setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`)
            }
        }

      })
      
      
      // console.log(movieData.id);
    } catch (error) {
      console.log(error);
    }
  }

  const addToLikedList = async () => {
    try {
    const {data: {data}} = await axios.post("http://localhost:5000/api/user/add", {
        email, data: movieData
      })
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
      <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie"/>
        {isHovered && ( 
          <div className="hover">
            <div className="image-video-container">
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" onClick={() => navigate('/player')}/>
            {/* <video src={video} autoPlay loop muted onClick={() => navigate('/player')}/> */}
            {trailerUrl.url &&  <ReactPlayer
        className='video'
        url={trailerUrl.url}
        width='100%'
        height='100%'
        playing={true}
       />}
            </div>
            <div className="info-container flex column">
              <h3 className="name" onClick={() => {
               if(trailerUrl.key === ''){
                navigate(`/player/nontrailer`)
              }else{
                navigate(`/player/${trailerUrl.key}`)
              }
              }}>{movieData.name}</h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp title="play" onClick={() =>{
                    if(trailerUrl.key === ''){
                      navigate(`/player/nontrailer`)
                    }else{
                      navigate(`/player/${trailerUrl.key}`)
                    }
                  }}/>
                  <RiThumbUpFill title="Like"/>
                  <RiThumbDownFill title="Dislike"/>
                  {isLiked ? <BsCheck title="Remove From List" onClick={() => dispatch(unlikeMovie({movieId: movieData.id, email}))}/> : <AiOutlinePlus title="Add to my list" onClick={addToLikedList}/>}
                </div>
                <div className="info">
                  <BiChevronDown title="More Info"/>
                </div>
              </div>
              <div className="genres flex">
                <ul className="flex">
                  {movieData.genres.map((genre) => {
                  <li>{genre}</li>
                })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Container>
    )
}
)


const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
    .video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
