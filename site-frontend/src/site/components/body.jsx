import { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';

class Body extends Component {
  render() {
    return Children.only(this.props.children);
  }
}

Body.propTypes = {
  className: PropTypes.string.isRequired,
};


function reducePropsToState(propsList) {
  let className = '';

  propsList.forEach((props) => {
    className = !!props.className && props.className;
  });

  if (className) {
    return className;
  }
}

function handleStateChangeOnClient(className) {
  const bodyClassName = document.body.className = className || '';
  return bodyClassName;
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
)(Body);
