# Element 

## Set

[Demo](./set/) and [Source Code](https://github.com/jscroot/examples/tree/main/element/set)

index.html  
```html
<!DOCTYPE html>
<html>
<body>
<h1>JavaScript Modules</h1>

<p id="demo"></p>
<p id="demo2"></p>


<script type="module" src="./setinner.js"></script>
</body>
</html>
```
setinner.js  
```js
import { setInner } from "https://jscroot.github.io/element/croot.js";
import * as croot from "https://jscroot.github.io/element/croot.js";


setInner("demo","Dari croot.js import fungsi");
croot.setInner("demo2","Dari croot.js import fungsi dengan nama croot");
```