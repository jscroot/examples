window.onload = function () {
    // Begin Swagger UI call region
    const ui = SwaggerUIBundle({
        url: "./openapi.json", //Location of Open API spec in the repo
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