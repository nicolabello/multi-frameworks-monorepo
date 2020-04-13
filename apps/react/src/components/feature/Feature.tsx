import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MDCTopAppBar from '../material-components-web/MDCTopAppBar';
import './Feature.scss';

function Feature() {

  const { id } = useParams();
  const addingNew = id === 'new';
  const history = useHistory();

  return (
    <div className="Feature">

      <MDCTopAppBar className="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button onClick={() => history.push('/features')}
                    className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">
              arrow_back
            </button>
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
