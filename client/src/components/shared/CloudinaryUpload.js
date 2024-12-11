// this is the code which helps us have the upload feature to the cloudinary cloud 
//https://console.cloudinary.com (use this url to create a cloudinary acc)

 
import { openUploadWidget } from "../../utils/CloudinaryService";
import {cloudinary_upload_preset} from '../../config.js';

const CloudinaryUpload = ({setUrl, setName}) => { 

  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "drrlxyc7e", // this is ur cloud name u can get from ur cloudinary dashboard
        uploadPreset: cloudinary_upload_preset,// do not use {cloudinary_upload_preset} , also this is ur upload preset, get it from cloudinary dashboard > settings > upload > upload presets > Name
        sources: ["local"] // we can add "camera" if we want input from camera of user
      },
      function (error, result) {   // 📝this 'result.info' prop will be an object with all the properties of uploaded item, eg uploaded 'secure_url' which will be hosted url of uploaded item
        if (!error && result.event === "success") {
            
            setUrl(result.info.secure_url); // storing url into setUrl() in useState of uploadSong
            setName(result.info.original_filename); // store song's file name in the states of whichever file uses this cloudinary upload button

           //console.log(result.info);  /// complete object of newly created 
            //console.log(result.info.secure_url); // this will br the url of uploaded hosted item 
            //console.log(result.info.original_filename); // this will br the url of uploaded hosted item 
        
        }
        else{
            if(error)
                console.log(error); // can not upload songs
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black font-semibold py-3 px-4 rounded-full" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
