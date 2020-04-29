import { validateFeature } from '@feature-toggles/helpers';
import express from 'express';
import { FeatureModel } from '../models/feature-model';

const router = express.Router();

/*router.use((req, res, next) => {
  console.log(`${req.method} req to ${req.url}`);
  next();
});*/

router
  .route('/')
  .get((req, res) => {
    FeatureModel.find(req.query, (error, features) => {
      if (error) return res.status(500).json({ message: error.message });

      res.json(features);
    });
  })
  .post((req, res) => {

    const errors = validateFeature({
      key: req.body.key,
      description: req.body.description,
      type: req.body.type,
      value: req.body.value,
    });

    if (errors) {
      return res.status(400).json({ errors });
    }

    const feature = new FeatureModel();

    feature.key = req.body.key;
    feature.description = req.body.description;
    feature.type = req.body.type;
    feature.value = req.body.value;

    feature.save((error, feature) => {
      if (error) return res.status(500).json({ message: error.message });

      res.json(feature);
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    FeatureModel.findById(req.params.id, (error, feature) => {
      if (error) return res.status(500).json({ message: error.message });
      if (!feature) return res.status(404).json({ message: 'Not found' });

      res.json(feature);
    });
  })
  .put((req, res) => {
    FeatureModel.findById(req.params.id, (error, feature) => {
      if (error) return res.status(500).json({ message: error.message });
      if (!feature) return res.status(404).json({ message: 'Not found' });

      const errors = validateFeature({
        key: req.body.key,
        description: req.body.description,
        type: req.body.type,
        value: req.body.value,
      });

      if (errors) {
        return res.status(400).json({ errors });
      }

      feature.key = req.body.key;
      feature.description = req.body.description;
      feature.type = req.body.type;
      feature.value = req.body.value;

      feature.save((error, feature) => {
        if (error) return res.status(500).json({ message: error.message });

        res.json(feature);
      });
    });
  });

export const featuresRouter = router;
