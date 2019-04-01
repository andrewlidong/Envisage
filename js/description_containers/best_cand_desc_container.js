import AlgoDescContainer from './algo_desc_container';
import BestCandidateSample from '../distribution_generators/best_candidate_disc_generator';

export default class BestCandDescContainer extends AlgoDescContainer {

    constructor() {
        const title = "Mitchell's Best Candidate Sampling";
        const description = "Mitchell's best candidate draws a specific number of candidates at random"
        + "and selects the one with the largest distance from the existing samples.";
        const demoSample = new BestCandidateSample(400, 600, 100, 10);
        super(title, description, demoSample);
    }
}
