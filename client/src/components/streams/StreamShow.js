import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);

    this.buildPlayer();
    // flvPlayer.play();
  }

  buildPlayer() {
    const {id} = this.props.match.params;

    if (this.player || !this.props.stream) return;

    const videoUrl = `http://localhost:8000/live/${id}.flv`

    this.player = flv.createPlayer({
      type: "flv",
      url: videoUrl
    });

    console.log(`Playing stream: ${videoUrl}`)

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    console.log("Destroying flv video playyer");
    this.player.destroy();
  }

  render() {
    if (!this.props.stream) return <div>Loading...</div>;

    return (
      <div>
        <h3>Stream View</h3>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
