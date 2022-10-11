import React,{useEffect} from 'react'
import Login from './Components/Login'
import Spotify from './Components/Spotify';
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';
import { StateProvider } from './utils/StateProvider';

export function App(){
  const [token, dispatch] = useStateProvider();
  
  // console.log(useStateProvider())
  useEffect(() =>{
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split('&')[0].split('=')[1];
      console.log(token)
      dispatch({type : reducerCases.SET_TOKEN, token})
    }
}, [token, dispatch]);
  // console.log(token)
  return(
    <div>
    {
       <Spotify/> 
    }
      
    </div>
  )
  }
  
export default  () => <StateProvider><App/></StateProvider>;
