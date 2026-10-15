import { type Feature, validateFeature } from '@feature-toggles/helpers';
import { Router, type Request } from 'express';
import { isValidObjectId } from 'mongoose';
import { FeatureModel } from '../models/feature-model.js';

/** Copy only the known fields from the request body, so clients can't set anything else (e.g. `_id`). */
const pickFeature = (body: Request['body']): Omit<Feature, '_id'> => ({
  key: body?.key,
  description: body?.description ?? '',
  type: body?.type,
  value: body?.value,
});

// A Router is a mini-app with its own routes, mounted on `/features` in app.ts.
// https://expressjs.com/en/guide/routing.html#express-router
//
// Express 5 forwards errors thrown by (or promises rejected in) async handlers to the error
// middleware, so no try/catch is needed here: https://expressjs.com/en/guide/migrating-5.html#rejected-promises
export const featuresRouter = Router()
  .get('/', async (req, res) => {
    // Query-string params become a Mongo filter, e.g. GET /features?type=number.
    // `sanitizeFilter` neutralises operators such as `$ne` that would allow query injection.
    // https://mongoosejs.com/docs/api/mongoose.html#Mongoose.prototype.sanitizeFilter()
    const features = await FeatureModel.find(req.query).setOptions({ sanitizeFilter: true });
    res.json(features);
  })
  .post('/', async (req, res) => {
    // Validate up front to answer with the same `{ errors }` shape the front-ends use
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
    // A malformed id would make Mongoose throw a CastError (→ 500): treat it as "not found" instead
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

    // Update the loaded document and save it, which runs the schema validators and middleware
    feature.set(data);
    res.json(await feature.save());
  });
