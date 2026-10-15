import mongoose from 'mongoose';
import { createApp } from './app.js';

const dbUri = process.env.DB_URI ?? 'mongodb://localhost:27017/feature-toggles';
const port = Number(process.env.PORT ?? 8080);

await mongoose.connect(dbUri);

createApp().listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`GraphiQL available on http://localhost:${port}/graphql/features`);
});
