import React, { useContext, useLayoutEffect ,useRef} from 'react';
import {useState} from 'react';
import IconText from '../components/shared/IconText';
import { Icon } from '@iconify/react';
import TextWithHover from '../components/shared/TextWithHover';
import {Howl, Howler} from 'howler';
import songContext from '../contexts/songContext';
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

/* ⭐imp note : so basically this file contains all the raw code for 'sideBar' 'navbar' and bottom 'songBar' which
                is used as it is again and again in different routes like '/home' '/mySongs' '/search' etc so we want that we do not render these same things again and again
                so for this what we want is that we are writing this code here and whenever we want 'sidebar,navbar,songBar' in our page we will call this 'LoggedInContainer' Compoent
                
    imp note 2 : here if u check that in every page basically only the right mid content is always changed, rest is same so we will write 
                {children} and pass children as a prop in this page so that whever we call this 'LoggedInContainer' component, inside it we write the right mid part code only
                eg. 
                <LoggedInContainer>
                    <div>This is the right mid content </div>
                </LoggedInContainer> 

                in react this 'children' keyword is used for this purpose only so that the repeated code is not written again and again and only the non repeating code is 
                writen as the child of the 'LoggedInContainer' here (for fast rendering)
*/


export default function LoggedInContainer({children, curActiveScreen}){

    // only render the createPlaylistModal when this state is true
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false); // state to store whenter create playlist modal is open or closed, initially closed, it will open when user clicks on createPlaylist button   

    // only render the addToPlaylistModal when this state is true
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false); // state to store whenter create playlist modal is open or closed, initially closed, it will open when user clicks on createPlaylist button   

    // these are already passed in Provider, so we can here fetch them in this file using 'useContext()' from songContext.js file
    // get the global values of currentSong and setCurrentSong from 'songContext' via 'getContext' hook
    const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused} = useContext(songContext); // this currentSong will have value of obj 'info' of song which is global

    const firstUpdate = useRef(true); // useRef here is used to keep track of this const 

    //basically useEffect will work whenever 'currentSong' (passed at end of useEffect) changes its value or rerenders
    // this is a problem so lets solve it it using 'useLayoutEffect' which is little bit diff from useEffect
    useLayoutEffect(()=>{

        // now whenever screen renders for 1st time(on every reload) this value of firstUpdate.current is true, and then we set it to false and return the function
        // this is the solution to the new song play on every time we switch routes problem  -> how ? beacause the reasong for that problem was that every tiime we play a sng and switch the routes a copy of that song played again in the bg bacause this function 'useLayoutEffect' runs every time we switch routes as well, so whenever we now switch the routes the value of 'firstUpdate=true' and then we set it to false and return the function, so copy of song will not play in bg 
        // but the new issue that arrises is every time we switch routes the value of states 'soundPlayed' and 'isPaused' are set to null again because they are local for this file only , so to fix this i am moving the 'soundPlayed' and 'isPaused' to context and making them global 
        if(firstUpdate.current){ 
            firstUpdate.current = false;
            return;
        } 

        if(!currentSong){
            return;
        }
        // console.log("song changed"); // for error check purpose
        changeSong(currentSong.track);

    },[currentSong && currentSong.track]) // this useLayoutEffect will work only when the currentSong.track changes other wise not 


    //2. function to play the soundPlayed 
    const playSound = () => {
        if(!soundPlayed){ // if soundPlayed is null do not play it
            return;
        }
        soundPlayed.play(); // play current song
    }

    // this func will take effect whenever user cicks on a single song card to play that song
    const changeSong = (songSrc) => { 

        if(soundPlayed){  // if a song is alrady playing then stop it first
            soundPlayed.stop();
        }
        
        let sound = new Howl({ 
            src: [songSrc], // get the src of song that user wants to play now
            html5: true
        });

        setSoundPlayed(sound); // update 'soundPlayed' value with the 'currentSong' (sent by the singleSongCard) 
        sound.play();  // and play this new song
        setIsPaused(false);
    }

    //3. this func will pause the curr sound
    const pauseSound = () => {
        soundPlayed.pause();  // when user clicks pause, pause the song
    }

    //1. this func will togle the sound -> if its being played then this func stops it, if it is stoped then this func playes it
    const togglePlayPause = () => {
        if(isPaused){ 
            playSound(); // when user toggle a song
            setIsPaused(false); // update isPaused varaible
        }
        else{
            pauseSound(); // call the above pause sound func
            setIsPaused(true);// update isPaused varaible
        }
    }

    // func to add curr song to a playlist(given playlist_id) 
    // note : i declared this func here coz currSong is here
    const addSongToPlaylist = async (playlistId) =>{
        const songId = currentSong._id; // fetch currSong id from currSong state

        const payLoad = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payLoad); // add song to playlist by calling Post api at backend 
        
        if(response._id)// if song successfully added to the desired playlist, then close the AddToPlaylist Modal
            setAddToPlaylistModalOpen(false)
    }   

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    return(
        <div className='h-full w-full bg-app-black'>

            {/* only render the createPlaylistModal when this createPlaylistModalOpen state is set to true */}
            {createPlaylistModalOpen && <CreatePlaylistModal closeModal={()=>{setCreatePlaylistModalOpen(false)}}/> } {/* we passed the closeModal func as prop to this comp and inside that comp, when user clicks on outter div of the createplaylistModal this state will set to false */}  

            {/* only render the addToPlaylistModal when this addToPlaylistModalOpen state is set to true */}
            {
                addToPlaylistModalOpen &&  
                <AddToPlaylistModal 
                    closeModal={() => {setAddToPlaylistModalOpen(false)}} 
                    addSongToPlaylist={addSongToPlaylist} // we need to use this func in the 'AddToPlaylistModal' file so this way we are sending this func from this file to that file 
                />
            }  

            {/*[content from top navbar to bottom (Excluding songBar)] this will be the upper 90% screen (without song play bar) */}
            <div className={`${currentSong?("h-9/10"):("h-full")} w-full flex `}> {/* when a curr song is null means no song played by user then we this screen will be full (no song bar at bottom), if not null then this screen will take height of 90% of screnn and rest 10%is for songBar*/}

                {/* this will be the left pannel */}
                <div className='h-full w-1/5 bg-black flex flex-col justify-between pb-7'> 
                    <div>
                        <div className='logoDiv p-5 flex justify-start space-x-4 cursor-pointer' >
                            {/* <img src={spotify_logo} alt="spotify logo" width={125} /> */} 
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="white" d="M18.65.226A16 16 0 0 0 16 0C7.16 0 0 7.16 0 16c0 3.394 1.067 6.53 2.86 9.131c1.1-1.616 3.637-2.731 6.578-2.731c2.02 0 3.847.533 5.156 1.39zm8.502 4.315c2.763 6.11.339 9.374.339 9.374c-1.875-5.64-7.305-6.464-7.305-6.464s-3.572 19.248-3.572 19.49c0 2.085-2.214 3.847-5.22 4.38A16.01 16.01 0 0 0 16 32c8.84 0 16-7.16 16-16c0-4.493-1.859-8.55-4.848-11.459"/></svg>
                            <div className='text-white flex justify-center items-center font-semibold text-xl'>GrooveUp</div>
                        </div>
                        <div className='py-5'>
                            <IconText 
                                iconName={"material-symbols:home"} 
                                displayText={"Home"} 
                                targetLink={"/home"} 
                                active={curActiveScreen === "home"} // if current Active Screen is home then value of active will be 'true' else false
                            />
                            <IconText 
                                iconName={"uil:search"} 
                                displayText={"Search"} 
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText  
                                iconName={"clarity:library-solid"} 
                                displayText={"Library"} 
                                active={curActiveScreen === "library"} 
                                targetLink={"/library"}
                            />
                            <IconText 
                                iconName={"bxs:music"} 
                                displayText={"My Music"} 
                                targetLink={"/myMusic"}
                                active={curActiveScreen === "myMusic"} // if current Active Screen is myMusic then value of active will be 'true' else false
                            />
                        </div>

                        <div className='pt-5'>
                            <IconText 
                                iconName={"material-symbols:add-box"} 
                                displayText={"Create Playlist"} 
                                onClick={()=>{
                                    setCreatePlaylistModalOpen(true); // means on clicking the createPlaylist icon, set the createPlaylistModal=true
                                }}
                            />
                            <IconText 
                                iconName={"mdi:heart"} 
                                displayText={"Liked Songs"} 
                            />
                        </div>

                    </div>

                    {/* <div className='px-6 '>
                        <div className='border border-gray-400 text-white flex w-2/5 rounded-full flex justify-center items-center py-1 cursor-pointer hover:border-white'>
                            <Icon icon="humbleicons:globe" fontSize={18} />
                            <div className='ml-1 text-sm font-semibold'>English</div> 
                        </div>
                    </div> */}
                    
                </div>

                {/* this will be the right pannel */}
                <div className='h-full w-4/5 bg-app-black'>
                     
                    {/* in the right pannel this will be Navbar  */}
                    <div className='navbar h-1/10 w-full bg-black bg-opacity-40 flex items-center justify-end'>
                        
                        <div className='h-full w-1/2 flex items-center'>
                            <div className='h-full w-2/5 flex items-center justify-around '>
                                {/* <TextWithHover displayText={"Premium"}/>
                                <TextWithHover displayText={"Support"}/>
                                <TextWithHover displayText={"Download"}/>
                                <div className='h-1/2 border border-gray-500'></div>
                                 */}
                            </div>
                            <div className='h-full w-3/5 flex items-center justify-around '>
                                {/* <TextWithHover 
                                    displayText={"Upload Song"}
                                    targetLink={"/uploadSong"}
                                /> */}

                                <div className='cursor-pointer bg-white  font-semibold  py-2 px-2 rounded text-black hover:opacity-90 delay-100 duration-150'
                                    onClick={()=>{
                                        navigate("/uploadSong");
                                    }}
                                >
                                    Upload Song
                                </div>
                                <div className='h-10 w-10 py-4 px-4 bg-white flex justify-center items-center rounded-full font-semibold cursor-pointer hover:bg-gray-200'>
                                    U
                                </div>
                                

                                <div className='text-white border flex justify-center space-x-2 items-center border-gray-500 py-2 px-3 rounded cursor-pointer duration-200 delay-100 text-sm hover:bg-white hover:bg-opacity-20 hover:font-bold hover:font-semibold '
                                    onClick={()=>{
                                        // removeCookie();
                                        const confirmLogout = window.confirm('Do you want to Log Out ?');
                                        if(confirmLogout){
                                            removeCookie("token");
                                        }
                                    }}
                                >
                                    <div> Log Out </div>
                                    <Icon icon="line-md:log-out" fontSize={20}/>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* this will be content below navbar */}
                    <div className='content h-9/10 p-8 pt-0 text-white overflow-auto'>
                        {/* this below code is non repeating code sent from whever this 'LoggedInComponent' is called */}
                        {children} 
                    </div>
                    
                </div>
            </div>

            {/* song play/pause bar*/}
            {
                // conditionally rendering i.e when value of currentSOng is not null, then only this screen should be rendered 
                currentSong && (
            
                <div className='h-1/10 w-full bg-black bg-opacity-30 flex items-center '>

                    {/* this will be left part of song play bar */}
                    <div className='w-1/4 h-full flex items-center p-4' >
                        <img 
                            // src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Metro_Boomin_-_Heroes_%26_Villains.png/220px-Metro_Boomin_-_Heroes_%26_Villains.png"
                            src={currentSong.thumbnail} // set currentSongs thumbnail as the bottom song bar thumbnail
                            className='h-11 w-11 rounded '
                            alt="art cover"
                        />
                        <div className='pl-4'>
                            <div className='text-white text-sm text-left cursor-pointer hover:underline max-w-max'>
                                {currentSong.name} 
                            </div>
                            <div className='text-gray-400 text-xs text-left cursor-pointer hover:underline max-w-max'>
                                {currentSong.artist.firstName + " " + currentSong.artist.lastName} {/*because currentSong.artist is an object with all info of artist that fetched did with .populate() function in backend*/}
                            </div>
                        </div>
                    </div>

                    {/* this will me middle part of song play bar */}
                    <div className='w-2/4 h-full flex justify-center flex-col items-center '>

                        <div className='w-1/3 flex justify-center items-center justify-between  h-full'>
                            {/* song play,pause,repeat etc, controls */}
                            <Icon 
                                icon="mi:shuffle" 
                                fontSize={20}  
                                className='text-gray-400 cursor-pointer hover:color-white hover:text-white'
                            />
                            <Icon 
                                icon="fluent:previous-32-filled" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white' 
                            />
                            <Icon  /* Play/Pause icon*/
                                icon={isPaused?"carbon:play-outline":"carbon:pause-outline"} 
                                fontSize={35} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                                onClick={
                                    ()=>{togglePlayPause()}
                                }
                            />
                            <Icon 
                                icon="fluent:next-32-filled" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                            />
                            <Icon 
                                icon="material-symbols:repeat" 
                                fontSize={20} 
                                className='text-gray-400 cursor-pointer hover:text-white'
                            />
                        </div>

                        <div>
                            {/* song progress bar */}
                        </div>
                    </div>

                    <div className='w-1/4 h-full flex items-center justify-end pr-5 space-x-3' >
                        <Icon 
                            icon="material-symbols:playlist-add" 
                            fontSize={30} 
                            className='text-gray-400 cursor-pointer hover:text-white'
                            onClick={()=>{setAddToPlaylistModalOpen(true)}} // open the add to playlist modal when user clicks on this playlist icon at the songBar at bottom right
                        />
                        <Icon 
                            icon="ion:heart-outline" 
                            fontSize={30} 
                            className='text-gray-400 cursor-pointer hover:text-white' 
                        />
                    </div>

                </div>
            )}
        </div>
    )
}
