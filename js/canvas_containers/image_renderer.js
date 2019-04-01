import * as d3 from "d3";
import StipplingCanvasContainer from './stippling_canvas_container';
import VoronoiCanvasContainer from './voronoi_canvas_container';
import MapCanvasContainer from './map_canvas_container';

export default class ImageRenderer {
    constructor(originalImage, height, width, maxDotRadius) {
        this.imgContext = document.getElementById('image-canvas').getContext('2d');
        this.height = height;
        this.width = width;
        this.maxDotRadius = maxDotRadius;
        this.renderedImageCanvases = document.getElementById('sampled-canvases');
    }

    clearCanvases() {
        this.clearChildren(this.renderedImageCanvases);
    }

    clearChildren(...elements) {
        elements.forEach((el) => {
            while (el.firstChild) {
                el.removeChild(el.firstChild);
            }
        });
    }

    render(points, mapType) {
        this.clearCanvases();

        const voronoiCanvasContainer = new VoronoiCanvasContainer(this.height, this.width);
        this.renderedImageCanvases.appendChild(voronoiCanvasContainer.htmlContainer);
        voronoiCanvasContainer.renderSample(this.imgContext, points);

        const stipplingCanvasContainer = new StipplingCanvasContainer(this.height, this.width, this.maxDotRadius);
        this.renderedImageCanvases.appendChild(stipplingCanvasContainer.htmlContainer);
        stipplingCanvasContainer.renderSample(this.imgContext, points, this.maxDotRadius);
        
        if (mapType) {
            const mapCanvasContainer = new MapCanvasContainer(this.height, this.width, mapType);
            this.renderedImageCanvases.appendChild(mapCanvasContainer.htmlContainer);
            mapCanvasContainer.renderSample(this.imgContext, points);
        }
    }
}
