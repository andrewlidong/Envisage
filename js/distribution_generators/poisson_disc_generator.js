export default class poissonSample {

    constructor(maxHeight, maxWidth, radius, maxCandidates) {
        this.cellSize = Math.floor(radius / Math.sqrt(2));
        this.maxCandidates = maxCandidates;
        this.radius = radius;
        this.canvasHeight = maxHeight;
        this.canvasWidth = maxWidth;
        this.gridHeight = Math.ceil(maxHeight / this.cellSize) + 1;
        this.gridWidth = Math.ceil(maxWidth / this.cellSize) + 1;
    }

    reset() {
        this.grid = this.initializeGrid();
        this.points = [];
        this.numPoints = 0;
        this.activePoints = [];
    }

    initializeGrid() {
        let rowIdx, colIdx;

        const grid = [];
        for (rowIdx = 0; rowIdx < this.gridHeight; rowIdx++) {
            grid[rowIdx] = new Array(this.gridWidth);
        }
        return grid;
    }

    pointToGridCoordinates(coords) {
        let rowIdx, colIdx;

        rowIdx = Math.floor(coords[1] / this.cellSize);
        colIdx = Math.floor(coords[0] / this.cellSize);
        return [rowIdx, colIdx];
    }


    insert(newPoint) {
        let rowIdx, colIdx;

        this.points.push(newPoint);
        this.activePoints.push(newPoint);
        
        [rowIdx, colIdx] = this.pointToGridCoordinates(newPoint.coords);
        this.grid[rowIdx][colIdx] = newPoint;
        this.numPoints += 1;
    }

    distance(pointA, pointB) {
        const squaredDist = Math.pow((pointA.coords[0] - pointB.coords[0]), 2) + Math.pow((pointA.coords[1] - pointB.coords[1]), 2);
        return Math.sqrt(squaredDist);
    }

    isInRange(point) {
        return (point.coords[0] > 0 &&
            point.coords[0] < this.canvasWidth &&
            point.coords[1] > 0 &&
            point.coords[1] < this.canvasHeight);
    }

    isValidPoint(point) {
        let rowIdx, colIdx;

        if (!this.isInRange(point)) { return false; }
        [rowIdx, colIdx] = this.pointToGridCoordinates(point.coords);

        const rowIdxMin = Math.max(0, rowIdx - 1);
        const colIdxMin = Math.max(0, colIdx - 1);
        const colIdxMax = Math.min(this.gridWidth - 1, colIdx + 1);
        const rowIdxMax = Math.min(this.gridHeight - 1, rowIdx + 1);

        for (rowIdx = rowIdxMin; rowIdx <= rowIdxMax; rowIdx++) {
            for (colIdx = colIdxMin; colIdx <= colIdxMax; colIdx++) {
                if (this.grid[rowIdx][colIdx] && this.distance(this.grid[rowIdx][colIdx], point) < this.radius) {
                    return false;
                }
            }
        }

        return true;
    }

    drawPoints() {
        this.points.forEach(point => {
            this.context.beginPath();
            this.context.arc(point.coords[0], point.coords[1], (this.radius - 1) / 3, 0, 2 * Math.PI);
            this.context.lineWidth = 1;
            this.context.fillStyle = "#353638";
            this.context.fill();
        });
    }

    drawActives() {
        this.activePoints.forEach(point => {
            this.context.beginPath();
            this.context.arc(point.coords[0], point.coords[1], (this.radius - 1) / 3, 0, 2 * Math.PI);
            this.context.lineWidth = 1;
            this.context.fillStyle = "#022c5b";
            this.context.fill();
        });
    }

    drawCandidate(candidate) {
        this.context.beginPath();
        this.context.arc(candidate.coords[0], candidate.coords[1], (this.radius - 1) / 3, 0, 2 * Math.PI);
        this.context.lineWidth = 1;
        this.context.strokeStyle = "black";
        this.context.stroke();
    }

    drawRefPoint(referencePoint) {
        this.context.beginPath();
        this.context.arc(referencePoint.coords[0], referencePoint.coords[1], (this.radius - 1) / 3, 0, 2 * Math.PI);
        this.context.lineWidth = 5;
        this.context.fillStyle = "#9b0303";
        this.context.fill();
    }

    drawChoiceCandidate(candidate) {
        this.context.beginPath();
        this.context.arc(candidate.coords[0], candidate.coords[1], (this.radius - 1) / 3, 0, 2 * Math.PI);
        this.context.lineWidth = 1;
        this.context.fillStyle = "#036d44";
        this.context.fill();
    }

    demoNextCandidate(numCandidates, referencePoint, referenceIdx) {
        if (numCandidates > this.maxCandidates) {
            this.activePoints.splice(referenceIdx, 1);
            setTimeout(() => this.demoNextActive(), 1000);
        } else {
            let theta = Math.random() * 360;
            let distance = Math.random() * this.radius + this.radius;
            let candidatePoint = {
                coords: [distance * Math.cos(theta) + referencePoint.coords[0],
                distance * Math.sin(theta) + referencePoint.coords[1]]
            };
            this.drawCandidate(candidatePoint);

            if (this.isValidPoint(candidatePoint)) {
                this.insert(candidatePoint);
                setTimeout(() => {
                    this.drawChoiceCandidate(candidatePoint);
                    setTimeout(() => this.demoNextActive(), 1000);
                }, 500);
            } else {
                setTimeout(() => this.demoNextCandidate(numCandidates + 1, referencePoint, referenceIdx), 100);
            }
        }
    }

    demoNextActive() {
        if (this.activePoints.length === 0) {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawPoints();
        } else {
            let referenceIdx = Math.floor(Math.random() * this.activePoints.length);
            let referencePoint = this.activePoints[referenceIdx];
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawPoints();
            this.drawActives();
            this.drawRefPoint(referencePoint);

            setTimeout(() => this.demoNextCandidate(0, referencePoint, referenceIdx), 1000);
        }
    }

    demo(canvas) {
        this.reset();

        const p0 = {
            coords: [Math.round(Math.random() * this.canvasWidth),
            Math.round(Math.random() * this.canvasHeight)]
        };

        this.insert(p0);
        this.context = canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);


        setTimeout(() => this.demoNextActive(), 100);
    }

    load() {
        this.reset();

        const p0 = {
            coords: [Math.round(Math.random() * this.canvasWidth), Math.round(Math.random() * this.canvasHeight)]
        };

        this.insert(p0, null);

        let referenceIdx, referencePoint, numCandidates, candidateMaxReached, candidatePoint, theta, distance;

        while (this.activePoints.length > 0) {
            referenceIdx = Math.floor(Math.random() * this.activePoints.length);
            referencePoint = this.activePoints[referenceIdx];
            candidateMaxReached = true;
            for (numCandidates = 0; numCandidates <= this.maxCandidates; numCandidates++) {
                theta = Math.random() * 360;
                distance = (Math.random() * this.radius + this.radius);
                candidatePoint = {
                    coords: [distance * Math.cos(theta) + referencePoint.coords[0],
                    distance * Math.sin(theta) + referencePoint.coords[1]],
                    refCoords: referencePoint.coords
                };
                if (this.isValidPoint(candidatePoint)) {
                    this.insert(candidatePoint);
                    candidateMaxReached = false;
                    break;
                }
            }
            if (candidateMaxReached) {
                this.activePoints.splice(referenceIdx, 1);
            }
        }
        return this.points;
    }
}
