import React from "react";
import Modal from "react-modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sendMail } from "../store/actions/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#6c747d"
  }
};

class UploadBuildingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      content: "",
      subject: ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.openModal();
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.hide(false);
  }

  handleSubmit = e => {
    e.preventDefault();
    let to = this.props.email;
    let from = localStorage.getItem("email");
    let subject = this.state.subject;
    let content = this.state.content;
    const val = {
      data: {
        to,
        from,
        subject,
        content
      }
    };
    let token = localStorage.getItem("token");
    this.props.sendMail(val, token, () => {
      toast.success(`Mail sent successfully`);
      setTimeout(() => {
        this.closeModal();
      }, 1000);
    });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  componentWillUnmount() {
    this.props.hide(false);
    this.setState({
      content: "",
      subject: ""
    });
  }

  render() {
    return (
      <div>
        <div>
          <ToastContainer />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form onSubmit={this.handleSubmit}>
              <div className="d-flex flex-row">
                <label for="message " className="mr-5">
                  To:
                </label>
                <input
                  type="text"
                  className="form-control mb-1"
                  id="name"
                  name="email"
                  value={this.props.email}
                  disabled={true}
                />
              </div>
              <div className="d-flex flex-row">
                <label for="message" className="mr-2">
                  Subject:
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  id="name"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.handleChange}
                />
              </div>
              <label for="message">Message:</label>
              <div className="d-flex flex-row">
                <textarea
                  class="form-control"
                  type="textarea"
                  name="content"
                  id="message"
                  maxlength="6000"
                  rows="7"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <div class="row">
                <div class="col-sm-12 form-group">
                  <button type="submit" class="btn btn-lg btn-dark pull-right">
                    Send →
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    mailResp: state.sendMail
  };
};

export default withRouter(
  connect(mapStateToProps, { sendMail })(UploadBuildingModal)
);
