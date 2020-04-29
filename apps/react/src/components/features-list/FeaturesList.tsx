import { Feature } from '@feature-toggles/helpers';
import React from 'react';
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
