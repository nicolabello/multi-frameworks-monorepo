import React from 'react';
import { useHistory } from 'react-router-dom';
import { Feature } from '../../../../express/src/models/feature';
import MDCCard from '../../modules/material-components-web/components/MDCCard';
import './FeatureListItem.scss';

function FeatureListItem(props: { data: Feature }) {

  const history = useHistory();
  const navigate = (path: string, event: React.UIEvent) => {
    event.preventDefault();
    history.push(path);
  };

  return (
    <MDCCard className="FeatureListItem mdc-card mdc-card--outlined">
      <a href={`/feature/${props.data._id}`} onClick={event => navigate(`/feature/${props.data._id}`, event)}
         className="mdc-card__primary-action ft-card-content">
        <h2 className="mdc-typography--headline6">{props.data.key}</h2>
        {props.data.description && <p className="mdc-typography--subtitle2">{props.data.description}</p>}
        <div role="presentation" className="feature-value">
          <pre>{JSON.stringify(props.data.value)}</pre>
        </div>
      </a>
    </MDCCard>
  );

}

export default FeatureListItem;
