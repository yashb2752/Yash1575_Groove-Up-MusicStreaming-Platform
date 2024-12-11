
import { backendUrl } from "./config"; 

// here all the functions will be defined that will help us to make API calls directly by calling these functions 
// now we have defined deferent routes, some will work when user is logged in and some will work when user is not logged in, so for that purpose we will have to make different types of function


// for unauthenticated POST API calls -> example. makeUnauthenticatedPOSTRequest('/auth/login', loginData);
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    
    // we will use 'fetch' to make API calls in javascript
    // fetch(backendUrl, route, {some thinngs to specify}) will return the response sent by the /route api and store it in response 
    const response = await fetch(backendUrl + route, 
        {
            method:"POST",  // by default fetch has 'GET' req so we want 'POST' so lets specify that
            headers:{
                "Content-Type":"application/json" // we need to specify the headers content type as well
            },
            body:JSON.stringify(body) // converting the body recieved from user into string format, and set body equals to that
        }
    );  

    // now the response that we fetched will be stored in response in some wierd format so lets correct it
    const formattedResponse = await response.json(); // we have this predefined function in 'response' to format the data in {} JSON 
    return formattedResponse;
}; 


// for authentication POST API calls -> example. makeAuthenticatedPOSTRequest('/auth/login', loginData);
// note : first study the unAuthenticatedPOSTReq, then only different in auth and unAuth is that in AuthPostReq function we have the bearer token 
export const makeAuthenticatedPOSTRequest = async (route, body) => {
    
    const token = getToken();
    // we will use 'fetch' to make API calls in javascript
    // fetch(backendUrl, route, {some thinngs to specify}) will return the response sent by the /route api and store it in response 
    const response = await fetch(backendUrl + route, 
        {
            method:"POST",  // by default fetch has 'GET' req so we want 'POST' so lets specify that
            headers:{
                "Content-Type":"application/json", // we need to specify the headers content type as well
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(body) // converting the body recieved from user into string format, and set body equals to that
        }
    );  

    // now the response that we fetched will be stored in response in some wierd format so lets correct it
    const formattedResponse = await response.json(); // we have this predefined function in 'response' to format the data in {} JSON 
    return formattedResponse;
}; 

// note : we do not pass body in get request because we do not take input in GET req
export const makeAuthenticatedGETRequest = async (route) => {
    
    const token = getToken();
    // we will use 'fetch' to make API calls in javascript
    // fetch(backendUrl, route, {some thinngs to specify}) will return the response sent by the /route api and store it in response 
    const response = await fetch(backendUrl + route, 
        {
            method:"GET",  // by default fetch has 'GET' req so we want 'POST' so lets specify that
            headers:{
                "Content-Type":"application/json", // we need to specify the headers content type as well
                "Authorization":`Bearer ${token}`
            },
        }
    );  

    // now the response that we fetched will be stored in response in some wierd format so lets correct it
    const formattedResponse = await response.json(); // we have this predefined function in 'response' to format the data in {} JSON 
    return formattedResponse;
}; 

const getToken = () => {
    const accessToken = document.cookie.replace( // getting the token from cookies using regExpression
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken; 
}