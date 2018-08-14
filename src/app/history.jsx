/**
 * @author zacharyjuang
 * 2/22/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    let {url, time, addURL} = this.props;
    return <div>{new Date(time).toLocaleString()} <a href={url}>{url}</a>
      <button ref={(c) => {
        this.copy = c;
      }}><FontAwesomeIcon icon="clipboard"/></button>
      <button onClick={addURL.bind(undefined, url)}><FontAwesomeIcon icon="plus"/></button>
    </div>;
  }
}

Entry.propTypes = {
  url: PropTypes.string,
  time: PropTypes.number,
  addURL: PropTypes.func
};

class History extends React.Component {
  render() {
    return <div className="history">
      <h2>History</h2>
      <button onClick={this.props.clearHistory}><FontAwesomeIcon icon="trash"/>&nbsp;Clear</button>
      <ol>
        {this.props.history.map(({time, url}, i) => <li key={i}><Entry url={url} time={time}
                                                                       addURL={this.props.addURL}/></li>)}
      </ol>
    </div>;
  }
}

History.propTypes = {
  clearHistory: PropTypes.func,
  addURL: PropTypes.func,
  history: PropTypes.arrayOf(PropTypes.shape({time: PropTypes.number, url: PropTypes.string}))
};

export default History;
