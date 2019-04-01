export default class AlgoDescContainer {

    constructor(title, description, demoSample) {
        this.title = title;
        this.description = description;
        this.demoSample = demoSample;
    }

    render() {
        const descriptionContainer = document.getElementById("desc-container");

        while (descriptionContainer.firstChild) {
            descriptionContainer.removeChild(descriptionContainer.firstChild);
        }
        
        const htmlTitle = document.createElement("h3");
        htmlTitle.innerHTML = this.title;
        descriptionContainer.appendChild(htmlTitle);
        const htmlDesc = document.createElement("p");
        htmlDesc.innerHTML = this.description;
        descriptionContainer.appendChild(htmlDesc);
        
        if (this.demoSample) {
            const demoCanvas = document.createElement("canvas");
            demoCanvas.height = this.demoSample.canvasHeight;
            demoCanvas.width = this.demoSample.canvasWidth;
            descriptionContainer.appendChild(demoCanvas);
            this.demoSample.demo(demoCanvas);
        }
    }
}
