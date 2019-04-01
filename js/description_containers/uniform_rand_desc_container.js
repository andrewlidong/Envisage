import AlgoDescContainer from './algo_desc_container';

export default class UniformRandomDescContainer extends AlgoDescContainer {
    
    constructor() {
        const title = "Uniform Random Sampling";
        const description = "Uniform random selects points at completely random X and Y coordinates until the sample size is reached.";
        super(title, description);
    }
}
