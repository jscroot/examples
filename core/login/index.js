import {setCookieWithExpireHour} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/cookie.js";
import {onClick,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/api.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/url.js";

onClick("submit",PostSignUp);

function PostSignUp(){
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }
    postJSON("https://ped.fly.dev/auth/userdata",datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setCookieWithExpireHour("token",result.data.token,2);
}