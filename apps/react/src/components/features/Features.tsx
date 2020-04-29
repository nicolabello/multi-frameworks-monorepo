import { Feature, FeaturesService } from '@feature-toggles/helpers';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MDCFab from '../../modules/material-components-web/components/MDCFab';
import MDCTopAppBar from '../../modules/material-components-web/components/MDCTopAppBar';
import FeaturesList from '../features-list/FeaturesList';
import './Features.scss';

function Features() {

  const [data, setData] = useState<Feature[]>([]);
  const history = useHistory();

  useEffect(() => {
    const { request, cancelRequest } = FeaturesService.getAll();
    (async () => setData(await request))();
    return cancelRequest;
  }, []);

  return (
    <div className="Features">

      <MDCTopAppBar className="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <h1 className="mdc-top-app-bar__title">Feature toggles</h1>
          </section>
        </div>
      </MDCTopAppBar>

      <div className="mdc-top-app-bar--fixed-adjust" role="presentation">

        <main className="ft-main-content">
          <FeaturesList data={data}/>
        </main>

        <MDCFab onClick={() => history.push('/feature/new')} aria-label="Add feature"
                className="mdc-fab ft-fab-absolute" type="button">
          <span className="mdc-fab__ripple"/>
          <span className="mdc-fab__icon material-icons">add</span>
        </MDCFab>

      </div>

    </div>
  );

}

export default Features;
