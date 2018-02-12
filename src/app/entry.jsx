/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';

class Entry extends React.Component {
  render() {
    return <div>
      <div className="entry-left">
        {this.props.position + 1}. <a href={this.props.url}>{this.props.url}</a>
      </div>
      <div className="entry-right">
        <button onClick={this.props.remove}><i className="fas fa-minus"/></button>
        <button onClick={this.props.moveUp}><i className="fas fa-caret-up"/></button>
        <button onClick={this.props.moveDown}><i className="fas fa-caret-down"/></button><br/>
      </div>
    </div>;
  }
}

Entry.propTypes = {
  remove: PropTypes.func,
  moveUp: PropTypes.func,
  moveDown: PropTypes.func,
  url: PropTypes.string,
  position: PropTypes.number
};

export default Entry;
