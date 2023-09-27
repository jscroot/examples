import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner,addChild } from "https://jscroot.github.io/element/croot.js";

let URLGeoJson = "https://jscroot.github.io/examples/api/data.json";

get(URLGeoJson,responseData);


function responseData(results){
    console.log(results.features);
    results.features.forEach(isiRow);
}

function isiRow(value){
    let content=tableContent.replace("#TYPE#",value.geometry.type).replace("#NAME#",value.properties.name).replace("#KORDINAT#",value.geometry.coordinates);
    console.log(content);
    //addChild("presensi",tableTag,tableRowClass,tableContent);
}


let tableTag="tr";
let tableRowClass="tablekordinat";
let tableContent=`
<td>#TYPE#</td>
<td>#NAME#</td>
<td>#KORDINAT#</td>
`