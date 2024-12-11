import React from 'react';
import {useState, useEffect} from 'react';
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import {Howl, Howler} from 'howler';
import LoggedInContainer from '../containers/LoggedInContainer';
 
// note : we want song to play on all pages and routes even if we change the page or route for logged in users and not only on 'myMusic' page, so for that we defined context with 'currSong' and 'setCurrentSong' values to use those values on each page for logged in users
 
export default function MyMusic(){
    
    const [songData, setSongData] = useState([]); // songData is a array of obj where each obj will be single song obj 
    // const [soundPlayed, setSoundPlayed] = useState(null); // this state stores the current song playing
    
     useEffect(() => {  // imp note : we can not make useEffect async directly, then how can me mak makeAuth.. function async ?, the solution is that we can make another function inside the useEffect and make it async then inside this function call teh makeAuth.. function to call API at backend to return some response  
        
          const getData = async () => {
             const response = await makeAuthenticatedGETRequest("/song/get/mysongs"); // from backend API will return 'all songs' created of user in form of array of songs objects
             // note : when we log this response we can see that this 'response' is an object that has a 'data' as 'key' whose value is the 'array' of all songs objects that we need 
             setSongData(response.data); // save this array of song obj in the state
         }
         getData();
        
     }, []); 

    //  console.log(songData);

    return(
        <LoggedInContainer curActiveScreen={"myMusic"}>  {/* repeatitive navbar,sidebar,songBar are wrapped in this component */}
           {/* children begins */}
            {/* song cards container */}
            <div className='text-left text-xl font-semibold pl-2 pb-4 pt-8'>
                My Songs
            </div>
            <div className='space-y-3 overflow-auto'>
                {
                    // songData is array of songs, where each song is stored in form of JSON object
                    songData.map((item) => {  // 'item' is individual songs object
                        return (    
                            <SingleSongCard info={item} playSound={()=>{}}/>
                        )
                    })
                }
            </div>
        </LoggedInContainer>
    )
}

//--------------------------------------------------

