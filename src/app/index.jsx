/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Entry from "./entry";
import {addURL, removeURL, moveURL, addHistory, clearHistory} from '../actions';

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
      showError: false,
      ready: false,
      data: {},
      videoURL: ''
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

  componentDidUpdate() {
    let code;
    if (this.player) {
      code = this.player.getPlayerState();
    }
    if (this.state.ready && this.player && typeof code === 'number' && (code !== 1 && code !== 3)) {
      this.player.playVideo();
    }
  }

  setReady(e, player) {
    let data = player.getVideoData();
    this.player = player;
    this.setState({ready: true, data, videoURL: player.getVideoUrl()});
  }

  setDone(e) {
    let code = e.data;
    if (code === 0) {
      this.props.addHistory(this.state.videoURL);
      this.props.removeURL(0);
    }
  }

  removeAndAddHistory() {
    this.props.addHistory(this.props.urls[0]);
    this.props.removeURL(0);
  }

  render() {
    let {urls} = this.props;
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
                   moveDown={this.props.moveURL.bind(undefined, 0, Math.min(Math.max(urls.length - 1, 0), 1))}/>
          </div> :
          null}
        <h3 className="queue-title">Queue</h3>
        {urls.slice(1).map((u, i) => {
          i += 1;
          return <Entry url={u} key={u + i} position={i}
                        remove={this.props.removeURL.bind(undefined, i)}
                        moveUp={this.props.moveURL.bind(undefined, i, Math.max(0, i - 1))}
                        moveDown={this.props.moveURL.bind(undefined, i, Math.min(Math.max(urls.length - 1, 0), i + 1))}/>;
        })}
      </div>
      <div className="history">
        <h3>History</h3>
        <button onClick={this.props.clearHistory}><i className="fas fa-trash"/>&nbsp;Clear</button>
        <ol>
          {this.props.history.map((u, i) => <li key={i}><a href={u}>{u}</a></li>)}
        </ol>
      </div>
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
