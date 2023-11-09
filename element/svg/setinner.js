import { setInner } from "https://jscroot.github.io/element/croot.js";
import * as croot from "https://jscroot.github.io/element/croot.js";
import textToSvg from 'https://cdn.skypack.dev/text-to-svg';

const attributes = {fill: 'red', stroke: 'black'};
const options = {x: 0, y: 0, fontSize: 72, anchor: 'top', attributes: attributes};

const svg = textToSVG.getSVG('hello', options);

setInner("demo",svg);
croot.setInner("demo2",svg);
