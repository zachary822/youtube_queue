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

import Player from '../player';

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
    let u = new URL(this.state.url);
    e.preventDefault();
    if (/youtube\.com$/.test(u.hostname)) {
      this.props.addURL(this.state.url);
      this.setState({url: '', showError: false});
    } else {
      this.setState({
        showError: true
      });
    }
  }

  setReady(e) {
    this.player = e.target;
  }

  setDone(e) {
    let code = e.data;
    if (code === 0) {
      this.props.addHistory(this.props.urls[0]);
      this.props.removeURL(0);
    }
  }

  removeAndAddHistory(i) {
    if (i === 0) {
      this.props.addHistory(this.props.urls[i]);
    }
    this.props.removeURL(i);
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
              <input type="text" name="url" id="url" value={this.state.url} onChange={this.setURL.bind(this)}
                     autoFocus/>
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
            </div> :
            null}
          {_(urls).map((u, i) => {
            return <Entry url={u} key={u + i} position={i}
                          remove={this.removeAndAddHistory.bind(this, i)}
                          moveUp={_.partial(this.props.moveURL, i, clampPos(i - 1))}
                          moveDown={_.partial(this.props.moveURL, i, clampPos(i + 1))}/>;
          }).value()}
        </div>
      </section>
      <aside>
        <History clearHistory={this.props.clearHistory} history={this.props.history}/>
      </aside>
    </div>;
  }
}

App.propTypes = {
  urls: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.arrayOf(PropTypes.shape({time: PropTypes.number, url: PropTypes.string})),
  addURL: PropTypes.func,
  removeURL: PropTypes.func,
  moveURL: PropTypes.func,
  addHistory: PropTypes.func,
  clearHistory: PropTypes.func
};

export default connect(mapStateToProps, {addURL, removeURL, moveURL, addHistory, clearHistory})(App);
