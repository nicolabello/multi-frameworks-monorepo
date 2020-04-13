import React from 'react';
import { Link, useParams } from 'react-router-dom';
import MDCTopAppBar from '../material-components-web/MDCTopAppBar';
import './Feature.scss';

function Feature() {

  const { id } = useParams();
  const addingNew = id === 'new';

  return (
    <div className="Feature">

      <MDCTopAppBar className="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <Link to="/features">
              <button className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
                arrow_back
              </button>
            </Link>
            <h1 className="mdc-top-app-bar__title">{addingNew ? 'Add feature' : 'Edit feature'}</h1>
          </section>
        </div>
      </MDCTopAppBar>

      <div className="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main className="ft-main-content">
          {/*TODO: <Feature-form/>*/}
        </main>
      </div>

    </div>
  );
}

export default Feature;
