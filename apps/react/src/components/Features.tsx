import type { Feature } from '@feature-toggles/helpers';
import { Link, useLoaderData } from 'react-router';
import FeaturesList from './FeaturesList.tsx';
import { AddIcon } from './Icons.tsx';

function Features() {
  const features = useLoaderData<Feature[]>();

  return (
    <>
      <header className="ft-app-bar">
        <h1 className="ft-app-bar-title">Feature toggles</h1>
      </header>

      <main className="ft-main">
        <FeaturesList features={features} />
      </main>

      <Link to="/features/new" className="ft-fab" aria-label="Add feature">
        <AddIcon />
      </Link>
    </>
  );
}

export default Features;
