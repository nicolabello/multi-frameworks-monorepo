import React from 'react';
import { useParams } from 'react-router-dom';
import './Feature.scss';

function Feature() {

  let { id } = useParams();

  return (
    <div className="Feature">
      Feature component {id}
    </div>
  );
}

export default Feature;
