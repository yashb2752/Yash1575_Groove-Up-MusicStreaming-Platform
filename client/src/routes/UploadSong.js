import React from 'react';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import {useState} from 'react';

import {makeAuthenticatedPOSTRequest} from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import LoggedInContainer from '../containers/LoggedInContainer';

// new formatted and generalized code for 'UploadSong' using loggedInContainer
export default function UploadSong(){

    // states for the track 'name' and 'thumbnail  to store their datas
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState(""); // this will be used when user uploads a song this filename will appear that this particular file is uploaded
    // this 'setUploadedSongFileName' function when passed in a function or component it will be used to store data into 'uploadedSongFileName' 
    const navigate = useNavigate(); // to navigate/redirect to pages

    const submitSong = async() => {
        const data = {name, thumbnail, track:playlistUrl}; // fetch data from useStates

        // only user whose token is saved in cookies (or authenticated users) can create a new song thats why we use this AuthPost function from frontend that calls the API at backend 
        // this response contains the created song json obj send by backend
        const response = await makeAuthenticatedPOSTRequest("/song/create", data); // this func from frontend will call the API at backend which whill create a song at backend and send the created song JSON obj into this response 
        
        if(response.err){
            alert("Could'nt create song");
            return;
        }
        alert('Success'); 
        navigate("/home"); // ones a song is created successfully send him to /home page

    }

    return(
        <LoggedInContainer>
<div className='text-white mb-5 mt-8 text-left font-semibold text-2xl'>
                        Upload Your Music
                    </div>

                    <div className='w-2/3 flex space-x-3'>
                        <div className='w-1/2'>

                            <TextInput 
                                label={"Name"} 
                                placeholder={"Name"} 
                                labelClassName={"text-white"}
                                value={name}
                                setValue={setName}
                            />

                        </div>
                        <div className='w-1/2'>
                            <TextInput 
                                label={"Thumbnail"} 
                                placeholder={"Thumbnail"} 
                                labelClassName={"text-white"}
                                value={thumbnail}
                                setValue={setThumbnail}
                            />
                        </div>
                    </div>

                    <div className='text-left py-5' >

                        {/* if user has uploaded a song then the uploaded songs name should be displayed, if not then 'select Song' button should be displayed */}
                        {
                            uploadedSongFileName?(
                                <div className='bg-white text-black w-1/3 rounded-full p-3'> {uploadedSongFileName.substring(0,20)}.... </div>
                            ):(
                                <CloudinaryUpload 
                                    
                                    setUrl={setPlaylistUrl}
                                    setName={setUploadedSongFileName}  /* set Url will store the playlist url from the cloudinaryUpload page */
                                />
                            )
                        } 

                    </div>
                    <div className='w-40 p-3 bg-white text-black font-semibold rounded-full cursor-pointer hover:bg-gray-200' onClick={submitSong}>Sumbit Track</div>

        </LoggedInContainer>
    )
}

// //-------- old code (not generalized)
// export default function UploadSong(){

//     // const [songDuration, setSongDuration] = useState("");   // feature for later
    
//     // console.log(window);
//     // console.log(window.cloudinary);

//     // states for the track 'name' and 'thumbnail  to store their datas
//     const [name, setName] = useState("");
//     const [thumbnail, setThumbnail] = useState("");
//     const [playlistUrl, setPlaylistUrl] = useState("");
//     const [uploadedSongFileName, setUploadedSongFileName] = useState(""); // this will be used when user uploads a song this filename will appear that this particular file is uploaded
//     // this 'setUploadedSongFileName' function when passed in a function or component it will be used to store data into 'uploadedSongFileName' 
//     const navigate = useNavigate(); // to navigate/redirect to pages

//     const submitSong = async() => {
//         const data = {name, thumbnail, track:playlistUrl}; // fetch data from useStates

//         // only user whose token is saved in cookies (or authenticated users) can create a new song thats why we use this AuthPost function from frontend that calls the API at backend 
//         // this response contains the created song json obj send by backend
//         const response = await makeAuthenticatedPOSTRequest("/song/create", data); // this func from frontend will call the API at backend which whill create a song at backend and send the created song JSON obj into this response 
        
