/**
 * https://stackoverflow.com/a/39519244/5557467
 */
import React from 'react';
import PropTypes from 'prop-types';
import {processVideoURL} from "../utils";

let loadYT;

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.youtubePlayerAnchor = React.createRef();
  }

  componentDidMount() {
    if (!loadYT) {
      loadYT = new Promise((resolve) => {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = () => resolve(window.YT);
      });
    }
    loadYT.then((YT) => {
      this.player = new YT.Player(this.youtubePlayerAnchor.current, {
        height: this.props.height,
        width: this.props.width,
        videoId: processVideoURL(this.props.videoURL),
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onPlayerError.bind(this)
        }
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.videoURL !== prevProps.videoURL) {
      this.player.loadVideoById(processVideoURL(this.props.videoURL));
    }
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  onPlayerStateChange(e) {
    if (typeof this.props.onStateChange === 'function') {
      this.props.onStateChange(e);
    }
  }

  onPlayerReady(e) {
    if (typeof this.props.onReady === 'function') {
      this.props.onReady(e);
    }
  }

  onPlayerError(e) {
    if (typeof this.props.onReady === 'function') {
      this.props.onError(e);
    }
  }

  render() {
    return (
      <section className='youtubeComponent-wrapper'>
        <div ref={this.youtubePlayerAnchor}/>
      </section>
    );
  }
}

Player.propTypes = {
  videoURL: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onStateChange: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func
};

Player.defaultProps = {
  width: 640,
  height: 390
};

export default Player;
