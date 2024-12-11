import { useState } from "react";
import TextInput from "../components/shared/TextInput";
import {makeAuthenticatedPOSTRequest} from '../utils/serverHelpers' 


export default function CreatePlaylistModal({closeModal}){

    // state to store playlist name and playlist thumbnail data from the input fields
    const [playlistName, setPlaylistName] = useState("");
    const [playlistThumbnail, setPlaylistThumbnail] = useState("");

    // function to call POST API /playlist/create to create playlist and we recieve response
    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest("/playlist/create", {name:playlistName, thumbnail:playlistThumbnail, songs:[]});
        console.log(response);
        
        if(response._id)
            closeModal(); // close the createPlaylistModal form when a playlist is created
    }
    
    return(
        <div className="absolute w-screen h-screen bg-black bg-opacity-70 flex justify-center items-center" onClick={closeModal}> 
 
            <div className="bg-app-black w-1/3 rounded p-8" onClick={(e)=>{e.stopPropagation()}}> {/*since we applied the closeModal function on the parent div so the createplaylist modal keeps on closing when we click anywhere in the parent div, so to stop this we stopPropagation func on the only child of the parent this will prevent the createPlaylistModal form closing when we click on teh child(curr div)  */}

                <div className="font-bold text-white p-3">Create Playlist</div>
                <div className="space-y-5 flex flex-col justify-center items-center">
                    <TextInput 
                        label={"Name"} 
                        placeholder={"Playlist Name"} 
                        labelClassName={"text-white"}
                        value={playlistName}
                        setValue={setPlaylistName}
                    />
                    <TextInput 
                        label={"Thumbnail"} 
                        placeholder={"Thumbnail Link"} 
                        labelClassName={"text-white"}
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    />
                    <div className="font-semibold bg-white w-1/3 rounded flex justify-center items-center py-2 cursor-pointer hover:bg-opacity-80"
                        onClick={createPlaylist}
                    >
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
} 