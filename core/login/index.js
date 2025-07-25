import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/cookie.js";
import {setInner} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/element.js";
import {getJSON} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/api.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.8/url.js";

if (getCookie("login")===""){
    redirect("/");
}

getJSON("https://api.do.my.id/data/user","login",getCookie("login"),responseFunction)

function responseFunction(result){
    if (result.status === 404){
        setInner("content","Silahkan lakukan pendaftaran terlebih dahulu "+result.data.name);
        redirect("/signup");
    }else{
        setInner("content","Selamat datang "+result.data.name);
        redirect("/dashboard");
    }
    console.log(result);
}