import { Feature } from '../../models/feature';
import { PromiseWithCanceller } from '../http';
export declare class FeaturesService {
    private static http;
    static getAll(): PromiseWithCanceller<Feature[]>;
}
