import type { Feature } from '@feature-toggles/helpers';
import { Link } from 'react-router';

function FeatureListItem({ feature }: { feature: Feature }) {
  return (
    <Link to={`/features/${feature._id}`} className="ft-card">
      <h2 className="ft-card-title">{feature.key}</h2>
      {feature.description && <p className="ft-card-description">{feature.description}</p>}
      <pre className="ft-card-value">{JSON.stringify(feature.value)}</pre>
    </Link>
  );
}

export default FeatureListItem;
