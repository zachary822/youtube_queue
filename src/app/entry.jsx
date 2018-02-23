/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

class Entry extends React.Component {
  componentDidMount() {
    this.clipboard = new Clipboard(this.copy, {
      text: () => {
        return this.props.url;
      }
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return <div className="entry">
      <div className="entry-left">
        {this.props.position + 1}. <a href={this.props.url}>{this.props.url}</a>
      </div>
      <div className="entry-right">
        <button onClick={this.props.remove} className="button"><i className="fas fa-minus" aria-label="remove"/></button>
        <button onClick={this.props.moveUp} className="button"><i className="fas fa-caret-up" aria-label="up"/></button>
        <button onClick={this.props.moveDown} className="button"><i className="fas fa-caret-down" aria-label="down"/></button>
        <button ref={(c) => {
          this.copy = c;
        }}><i className="fas fa-clipboard" aria-label="copy"/></button>
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
