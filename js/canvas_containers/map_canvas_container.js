export default class MapCanvasContainer {
    
    constructor(height, width, mapType) {
        this.htmlContainer = document.createElement("div");
        this.title = document.createElement("h3");
        this.title.innerHTML = "Generation Map";
        this.htmlContainer.appendChild(this.title);
        this.canvas = document.createElement("canvas");
        this.canvas.height = height;
        this.canvas.width = width;
        this.context = this.canvas.getContext('2d');
        this.htmlContainer.appendChild(this.canvas);
        this.description = document.createElement("p");
        this.description.innerHTML = this.generateDescription(mapType);
        this.htmlContainer.appendChild(this.description);
    }

    generateDescription(mapType) {
        switch (mapType) {
            case 'poisson':
                return (
                    "For each sample point a tree branch is generated, where each node is the active point and each additional sample represents a child to that parent." 
                );
            case 'best-candidate':
                return (
                    "For each sample point a graph is made where each edge connects a candidate with its nearest neighbor at the time when it is chosen."
                );
        }
    }

    getRGB(point) {
        const rgbVals = Array.from(this.imgContext.getImageData(...point, 1, 1).data.slice(0, 3));
        return `rgb(${rgbVals.join(', ')})`;
    }

    fillLine(pointA, pointB) {
        const gradient = this.context.createLinearGradient(pointA[0], pointB[0], pointA[1], pointB[1]);

        gradient.addColorStop(0, this.getRGB(pointA));
        gradient.addColorStop(1, this.getRGB(pointB));
        this.context.strokeStyle = gradient;
        this.context.stroke();
    }

    drawNextMapLine(points) {
        if (points.length === 0) {
            return;
        } else if (points[0].refCoords) {
            const newPoint = points[0].coords;
            const prevPoint = points[0].refCoords;
            this.context.beginPath();
            this.context.moveTo(prevPoint[0], prevPoint[1]);
            this.context.lineTo(newPoint[0], newPoint[1]);
            this.context.lineWidth = 2;
            this.fillLine(prevPoint, newPoint);
        }
        setTimeout(() => this.drawNextMapLine(points.slice(1)), 1);
    }

    renderSample(imgContext, points) {
        this.imgContext = imgContext;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawNextMapLine(points);
    }
}
