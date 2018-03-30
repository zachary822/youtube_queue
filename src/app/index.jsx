/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Entry from "./entry";
import History from "./history";
import {addURL, removeURL, moveURL, addHistory, clearHistory} from '../actions';
import _ from 'lodash';

import Player, {YOUTUBE_REGEX} from '../player';

function mapStateToProps(state) {
  return {
    urls: state.queue,
    history: state.history
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showError: false
    };
  }

  setURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  addURL(e) {
    e.preventDefault();
    if (YOUTUBE_REGEX.test(this.state.url)) {
      this.props.addURL(this.state.url);
      this.setState({url: ''});
    } else {
      this.setState({
        showError: true
      });
    }
  }

  setReady(e) {
    this.player = e.target;
    this.player.playVideo();
  }

  setDone(e) {
    let code = e.data;
    if (code === 0) {
      this.props.addHistory(this.props.urls[0]);
      this.props.removeURL(0);
    } else if (code < 0 || code > 3) {
      e.target.playVideo();
    }
  }

  removeAndAddHistory() {
    this.props.addHistory(this.props.urls[0]);
    this.props.removeURL(0);
  }

  render() {
    let {urls} = this.props;
    let clampPos = _.partial(_.clamp, _, 0, urls.length - 1);

    return <div>
      <div className="queue">
        <div className="url-input">
          <form onSubmit={this.addURL.bind(this)}>
            <label htmlFor="url">URL:</label>
            <input type="text" name="url" id="url" value={this.state.url} onChange={this.setURL.bind(this)} autoFocus/>
            <button type="submit"><i className="fas fa-plus"/>&nbsp;Add</button>
          </form>
        </div>
        {this.state.showError ?
          <div>Not a Valid YouTube URL</div> :
          null
        }
        {urls.length ?
          <div>
            <Player videoURL={urls[0]} onReady={this.setReady.bind(this)} onStateChange={this.setDone.bind(this)}/>
            <Entry url={urls[0]} position={0}
                   remove={this.removeAndAddHistory.bind(this)}
                   moveUp={this.props.moveURL.bind(undefined, 0, 0)}
                   moveDown={this.props.moveURL.bind(undefined, 0, clampPos(1))}/>
          </div> :
          null}
        <h1 className="queue-title">Queue</h1>
        {urls.slice(1).map((u, i) => {
          i += 1;
          return <Entry url={u} key={u + i} position={i}
                        remove={_.partial(this.props.removeURL, i)}
                        moveUp={_.partial(this.props.moveURL, i, clampPos(i - 1))}
                        moveDown={_.partial(this.props.moveURL, i, clampPos(i + 1))}/>;
        })}
      </div>
      <History clearHistory={this.props.clearHistory} history={this.props.history}/>
    </div>;
  }
}

App.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.arrayOf(PropTypes.string),
  addURL: PropTypes.func,
  removeURL: PropTypes.func,
  moveURL: PropTypes.func,
  addHistory: PropTypes.func,
  clearHistory: PropTypes.func
};

export default connect(mapStateToProps, {addURL, removeURL, moveURL, addHistory, clearHistory})(App);
