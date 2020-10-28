import { Feature } from '../../models';
import { PromiseWithCanceller } from '../http';
export declare class FeaturesService {
    private static http;
    static getAll(): PromiseWithCanceller<Feature[]>;
}
