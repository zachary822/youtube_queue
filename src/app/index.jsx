/**
 * @author zacharyjuang
 * 1/18/18
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Entry from "./entry";
import History from "./history";
import {
  addURL,
  addURLPosition,
  removeURL,
  moveURL,
  addHistory,
  clearHistory,
  removeHistory,
  toggleReplay
} from '../actions';
import _ from 'lodash';

import Player from '../player';

function mapStateToProps(state) {
  return {
    urls: state.queue,
    history: state.history,
    replay: state.replay
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      showError: false
    };
    this.replayButton = React.createRef();
  }

  setURL(e) {
    this.setState({
      url: e.target.value
    });
  }

  addURL(e) {
    e.preventDefault();
    try {
      let u = new URL(this.state.url);
      if (/youtube\.com$/.test(u.hostname)) {
        this.props.addURL(u.toString());
        this.setState({url: '', showError: false});
      } else {
        this.setState({
          showError: true,
          url: ''
        });
      }
    } catch (e) {
      this.setState({
        showError: true,
        url: ''
      });
    }

  }

  setReady(e) {
    this.player = e.target;
  }

  setDone(e) {
    let {replay} = this.props;
    let code = e.data;
    if (code === 0) {
      if (replay) {
        e.target.seekTo(0);
        e.target.playVideo();
      } else {
        this.removeAndAddHistory(0);
      }
    }
  }

  removeAndAddHistory(i, add = true) {
    if (add) {
      this.props.addHistory(this.props.urls[i]);
    }
    this.props.removeURL(i);
  }

  nextVideo(add = true) {
    if (this.props.urls.length > 1) {
      this.removeAndAddHistory(0, add);
    }
  }

  prevVideo() {
    let {history, addURLPosition, removeHistory} = this.props;
    addURLPosition(history[history.length - 1].url, 0);
    removeHistory(history.length - 1);
  }

  handleVideoError(e) {
    this.nextVideo(false);
  }

  getReplayColor() {
    return this.props.replay ? 'black' : 'lightgrey';
  }

  componentDidUpdate(prevProps) {
    if (prevProps.replay !== this.props.replay) {
      this.replayButton.current.querySelector('[data-fa-i2svg]').style.color = this.getReplayColor();
    }
  }

  render() {
    let {urls} = this.props;
    let clampPos = _.partial(_.clamp, _, 0, urls.length - 1);

    return <div>
      <section>
        <div className="queue">
          <div className="url-input">
            <form onSubmit={this.addURL.bind(this)}>
              <label htmlFor="url">URL:</label>
              <input type="url" name="url" id="url" value={this.state.url} onChange={this.setURL.bind(this)}
                     autoFocus required/>
              <button type="submit"><i className="fas fa-plus"/>&nbsp;Add</button>
            </form>
          </div>
          {this.state.showError ?
            <div>Not a Valid YouTube URL</div> :
            null
          }
          {urls.length ?
            <div>
              <Player videoURL={urls[0]} onReady={this.setReady.bind(this)} onStateChange={this.setDone.bind(this)}
                      onError={this.handleVideoError.bind(this)}/>
              <button onClick={this.prevVideo.bind(this)}><i className="fa fa-step-backward"/>&nbsp;previous</button>
              <button onClick={this.nextVideo.bind(this)}><i className="fas fa-step-forward"/>&nbsp;next</button>
              <div style={{display: 'inline', color: this.getReplayColor()}}>
                <button onClick={this.props.toggleReplay} ref={this.replayButton}>
                  <i className="fas fa-redo" style={{color: this.getReplayColor()}}/>&nbsp;replay
                </button>
              </div>

            </div> :
            null}
          {_(urls).map((u, i) => {
            let url = new URL(u);
            url.hash = '';

            return <Entry url={url.toString()} key={u} position={i}
                          remove={this.removeAndAddHistory.bind(this, i, i === 0)}
                          moveUp={_.partial(this.props.moveURL, i, clampPos(i - 1))}
                          moveDown={_.partial(this.props.moveURL, i, clampPos(i + 1))}/>;
          }).value()}
        </div>
      </section>
      <aside>
        <History clearHistory={this.props.clearHistory} history={this.props.history} addURL={this.props.addURL}/>
      </aside>
    </div>;
  }
}

App.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.arrayOf(PropTypes.shape({time: PropTypes.number, url: PropTypes.string})),
  addURL: PropTypes.func,
  addURLPosition: PropTypes.func,
  removeURL: PropTypes.func,
  moveURL: PropTypes.func,
  addHistory: PropTypes.func,
  clearHistory: PropTypes.func,
  removeHistory: PropTypes.func,
  toggleReplay: PropTypes.func,
  replay: PropTypes.bool
};

export default connect(mapStateToProps, {
  addURL,
  addURLPosition,
  removeURL,
  moveURL,
  addHistory,
  clearHistory,
  removeHistory,
  toggleReplay
})(App);
