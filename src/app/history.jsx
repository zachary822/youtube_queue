/**
 * @author zacharyjuang
 * 2/22/18
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
    let {url} = this.props;
    return <div><a href={url}>{url}</a>
      <button ref={(c) => {
        this.copy = c;
      }}><i className="fas fa-clipboard"/></button>
    </div>;
  }
}

Entry.propTypes = {
  url: PropTypes.string
};

class History extends React.Component {
  render() {
    return <div className="history">
      <h1>History</h1>
      <button onClick={this.props.clearHistory}><i className="fas fa-trash"/>&nbsp;Clear</button>
      <ol>
        {this.props.history.map((u, i) => <li key={i}><Entry url={u}/></li>)}
      </ol>
    </div>;
  }
}

History.propTypes = {
  clearHistory: PropTypes.func,
  history: PropTypes.arrayOf(PropTypes.string)
};

export default History;
