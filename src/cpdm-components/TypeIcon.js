import React from 'react';
import Icon from './Icon';

export default ({ objectType }) => {
  if (objectType.match('CadDrawing')) {
    return <Icon name="type/drawing.svg" />;
  }
  if (objectType.match('Document')) {
    return <Icon name="type/document.png" />;
  }
  if (objectType.match('Part')) {
    return <Icon name="type/part.svg" />;
  }
  if (objectType.match('Baseline')) {
    return <Icon name="type/baseline.svg" />;
  }
  if (objectType.match('Change')) {
    return <Icon name="type/change.png" />;
  }
  if (objectType.match('CheckDataPkg')) {
    return <Icon name="type/packet.svg" />;
  }
  if (objectType.match('TechnicalNotice')) {
    return <Icon name="type/technical.png" />;
  }
  if (objectType.match('DataSendOrder')) {
    return <Icon name="type/send.png" />;
  }
  if (objectType.match('Requirement')) {
    return <Icon name="type/requirement.svg" />;
  }
  return null;
};
