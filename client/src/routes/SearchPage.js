import { Icon } from '@iconify/react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { useState } from 'react';
import {makeAuthenticatedGETRequest} from '../utils/serverHelpers';
import SingleSongCard from '../components/shared/SingleSongCard';

export default function SearchPage(){

    const [isInputFocused, setIsInputFocused] = useState(false); // this state will be used to know if user is focused on input field or not, so that we can set the border of main input div container to white on focus 
    const [searchText, setSearchText] = useState(""); // state to store the data that user entered in search input field
    const [songData, setSongData] = useState([]); // state to store all the songs we recieved fom search API after user press enter for search , so its an array of songObjects

    // function to search a song wheen user clicks enter key
    const searchSong = async () => {
        const response = await makeAuthenticatedGETRequest("/song/get/songname/" + searchText); // this will call teh backend and will search and get all the songs matching the keyword 'searchText' and then returns a object 
        setSongData(response.data); // respnse.data will have the array with all songs that match the keyword of user (case sensitive search)
    }
    
    return(
        <LoggedInContainer curActiveScreen={"search"}>
            <div className='w-full text-left py-6'>
                <div className={`w-1/3 flex justify-center items-center p-3 rounded-full bg-gray-800 px-5 space-x-3 ${isInputFocused?("border border-white"):("")}`}>
                    <Icon icon="material-symbols:search" fontSize={22}/>
                    <input
                        type='text'
                        placeholder='What do you want to listen to ?'
                        className='w-full text-sm bg-gray-800 focus:outline-none'
                        onFocus={()=>{
                            setIsInputFocused(true);
                        }}
                        onBlur={()=>{
                            setIsInputFocused(false); // onn blur is opposite of onFocused its a prop of input field in react
                        }}
                        value={searchText} // value of this input field will be saved in 'searchText' state 
                        onChange={(e)=>{
                            setSearchText(e.target.value); // whenever value of input fild changed it will be overwrite the prv value of state
                        }}
                        onKeyDown={(e)=>{ // this func is a prop of input field, which will hit whenever user press any key
                            // console.log(e); 
                            if(e.key === "Enter"){ // when user press enter key, then only start the search func
                                searchSong();
                            }
                        }}
                    />
                </div>
                
                { 
                    songData.length > 0 ?( // conditionally render this below part only when user has typed and entered something 
                    <div className='pt-10 space-y-1'>
                        <div className='pb-5'>
                            Search Results for <span className='font-bold'>{searchText}</span>
                        </div>
                        {
                            // we are here looping the songData array of single song objects and placing each song data (item) into single song card component
                            songData.map((item)=>{
                                return <SingleSongCard info={item} key={JSON.stringify(item)} playSound={()=>{}}/>
                            })
                        }
                    </div>
                    ):( // if songData.len is <= 0 means user searched song that doesnot exixts in data base
                        <div className='pt-10 pl-5 text-gray-400'>
                            Nothing to show here.
                        </div>
                    )
                }

            </div>
        </LoggedInContainer>
    )
}