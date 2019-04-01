import * as d3 from "d3";

export default class VoronoiCanvasContainer {
    
    constructor(height, width) {
        this.htmlContainer = document.createElement("div");
        this.htmlContainer.height = height + 50;
        this.htmlContainer.width = width + 50;
        this.title = document.createElement("h3");
        this.title.innerHTML = "Voronoi";
        this.htmlContainer.appendChild(this.title);
        this.canvas = document.createElement("canvas");
        this.canvas.height = height;
        this.canvas.width = width;
        this.context = this.canvas.getContext('2d');
        this.htmlContainer.appendChild(this.canvas);
        this.description = document.createElement("p");
        this.description.innerHTML = "For each sample a Voronoi polygon is generated, where each pixel within a polygon is closer to it's sample point than any others.  We use the sample point's color value to determine the polygon's color. ";
        this.htmlContainer.appendChild(this.description);
    }

    renderSample(imgContext, points) {
        this.imgContext = imgContext;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const voronoi = d3.voronoi();
        voronoi.extent([[0, 0], [this.canvas.height, this.canvas.width]]);
        const vertices = points.map(point => point.coords);
        const polygonLines = voronoi.polygons(vertices);
        this.drawNextPolygon(vertices, polygonLines);
    }

    drawNextPolygon(vertices, allPolygonLines) {
        const vertex = vertices[0];
        const polygonLines = allPolygonLines[0];

        if (!(vertex && polygonLines)) { return; }
        
        let rgb, rgbSum, currentPixelCoordinates, j;

        rgb = Array.from(this.imgContext.getImageData(vertex[0], vertex[1], 1, 1).data.slice(0, 3));
        
        currentPixelCoordinates = [polygonLines[0][0], polygonLines[0][1]];

        this.context.beginPath();
        this.context.moveTo(...currentPixelCoordinates);

        for (j = 1; j < polygonLines.length; j++) {
            currentPixelCoordinates = [polygonLines[j][0], polygonLines[j][1]];
            this.context.lineTo(...currentPixelCoordinates);
        }
        
        this.context.fillStyle = `rgb(${rgb.join(", ")})`;
        this.context.closePath();
        this.context.fill();

        setTimeout(() => this.drawNextPolygon(vertices.slice(1), allPolygonLines.slice(1)), 1);
    }
}
