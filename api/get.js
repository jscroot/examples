import { get } from "https://jscroot.github.io/api/croot.js";
import {setInner } from "https://jscroot.github.io/element/croot.js";


get(URLGeoJson,isiTable);


export let URLGeoJson = "https://jscroot.github.io/examples/api/data.json";

export function isiTable(results){
    results.forEach(isiRow);
}

function isiRow(value){
    let content=tableContent.replace("#TYPE#",value.type).replace("#NAME#",value.Phone_number).replace("#KORDINAT#",value.Location);
    addChild("presensi",tableTag,tableRowClass,tableContent);
}


export let tableTag="tr";
export let tableRowClass="tablekordinat";
export let tableContent=`
<td>#TYPE#</td>
<td>#NAME#</td>
<td>#KORDINAT#</td>
`