//         if(response.err){
//             alert("Could'nt create song");
//             return;
//         }
//         alert('Success'); 
//         navigate("/home"); // ones a song is created successfully send him to /home page

//     }

//     return(
//         <div className='h-full w-full flex'>

//             {/* this will be the left pannel */}
//             <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'>
//                 <div>
//                     <div className='logoDiv p-5' >
//                         <img src={spotify_logo} alt="spotify logo" width={125} />
//                     </div>
//                     <div className='py-5'>
//                         <IconText iconName={"material-symbols:home"} displayText={"Home"} active />
//                         <IconText iconName={"uil:search"} displayText={"Search"} />
//                         <IconText iconName={"clarity:library-solid"} displayText={"Library"} />
//                         <IconText iconName={"bxs:music"} displayText={"My Music"} />

//                     </div>

//                     <div className='pt-5'>
//                         <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} />
//                         <IconText iconName={"mdi:heart"} displayText={"Liked Songs"} />
//                     </div>

//                 </div>

//                 <div className='px-6 '>
//                     <div className='border border-gray-400 text-white flex w-2/5 rounded-full flex justify-center items-center py-1 cursor-pointer hover:border-white'>
//                         <Icon icon="humbleicons:globe" fontSize={18} />
                        
//                         <div className='ml-1 text-sm font-semibold'>English</div>
//                     </div>
//                 </div>
                
//             </div>

//             {/* this will be the right pannel */}
//             <div className='h-full w-4/5 bg-app-black'>
                    
//                 {/* in the right pannel this will be Navbar  */}
//                 <div className='navbar h-1/10 w-full bg-black bg-opacity-40 flex items-center justify-end'>
                    
//                     <div className='h-full w-1/2 flex items-center'>
//                         <div className='h-full w-3/5 flex items-center justify-around '>
//                             <TextWithHover displayText={"Premium"}/>
//                             <TextWithHover displayText={"Support"}/>
//                             <TextWithHover displayText={"Download"}/>
//                             <div className='h-1/2 border border-gray-500'></div>
//                         </div>
//                         <div className='h-full w-2/5 flex items-center justify-around '>
//                             <TextWithHover 
//                                 displayText={"Upload Song"}
//                             />
//                             <div className='h-10 w-10 py-4 px-4 bg-white flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-gray-200'>
//                                 YY
//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* this will be content below navbar */}
//                 <div className='content h-9/10 p-8 pt-0 text-white overflow-auto'>

//                     <div className='text-white mb-5 mt-8 text-left font-semibold text-2xl'>
//                         Upload Your Music
//                     </div>

//                     <div className='w-2/3 flex space-x-3'>
//                         <div className='w-1/2'>

//                             <TextInput 
//                                 label={"Name"} 
//                                 placeholder={"Name"} 
//                                 labelClassName={"text-white"}
//                                 value={name}
//                                 setValue={setName}
//                             />

//                         </div>
//                         <div className='w-1/2'>
//                             <TextInput 
//                                 label={"Thumbnail"} 
//                                 placeholder={"Thumbnail"} 
//                                 labelClassName={"text-white"}
//                                 value={thumbnail}
//                                 setValue={setThumbnail}
//                             />
//                         </div>
//                     </div>

//                     <div className='text-left py-5' >

//                         {/* if user has uploaded a song then the uploaded songs name should be displayed, if not then 'select Song' button should be displayed */}
//                         {
//                             uploadedSongFileName?(
//                                 <div className='bg-white text-black w-1/3 rounded-full p-3'> {uploadedSongFileName.substring(0,20)}.... </div>
//                             ):(
//                                 <CloudinaryUpload 
                                    
//                                     setUrl={setPlaylistUrl}
//                                     setName={setUploadedSongFileName}  /* set Url will store the playlist url from the cloudinaryUpload page */
//                                 />
//                             )
//                         } 

//                     </div>
//                     <div className='w-40 p-3 bg-white text-black font-semibold rounded-full cursor-pointer hover:bg-gray-200' onClick={submitSong}>Sumbit Track</div>

//                 </div>
                
//             </div>

//         </div>
//     )
// }
