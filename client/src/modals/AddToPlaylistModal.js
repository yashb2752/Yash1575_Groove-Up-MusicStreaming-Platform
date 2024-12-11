
import {useState, useEffect} from 'react';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';


export default function AddToPlaylistModal({closeModal, addSongToPlaylist}){ 

    // step1 : using 'useEffect' fetch all the playlists of user from backend
    // step2 : using 'useState' store all the user playlists in state
    // step3 : user playlists will be [] of playlist objects so fetch each of them from useState using map (loop) and show them in the addToPlaylistModal box
    // we did similar thing in Library to show all the user playlists 
    const [myPlaylists, setMyPlaylists] = useState([]);

    useEffect(()=>{
        const getData = async () =>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me"); // fetch all user playlists obj from backend and store in response
            setMyPlaylists(response.data); // response.data will have [] of playlist objects
        }
        getData();


    },[]); // we get the respnse as array of playlist objects thats why we write [] here


    return (
        <div className="absolute w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center" onClick={closeModal}> 
 
            <div className="bg-app-black w-1/3 rounded p-8" onClick={(e)=>{e.stopPropagation()}}> {/*since we applied the closeModal function on the parent div so the createplaylist modal keeps on closing when we click anywhere in the parent div, so to stop this we stopPropagation func on the only child of the parent this will prevent the createPlaylistModal form closing when we click on teh child(curr div)  */}

                <div className="font-bold text-white p-3">Select Playlist</div>
                <div className="space-y-2 flex flex-col justify-center items-center">
                    {
                        myPlaylists.map((item) => {
                            return <PlaylistListComponent addSongToPlaylist={addSongToPlaylist} info={item}/> // from here we are sending this 'addSongToPlaylist' func to 'PlaylistListComponent' because we want that whenever user clicks on a particular 'playlistListComponent'(playlist from playlistModal) then only this func 'addSongToPlaylist' should be called and that current song is added to the user clicked playlist 
                        })
                    }
                </div>
            </div>
        </div> 
    )
}

// this is single playlist componet in the 'AddToPlaylistModal'
const PlaylistListComponent = ({info, addSongToPlaylist}) => {
    return(
        <div className="w-full flex items-center space-x-3 cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 p-2"
            onClick={()=>{addSongToPlaylist(info._id)}} // fetch curr playlist id and send it to this func to add the curr song to this playlist on basis of playlist id
        >
            <div >
                <img
                    src={info.thumbnail}
                    alt={"playlist cover"}
                    className='h-10 w-10 rounded'
                />
            </div>
            <div className='text-white text-sm font-semibold '>
                {info.name}
            </div>
        </div>
    )   
}