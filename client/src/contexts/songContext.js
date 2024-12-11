// Passing Data Deeply with Context
// Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.
// So basically context in react is used to declare some data as global for 'specific' components so that we declare its default value in some file (eg. songContext.js) and then use it in desired compoents withour passing props again and again (i.e avoiding prop drilling)
// V I P : if we wrapped componetns A,B,C in a context.provider then A,B,C can access the valuse of that context as well as  childs,grandChilds,and so on.. of A,B,V can also access these values

import { createContext } from "react"; 

const songContext = createContext({
    currentSong: null,
    setCurrentSong: (currentSong) => {}, // these 2 values are default values for the time when page loads for the first time, but we do not want to use these, for this we will create state with these keys in the App.js and in that we will pass the default values as those values will overwrite these values 
    soundPlayed: null,
    setSoundPlayed: () => {}, // this state stores the current sound playing
    isPaused: null,  
    setIsPaused: ()=>{},  // state to store if curr song is played or paused rn, initially song is paused

});

export default songContext;


