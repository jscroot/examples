import swaggerUiDist from 'https://cdn.skypack.dev/swagger-ui-dist';
import swaggerUi from 'https://cdn.skypack.dev/swagger-ui';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "https://cdn.skypack.dev/swagger-ui";

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