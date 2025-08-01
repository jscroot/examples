import {setCookieWithExpireHour,getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/cookie.min.js";
import {onClick,getValue,addCSS} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.min.js";
import {postJSON,getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/api.min.js";
//import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/url.min.js";

//start import Sweet Alert
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11/src/sweetalert2.js';
await addCSS("https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.css");
//end sweet alert import

//config param
const urlBackend = "https://n-pts-yang-contamination.trycloudflare.com";


onClick("submit",PostSignIn);

function PostSignIn(){
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }
    postJSON(urlBackend+"/login",datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    if (result.status === 200) {
        getJSON(urlBackend+"/login", runafterGetUsername, "Token",tokenValue);
        setCookieWithExpireHour("token",result.data.token,2);
        let tokenValue=getCookie("token");
    }
}

function runafterGetUsername(result){
    console.log(result);
    Swal.fire(result.data.status, result.data.message + " : "+result.data.username, 'info');//success,warning,info,question
}
