import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response)
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } 
    };
    getCurrentTrack();
  }, [token, dispatch]);
  return (
    <Container>
      {currentPlaying && (
        <div className="track">
          <div className="track_image">
            <img src={currentPlaying.image} alt="currentPlaying" />
          </div>
          <div className="track_info">
            <h4>{currentPlaying.name}</h4>
            <h6>{currentPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    img{
      ${'' /* position: absolute; */}
      ${'' /* margin-top:-2rem; */}
      ${'' /* margin-left:rem; */}
    }
    &_info{
      display:flex;
      flex-direction:column;
      gap:0.3rem;
      h4{
        color:white;
      }
      h6{
        color:#b3b3b3;
      }
    }
    
  }
`;
