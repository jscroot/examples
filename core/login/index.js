import {setCookieWithExpireHour} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/cookie.js";
import {onClick,getValue} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.js";
import {postJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/api.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/url.js";

onClick("submit",PostSignIn);

function PostSignIn(){
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }
    postJSON("https://labs-receipt-produced-ty.trycloudflare.com",datainjson,responseFunction);
}

function responseFunction(result){
    console.log(result);
    setCookieWithExpireHour("token",result.data.token,2);
}
