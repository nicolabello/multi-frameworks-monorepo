import React from 'react';
import { Feature } from '../../../../express/src/models/feature';
import './FeatureForm.scss';

function FeatureForm(props: { data?: Feature }) {

  return (
    <pre>{JSON.stringify(props.data)}</pre>
  );

}

export default FeatureForm;
