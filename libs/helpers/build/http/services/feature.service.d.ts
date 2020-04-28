import { Feature } from '../../index';
import { PromiseWithCanceller } from '../http';
export declare class FeatureService {
    private static http;
    static get(id: any): PromiseWithCanceller<Feature>;
    static add(data: Feature): PromiseWithCanceller<void>;
    static update(data: Feature): PromiseWithCanceller<void>;
}
