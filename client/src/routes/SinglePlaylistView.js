import { useParams } from "react-router-dom"
import LoggedInContainer from "../containers/LoggedInContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

// this is the single playlist view i/e when user clicks on any playlist, this view will open which will show up all the songs under that playlist
export default function SinglePlaylistView(){

    const [playlistDetails, setPlaylistDetails] = useState({}); // this will be json obj of current playlist that is open 
    const {playlistId} = useParams(); // this will fetch the :parameter from the route and store it in playlistId 

    // this will run automatically whenever the page renders for 1st time
    // fetch this playlists data from its id then store it in the 'playlistDetails' state 
    useEffect(()=>{

        const getData = async () => { 
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/" + playlistId); // APi will be called for something like playlist/get/playlistasdjkn24553 where end one is the playlist id for which details json we want to fetch frmo backend
            setPlaylistDetails(response); // store this response in the playlist details
        };
        getData();
    },[]); 

    console.log(playlistDetails);

    return(
        <LoggedInContainer curActiveScreen={"library"}>
            
            { // render the playlist details only when there is an _id of the playlistDetails stored in state (i.e if playlist really exists)
                playlistDetails._id && (
                    <div>
                        <div className='text-left text-xl font-bold py-6' >
                            {playlistDetails.name} {/*fetch the name of playlist from state */}
                        </div>

                        <div className='pt-5 space-y-1'>
                            {/* loop all the songs of playlist's songs key from 'playlistDetails' state json */}
                            {
                                playlistDetails.songs.map((item)=>{
                                    return <SingleSongCard info={item} key={JSON.stringify(item)} /> // this item is the each songs object with all its details
                                })
                            }
                        </div>
                    </div>
                )
            }
            

        </LoggedInContainer>
    )
}