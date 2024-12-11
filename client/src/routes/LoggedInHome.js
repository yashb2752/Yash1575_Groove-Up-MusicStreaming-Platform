import React, { useEffect,useState, useContext } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
import songContext from '../contexts/songContext';


// each playlist view stored in array of JSON objs where each object has data of each individual playlist 
const focusCardsData = [
    {
        title:"Peaceful Piano", 
        description:"Relax and indulge with peacuful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"
    },
    {
        title:"Deep Focus",
        description:"Keep calm and focus with this music",
        imgUrl:"https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
        title:"Instrumental Study",
        description:"Focus with soft study music",
        imgUrl:"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"
    },

    {
        title:"Focus Flow",
        description:"Up tempo instrumental beats",
        imgUrl:"https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww"
    },
    {
        title:"Beats to think to",
        description:"focus with deep techno and tech house",
        imgUrl:"https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"
    }
    
];  

const spotifyCardsPlaylist = [
    {title:"Todays Top Hits", description:"All top hits from 24hrs", imgUrl:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8fDA%3D"},
    {title:"Rap Cavier", description:"For all the rap lovers", imgUrl:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D"},
    {title:"All Out 2010s", description:"lets go back to the 10s time", imgUrl:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww"},
    {title:"Rock Classics", description:"Rock with some rock music", imgUrl:"https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMG11c2ljfGVufDB8fDB8fHww"},
    {title:"Punk", description:"Some of the Punk hits of this year", imgUrl:"https://images.unsplash.com/photo-1575672913784-11a7cd4f25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHVuayUyMHJvY2t8ZW58MHx8MHx8fDA%3D"},
];

export default function Home(){
    
    const [songsData, setSongsData] = useState([]);// array of song objects 

    // we want whenever a user clicks on a single song card, data of that song which we get form 'info' prop, will be saved in the 'currSong' of context 'SongContext' for globally use
    // one this to note is that in App.js i have already made logged in /myMusic route to access songContext and this 'singleSongCard' is a children of 'mySongs' route so it can also access that songcontext
    const {currentSong, setCurrentSong} = useContext(songContext); // fetch these 2 values from songContext using hook 'useContext' make sure to use {} and not []

    
    // fetch all songs from backend
    useEffect(()=>{

        const getData = async () => {
            const response = await makeAuthenticatedGETRequest('/song/get/all');
            setSongsData(response.data);
        }
        getData();
    },[])

    


    return(
        // this below is the repeatitive 'sidebar' 'navbar' 'songBar' code  and inside it is the 'children' prop, (reference : src/containers/LoggedInContainer)
        <LoggedInContainer curActiveScreen={"home"}>  {/* now why we passed this curActiveScreen = home, bacause now wheverever this component renderes, this value 'home'is passed to the Logged In container.js and there that screen becomes active */}
            
            {/* <PlaylistView titleText={"Focus"} cardsData={focusCardsData}/>
            <PlaylistView titleText={"More Playlists"} cardsData={spotifyCardsPlaylist}/>  */}
                        
            {/* updation : */}
            <div className='text-left font-semibold text-xl py-5'> 
                Top Songs 
            </div>
            <div className='w-full flex flex-wrap items-center justify-left'>
                {
                    songsData.map((songObject) => {
                        return (
                            <SongCard
                                songObject={songObject}
                                setCurrentSong={setCurrentSong}
                            />
                        )
                    })
                } 
            </div>

        </LoggedInContainer>
    );
}

// on the logged in /home section these song cards are displayed
// these are the songs from all over the database
const SongCard = ({songObject, setCurrentSong}) => {
    return(
        <div className='p-2 flex-col justify-center items-center w-1/6 cursor-pointer mx-4 my-4' onClick={()=>{
            setCurrentSong(songObject);
        }}>
           
        
            <div className='w-full'>
                <img 
                    src={songObject.thumbnail}
                    className='rounded-xl w-full'
                />
            </div>
            <div className='text-gray-300 text-left pt-2 pl-1 font-semibold text'> {songObject.name} </div>
            <div className='text-gray-500 text-sm text-left pl-1'> {songObject.artist.firstName + " " + songObject.artist.lastName}</div>
        </div>
    )
}


// with previous setup 
const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className='text-white w-full mt-8'>
            <div className='text-2xl font-semibold mb-5 text-left'>{titleText}</div>
            <div className='w-full flex justify-between space-x-4'>
                {/* cardsData will be an array of JSON objects where each object has data for each card */}
                {
                    cardsData.map((item) => {
                        return(
                            <Card 
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        )
                    })
                }

                {/* OLD NON GENERIC APPROACH ↘️ */}
                {/* <Card title={"Peaceful Piano"} description={"Relax and indulge with peacuful piano pieces"} imgUrl={"https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGlhbm98ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Deep Focus"} description={"Keep calm and focus with this music"} imgUrl={"https://plus.unsplash.com/premium_photo-1661601849507-78ccb5bbead3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R1ZHklMjBmb2N1c3xlbnwwfHwwfHx8MA%3D%3D"}/>
                <Card title={"Instrumental Study"} description={"Focus with soft study music"} imgUrl={"https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5zdHJ1bWVudGFsJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/>
                <Card title={"Focus Flow"} description={"Up tempo instrumental beats"} imgUrl={"https://images.unsplash.com/photo-1662330357136-3be4a00ab42d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9jdXMlMjBmbG93fGVufDB8fDB8fHww"}/>
                <Card title={"Beats to think to"} description={"focus with deep techno and tech house"} imgUrl={"https://images.unsplash.com/photo-1515615200917-f9623be1d8b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXRzJTIwc3R1ZHl8ZW58MHx8MHx8fDA%3D"}/> */}
                
            </div>
        </div>
    )
}

const Card = ({title, description, imgUrl}) => {
    return(
        <div className='bg-black bg-opacity-40 w-1/5 p-4 rounded-lg border border-gray-200 border-opacity-10 cursor-pointer hover:bg-yellow-100 hover:bg-opacity-5 delay-50 duration-200 hover:border-gray-600'>
            <div className='pb-4 bt-2'>
                <img 
                    className='w-full rounded-md'
                    src={imgUrl}
                    alt="playlist cover"
                />
            </div>
            <div className=' font-semibold text-left py-3'>{title}</div>
            <div className='text-sm text-gray-500 text-left'> {description} </div>
        </div>
    )
}

