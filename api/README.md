# RESTFull API Example

Swagger Documentation on Github Pages : [Demo](./swagger/) - [Source Code](https://github.com/jscroot/examples/tree/main/api/swagger)

## GET 

### From File

[Demo](./get/fromfile/) - [Source Code](https://github.com/jscroot/examples/tree/main/api/get/fromfile)

html file

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
<body>


<table class="table">
  <tbody id="lokasi">
    <tr>
      <th>Type</th>
      <th>Nama</th>
      <th>Kordinat</th>
    </tr>
  </tbody>
</table>

<script type="module" src="./get.js"></script>

</body>
</html>
```

get.js

```js
import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
import {URLGeoJson,responseData} from "./getfunction.js";

get(URLGeoJson,responseData);
```

getfunction.js

```js
import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

export let URLGeoJson = "./data.json";
export let tableTag="tr";
export let tableRowClass="content is-small";
export let tableTemplate=`
<td>#TYPE#</td>
<td>#NAME#</td>
<td>#KORDINAT#</td>
`

export function responseData(results){
    console.log(results.features);
    results.features.forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.name).replace("#KORDINAT#",value.geometry.coordinates);
    console.log(content);
    addChild("lokasi",tableTag,tableRowClass,content);
}
```

### From Goocle Cloud Function

[Demo](./get/fromgcf/) - [Source Code](https://github.com/jscroot/examples/tree/main/api/get/fromgcf)

html

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
<body>


<table class="table">
  <tbody id="lokasi">
    <tr>
      <th>Type</th>
      <th>Nama</th>
      <th>Kordinat</th>
    </tr>
  </tbody>
</table>

<script type="module" src="./get.js"></script>

</body>
</html>
```

get.js

```js
import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";
import {URLGeoJson,responseData} from "./getfunction.js";

get(URLGeoJson,responseData);
```

getfunction.js

```js
import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

export let URLGeoJson = "https://asia-southeast2-awangga.cloudfunctions.net/petapedia";
export let tableTag="tr";
export let tableRowClass="content is-small";
export let tableTemplate=`
<td>#TYPE#</td>
<td>#NAME#</td>
<td>#KORDINAT#</td>
`

export function responseData(results){
    console.log(results);
    results.forEach(isiRow);
}

export function isiRow(value){
    let content=tableTemplate.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.name).replace("#KORDINAT#",value.geometry.coordinates);
    console.log(content);
    addChild("lokasi",tableTag,tableRowClass,content);
}
```

## POST
### Form Catch Response

[Demo](./post/toapi/) - [Source Code](https://github.com/jscroot/examples/tree/main/api/post/toapi)

html file
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
<body>
    
  <div class="field">
        <label class="label" for="fname">First name:</label>
        <div class="control">
        <input class="input" type="text" id="fname" name="fname">
        </div>
</div>
<div class="field">
        <label class="label" for="lname">Last name:</label>
        <div class="control">
        <input class="input" type="text" id="lname" name="lname">
        </div>
</div>
<div class="field">
  <div class="control">
      <button class="button is-link is-light" type="submit" id="button" onclick="PostSignUp()">Submit</button>
    </div>
  </div>

  <div class="container">
     <div class="notification is-primary" id="pesan"></div>
    </div>

<script type="module" src="./post.js"></script>

</body>
</html>
```

post.js

```js
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import PostSignUp from "./postfunction.js";

window.PostSignUp = PostSignUp;
```

postfunction.js

```js
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
```

### Login and Save Token to Cookies

[Demo](./post/togcf/) - [Source Code](https://github.com/jscroot/examples/tree/main/api/post/togcf)
![image](https://github.com/jscroot/examples/assets/11188109/c5c6c6c7-f012-4108-b369-23c0856c3520)

html file
```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
  </head>
<body>
    
  <div class="field">
        <label class="label" for="username">Username:</label>
        <div class="control">
        <input class="input" type="text" id="username" name="username" value="petped">
        </div>
</div>
<div class="field">
        <label class="label" for="password">Password:</label>
        <div class="control">
        <input class="input" type="password" id="password" name="password" value="secret">
        </div>
</div>
<div class="field">
  <div class="control">
      <button class="button is-link is-light" type="submit" id="button" onclick="PostSignUp()">Submit</button>
    </div>
  </div>

  <div class="container">
     <div class="notification is-primary" id="pesan"></div>
    </div>

<script type="module" src="./post.js"></script>

</body>
</html>
```

post.js

```js
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import PostSignUp from "./postfunction.js";

window.PostSignUp = PostSignUp;
```

postfunction.js
```js
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp(){
    let target_url = "https://asia-southeast2-awangga.cloudfunctions.net/petapedia-post";
    let tokenkey = "token";
    let tokenvalue = "8e87pod9d9a8fh9sfd87f9dhsf98dsf98sdf9ssd98f";
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }

    postWithToken(target_url,tokenkey,tokenvalue,datainjson,responseData);

}

function responseData(result){
    setInner("pesan",result.message);
    setCookieWithExpireHour("token",result.token,2);
}
```