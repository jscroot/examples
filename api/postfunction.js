import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";

export default function PostSignUp(){
    let target_url = "https://eol0j1lmdtbpzp.m.pipedream.net";
    let tokenkey = "token";
    let tokenvalue = "8e87pod9d9a8fh9sfd87f9dhsf98dsf98sdf9ssd98f";
    let datainjson = {
        "namadepan": getValue("fname"),
        "namabelakang": getValue("lname")
    }

    postWithToken(target_url,tokenkey,tokenvalue,datainjson,responseData);

}



function responseData(result){
    setInner("pesan",result.success);
}
