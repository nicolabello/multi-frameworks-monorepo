import mongoose from 'mongoose';
import { createApp } from './app.js';

// Values come from apps/express/.env, loaded by Node's `--env-file-if-exists` flag (see the package.json
// scripts), so no dotenv package is needed: https://nodejs.org/api/cli.html#--env-file-if-existspath
const dbUri = process.env.DB_URI ?? 'mongodb://localhost:27017/feature-toggles';
const port = Number(process.env.PORT ?? 8080);

// Top-level await works because this is an ES module ("type": "module" in package.json)
await mongoose.connect(dbUri);

createApp().listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`GraphiQL available on http://localhost:${port}/graphql/features`);
});
