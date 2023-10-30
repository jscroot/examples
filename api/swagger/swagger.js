import {setSwagger,UIData} from './swaggerfunction.js';
import SwaggerUIStandalonePreset from 'https://cdn.skypack.dev/swagger-ui-dist/swagger-ui-standalone-preset.js';

window.SwaggerUIStandalonePreset=SwaggerUIStandalonePreset;
window.ui = UIData;
window.onload = setSwagger();
