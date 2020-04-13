import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Feature } from '../../../../express/src/models/feature';
import { FeaturesService } from '../../services/features.service';
import MDCFab from '../material-components-web/MDCFab';
import MDCTopAppBar from '../material-components-web/MDCTopAppBar';
import './Features.scss';

function Features() {

  const [data, setData] = useState<Feature[]>([]);

  useEffect(() => {
    (async () => setData(await FeaturesService.getAll()))();
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
          {/*TODO: <Features-list/>*/}
          {JSON.stringify(data)}
        </main>

        <Link to="/feature/new">
          <MDCFab aria-label="Add feature" className="mdc-fab ft-fab-absolute" type="button">
            <span className="mdc-fab__ripple"/>
            <span className="mdc-fab__icon material-icons">add</span>
          </MDCFab>
        </Link>

      </div>

    </div>
  );
}

export default Features;
