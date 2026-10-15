import { type Feature as FeatureModel, FeatureService } from '@feature-toggles/helpers';
import { useLoaderData, useNavigate } from 'react-router';
import FeatureForm from './FeatureForm.tsx';
import { ArrowBackIcon } from './Icons.tsx';

function Feature() {
  // Whatever the route's loader returned (see routes.tsx): https://reactrouter.com/api/hooks/useLoaderData
  const feature = useLoaderData<FeatureModel | null>();
  const navigate = useNavigate();
  const showList = () => navigate('/features');

  const save = async (data: FeatureModel) => {
    await (feature ? FeatureService.update(data) : FeatureService.add(data));
    await showList();
  };

  return (
    <>
      <header className="ft-app-bar">
        <button type="button" className="ft-icon-button" aria-label="Back" onClick={showList}>
          <ArrowBackIcon />
        </button>
        <h1 className="ft-app-bar-title">{feature ? 'Edit feature' : 'Add feature'}</h1>
      </header>

      <main className="ft-main">
        {/* A different `key` makes React mount a fresh form (with fresh state) for another feature:
            https://react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key */}
        <FeatureForm key={feature?._id ?? 'new'} feature={feature} onCancel={showList} onSubmit={save} />
      </main>
    </>
  );
}

export default Feature;
