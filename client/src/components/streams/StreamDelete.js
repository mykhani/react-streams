import React from "react";
import history from "../..//history";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions = (
    <React.Fragment>
      <button
        onClick={() => this.onDeleteAccept()}
        className="ui button negative"
      >
        Delete
      </button>
      <Link to="/" className="ui button">
        Cancel
      </Link>
    </React.Fragment>
  );

  onDeleteAccept = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  renderContent() {
    if (this.props.stream) {
      return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
    } else {
      return "Are you sure you want to delete this stream?";
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }

    return (
      <Modal
        title="Delete{ Stream"
        content={this.renderContent()}
        actions={this.renderActions}
        onDismiss={this.onDeleteDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
