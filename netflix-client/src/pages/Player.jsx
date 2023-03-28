import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

export default function Player() {
  const navigate = useNavigate();
  const movieKey = useParams()
  console.log(movieKey);
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        {movieKey.key !== 'nontrailer' ?  <ReactPlayer
        className='video'
        url={`https://www.youtube.com/watch?v=${movieKey.key}`}
        width='100%'
        height='100%'
        playing={true}
       /> : <ReactPlayer className="video" url={"https://www.youtube.com/watch?v=6ZfuNTqbHE8"} width='100%'
       height='100%' playing={true}></ReactPlayer> }
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    .video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;
