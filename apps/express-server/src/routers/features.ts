import express from 'express';
import { Feature } from '../models/feature';

const router = express.Router();

/*router.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});*/

router
  .route('/')
  .get((req, res) => {
    Feature.find((err, features) => {
      if (err) res.send(err);
      res.json(features);
    });
  })
  .post((req, res) => {
    const feature = new Feature();
    feature.name = req.body.name;

    feature.save((err) => {
      if (err) res.send(err);
      res.json({ message: 'Feature created!' });
    });
  });

router
  .route('/:id')
  .get((req, res) => {
    Feature.findById(req.params.id, (err, feature) => {
      if (err) res.send(err);
      res.json(feature);
    });
  })
  .put((req, res) => {
    Feature.findById(req.params.id, (err, feature) => {
      if (err) res.send(err);

      if (feature) {
        feature.name = req.body.name;

        feature.save((err) => {
          if (err) res.send(err);
          res.json({ message: 'Feature updated!' });
        });
      }
    });
  });

export const featuresRouter = router;
