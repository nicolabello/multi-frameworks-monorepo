import { type Feature, validateFeature } from '@feature-toggles/helpers';
import { Router, type Request } from 'express';
import { isValidObjectId } from 'mongoose';
import { FeatureModel } from '../models/feature-model.js';

const pickFeature = (body: Request['body']): Omit<Feature, '_id'> => ({
  key: body?.key,
  description: body?.description ?? '',
  type: body?.type,
  value: body?.value,
});

// Express 5 forwards rejected promises from async handlers to the error middleware.
export const featuresRouter = Router()
  .get('/', async (req, res) => {
    const features = await FeatureModel.find(req.query).setOptions({ sanitizeFilter: true });
    res.json(features);
  })
  .post('/', async (req, res) => {
    const data = pickFeature(req.body);
    const errors = validateFeature(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    const feature = await FeatureModel.create(data);
    res.status(201).json(feature);
  })
  .get('/:id', async (req, res) => {
    const feature = isValidObjectId(req.params.id) ? await FeatureModel.findById(req.params.id) : null;
    if (!feature) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    res.json(feature);
  })
  .put('/:id', async (req, res) => {
    const feature = isValidObjectId(req.params.id) ? await FeatureModel.findById(req.params.id) : null;
    if (!feature) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    const data = pickFeature(req.body);
    const errors = validateFeature(data);
    if (errors) {
      res.status(400).json({ errors });
      return;
    }

    feature.set(data);
    res.json(await feature.save());
  });
