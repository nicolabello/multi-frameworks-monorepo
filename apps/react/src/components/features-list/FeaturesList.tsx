import React from 'react';
import { Feature } from '../../../../express/src/models/feature';
import FeatureListItem from '../feature-list-item/FeatureListItem';
import './FeaturesList.scss';

function FeaturesList(props: { data: Feature[] }) {

  return (
    <ul className="FeaturesList ft-cards-list">
      {props.data.map(item => <li key={item._id}><FeatureListItem data={item}/></li>)}
    </ul>
  );

}

export default FeaturesList;
