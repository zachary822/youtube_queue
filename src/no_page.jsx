/**
 * @author zacharyjuang
 * 6/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';

class NoPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/');
    }, 3000)
  }

  render() {
    return <div>Nothing to see here. Redirects in 3 seconds...</div>;
  }
}

NoPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default NoPage;
