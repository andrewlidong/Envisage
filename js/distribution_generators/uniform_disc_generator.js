export default class UniformSample {

    constructor(canvasHeight, canvasWidth, radius) {
        this.radius = radius;
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.points = [];
    }

    load() {
        const horizontalStep = this.radius;
        const verticalStep = Math.sqrt(Math.pow(this.radius, 2) - Math.pow((this.radius / 2), 2));

        let horizontalPosition = 0;
        let verticalPosition = 0;
        let evenRow = true;
        let point;

        let numPoints = 0;
        
        while (verticalPosition < this.canvasHeight) {
            horizontalPosition = evenRow ? 0 : this.radius / 2;
            while (horizontalPosition < this.canvasWidth) {
                point = { coords: [horizontalPosition, verticalPosition] };
                this.points.push(point);
                numPoints += 1;
                horizontalPosition += horizontalStep;
            }
            verticalPosition += verticalStep;
            evenRow = !evenRow;
        }
        return this.points;
    }
}
