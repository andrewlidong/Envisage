import AlgoDescContainer from './algo_desc_container';

export default class UniformDescContainer extends AlgoDescContainer {
    
    constructor() {
        const title = "Uniform Sampling";
        const description = "Uniform grid takes points generated at set distance and angles from existing points.";
        super(title, description);
    }
}
