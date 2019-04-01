import AlgoDescContainer from './algo_desc_container';
import PoissonSample from '../distribution_generators/poisson_disc_generator';

export default class PoissonDescContainer extends AlgoDescContainer {

    constructor() {
        const title = "Poisson Sampling";
        const description = "Poisson sampling chooses a sample from a completely random cluster" 
        + "and attempts to find a suitable candidate within its annulus. "
        + "It delivers a tight, random cluster of samples by placing new samples distance 2r from the existing sample. " 
        + "Meanwhile it also ensures that the sample isn't within distance r of any other.";
        const demoSample = new PoissonSample(400, 600, 20, 20);
        super(title, description, demoSample);
    }
}
