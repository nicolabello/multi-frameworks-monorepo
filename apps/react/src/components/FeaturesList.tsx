import type { Feature } from '@feature-toggles/helpers';
import FeatureListItem from './FeatureListItem.tsx';

function FeaturesList({ features }: { features: Feature[] }) {
  if (!features.length) {
    return <p className="ft-empty">No features yet.</p>;
  }

  return (
    <ul className="ft-cards-list">
      {features.map((feature) => (
        // `key` lets React match list items between renders: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
        <li key={feature._id}>
          <FeatureListItem feature={feature} />
        </li>
      ))}
    </ul>
  );
}

export default FeaturesList;
