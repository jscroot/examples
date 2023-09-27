import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner } from "https://jscroot.github.io/element/croot.js";

let URLGeoJson = "https://jscroot.github.io/examples/api/data.json";

get(URLGeoJson,isiTable);


function isiTable(results){
    results.features.forEach(isiRow);
}

function isiRow(value){
    let content=tableContent.replace("#TYPE#",value.type).replace("#NAME#",value.Phone_number).replace("#KORDINAT#",value.Location);
    addChild("presensi",tableTag,tableRowClass,tableContent);
}


let tableTag="tr";
let tableRowClass="tablekordinat";
let tableContent=`
<td>#TYPE#</td>
<td>#NAME#</td>
<td>#KORDINAT#</td>
`