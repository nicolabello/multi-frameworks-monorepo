import React from 'react';
import { Link } from 'react-router-dom';
import './Features.scss';

function Features() {
  return (
    <div className="Features">

      <header className="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <h1 className="mdc-top-app-bar__title">Feature toggles</h1>
          </section>
        </div>
      </header>

      <div className="mdc-top-app-bar--fixed-adjust" role="presentation">

        <main className="ft-main-content">
          {/*TODO: <Features-list/>*/}
        </main>

        <Link to="/feature/new">
          <button aria-label="Add feature" className="mdc-fab ft-fab-absolute"
                  type="button">
            <span className="mdc-fab__ripple"/>
            <span className="mdc-fab__icon material-icons">add</span>
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Features;
