export default props => {
  const { value } = props;
  return typeof value === 'string' || typeof value === 'number' ? value : '--';
};
