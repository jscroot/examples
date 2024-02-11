# examples
Vanilla JS ES6+ Example

## Section Details
Section :
1. [Element](./element/)
2. [Form Handling and RESTFull API](./api/)

## Cookies based User Session Handling
To check the login cookies and redirect to the login page if the login cookie doesn't exist
```js
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/cookie@0.0.1/croot.js";
import {redirect} from "https://cdn.jsdelivr.net/gh/jscroot/url@0.0.9/croot.js";

//check if login cookies is exist
if(!getCookie("login")){
    redirect("/");
}
```

## Async Handling
This is a sample of a four-step run of the js command, where js can be run in serial and parallel mode:
```js
import {functionName, runFunction} from "https://cdn.jsdelvr.com/gh/jscroot/croot.js";
// Step 1: run and wait until finish execute
await functionName(arg);
// Step 2: Just run without waiting until finished, immediately go to the next step
runFunction(arg);
// Step 3: Run after HTML loaded
document.addEventListener('DOMContentLoaded', function() {
  // initial HTML document has been completely loaded and parsed, without waiting
  // for stylesheets, images, and subframes to finish loading
  console.log('DOM fully loaded and parsed');
});
// Step 4: Run after all loaded
window.addEventListener('load', (event) => {
    //This includes after-all assets like images, scripts, and CSS files.
    //Loaded
    console.log('The page has fully loaded');
});
```
