
import { useContext } from "react"; // this hook is used to access a particular context in a file
import songContext from "../../contexts/songContext";

export default function SingleSongCard({info, playSound}){ // 'info' prop will be passed in the myMusic.js to where this info is a object of each song sent my the 'MySong' API from the backend  

    // we want whenever a user clicks on a single song card, data of that song which we get form 'info' prop, will be saved in the 'currSong' of context 'SongContext' for globally use
    // one thing to note is that in App.js i have already made logged in /myMusic route to access songContext and this 'singleSongCard' is a children of 'mySongs' route so it can also access that songcontext
    const {currentSong, setCurrentSong} = useContext(songContext); // fetch these 2 values from songContext using hook 'useContext' make sure to use {} and not []
    console.log(info);

    return(

        // this is a single song card, whenver user clicks on any single song card, the info obj (containing all info of this song card track) will be set in the global context value for 'currentSong' via 'setCurrentSong' func
        <div className="text-white flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" onClick={() => {setCurrentSong(info)}}>  

            {/* dynamically importing img in a div */}
            <div className="h-12 w-12 bg-cover bg-center" style={{ 
                backgroundImage: `url("${info.thumbnail}")`
            }}>
            </div>

            <div className="flex w-full">

                <div className="pl-4 w-5/6 ">  {/* for song name and artist name*/}
                    <div className="text-white text-left cursor-pointer hover:underline  max-w-max">{info.name}</div> {/* max-w-max means max width of thid div will be equal to max width content inside it needs */}
                    <div className="text-gray-300 text-xs text-left cursor-pointer hover:underline max-w-max">{info.artist.firstName + " " + info.artist.lastName}</div>
                </div>

                {/* for displaying track time */}
                <div className="w-1/6 flex justify-center items-center text-gray-300">  {/* for more and like icon and track time */}
                    
                </div>
            </div>
        </div>
    
    );
}