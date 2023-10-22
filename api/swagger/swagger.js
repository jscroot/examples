import swaggerUiDist from 'https://cdn.skypack.dev/swagger-ui-dist';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist";

window.onload = function () {
    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
        url: "./openapi.yaml", //Location of Open API spec in the repo
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
        ],
    })
    window.ui = ui
}