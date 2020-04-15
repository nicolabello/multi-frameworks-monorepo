import { Canceler } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Feature as FeatureInterface } from '../../../../express/src/models/feature';
import MDCTopAppBar from '../../modules/material-components-web/MDCTopAppBar';
import { FeatureService } from '../../services/feature.service';
import FeatureForm from '../feature-form/FeatureForm';
import './Feature.scss';

function Feature() {

  const { id } = useParams();
  const addingNew = id === 'new';
  const [data, setData] = useState<FeatureInterface>();
  const history = useHistory();
  const cancelRequestRef = useRef<Canceler>();

  useEffect(() => {
    cancelRequestRef.current && cancelRequestRef.current();
    if (addingNew) {
      setData(undefined);
    } else {
      const { cancelRequest, request } = FeatureService.get(id);
      cancelRequestRef.current = cancelRequest;
      (async () => setData(await request))();
    }
    return cancelRequestRef.current;
  }, [id, addingNew]);

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
          <FeatureForm data={data}/>
        </main>
      </div>

    </div>
  );

}

export default Feature;
