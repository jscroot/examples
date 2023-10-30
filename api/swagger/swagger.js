import {setSwagger,UIData} from './swaggerfunction.js';
import SwaggerUIStandalonePreset from 'https://cdn.skypack.dev/swagger-ui-dist/swagger-ui-standalone-preset.js';
import SwaggerUIBundle from 'https://cdn.skypack.dev/swagger-ui-dist/swagger-ui-bundle.js';

window.SwaggerUIBundle=SwaggerUIBundle;
window.SwaggerUIStandalonePreset=SwaggerUIStandalonePreset;
window.ui = UIData;
window.onload = setSwagger();
