import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useContext, useState} from 'react'; 
import './App.css';
import './output.css';
import LoginComponent from './routes/Login.js';
import SignupComponent from './routes/Signup.js';
import UploadSong from './routes/UploadSong.js';
import HomeComponent from './routes/Home.js';
import MyMusic from './routes/MyMusic';
import { useCookies } from 'react-cookie';
import LoggedInHomeComponent from './routes/LoggedInHome.js';
import songContext from './contexts/songContext.js';
import SearchPage from './routes/SearchPage.js';
import Library from './routes/Library.js';
import SinglePlaylistView from './routes/SinglePlaylistView.js';

function App() {
  
  // we can directly fetch context data in App.js (we do not need to use useContext() in App.js to fetch the context values)
  // note : in App.js we define which routes can access context values and which routes can not, to allow specific routes and their childs to access context values wrap them in 'contextName.Provider' tag 
  const [soundPlayed, setSoundPlayed] = useState(null); 
  const [isPaused, setIsPaused] = useState(null);
  
  // note : we want song to play on all pages and routes for logged in users and not only on 'myMusic' page, so for that we defined context with 'currSong' and 'setCurrentSong' values to use those values on each page for logged in users
  const [currentSong, setCurrentSong] = useState(null);  // these state is used from context and will overwrite the value of context when page loads 
  const [cookie, setCookie] = useCookies(["token"]); // lets use token from cookies

  return (
    <div className="App w-screen h-screen font-poppins">
        <BrowserRouter>
        {
          // if token is there in cookies means user has been logged in, so he should only have access to below routes
          cookie.token?(  

            /* since we want our songContext.js values to be accessed by all these components so i wrapped all of them in this songContext component using .Provider predefined function */
            <songContext.Provider value={{currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused}}> 
              <Routes>
                <Route path="/" element={<LoggedInHomeComponent/>} />
                <Route path="/home" element={<LoggedInHomeComponent/>} /> {/* this is home component for only logged in users*/}
                <Route path="/uploadSong" element={<UploadSong/>} /> 
                <Route path="/myMusic" element={<MyMusic/>} /> 
                <Route path="/search" element={<SearchPage/>} /> 
                <Route path="/library" element={<Library/>} /> 
                <Route path="/playlist/:playlistId" element={<SinglePlaylistView/>} /> 
                <Route path="*" element={<Navigate to="/home"/>}/>   {/* if user is logged in then if he goes to any route where he is not supposed to eg. /login or /signup then navigate it to /home route */}
               </Routes>
            </songContext.Provider>

          ):(
            // if token not found in the cookies means user is not logged in, so he should only access these below routes
          <Routes>
            <Route path="/login" element={<LoginComponent/>} />;
            <Route path="/signup" element={<SignupComponent/>} />
            <Route path="/home" element={<HomeComponent/>} />
            <Route path="*" element={<Navigate to="/login"/>}/>   {/* if user is not logged in then if he goes to any route where he is not supposed to eg. / then navigate it to /login route automatically */}

          </Routes>
          )
        }
          
        </BrowserRouter>
    </div>
  );
}

// const Home = () => {
//   return (
//     <h1 className='pt-5'>/ ROOT PAGE For testing purpose only</h1>
//   )
// }
export default App;
