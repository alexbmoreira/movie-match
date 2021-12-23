import React from 'react';

const CardListItem = ({ model, component }) => {
  if(!component) return null;

  const Component = component;
  return <Component model={model}/>;
};

export default CardListItem;
