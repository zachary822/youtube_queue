/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.copy = React.createRef();
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.copy.current, {
      text: () => {
        return this.props.url;
      }
    });
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    let {position, url} = this.props;

    return <div className="entry">
      <div className="entry-left">
        {position + 1}. <a href={url} target="_blank" rel="external noopener noreferrer">{url}</a>
      </div>
      <div className="entry-right">
        <button onClick={this.props.remove} className="button"><FontAwesomeIcon icon="minus"/>
        </button>
        <button onClick={this.props.moveUp} className="button" style={{color: position ? 'black' : 'lightgrey'}}>
          <FontAwesomeIcon icon="caret-up"/></button>
        <button onClick={this.props.moveDown} className="button"><FontAwesomeIcon icon="caret-down"/>
        </button>
        <button ref={this.copy}><FontAwesomeIcon icon="clipboard"/></button>
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
