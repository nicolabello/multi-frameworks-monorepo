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
    const feature = new FeatureModel();
    feature.name = req.body.name;

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

      feature.name = req.body.name;

      feature.save((error, feature) => {
        if (error) return res.status(500).json({ message: error.message });

        res.json(feature);
      });
    });
  });

export const featuresRouter = router;
