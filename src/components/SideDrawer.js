import React from "react";
import { Link } from "react-router-dom";

class sideDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false,
      drawerClasses: "side-drawer"
    };
  }

  componentDidMount() {
    let type = localStorage.getItem("type");
    if (type === "admin") {
      this.setState({
        admin: true
      });
    }
  }

  isActive = (path, match, location) => !!(match || path === location.pathname);

  render() {
    return (
      <div>
        <nav
          className={this.props.show ? "nav-drawer bg-dark open" : "nav-drawer"}
        >
          <div className="navbar-brand mt-5">
            <ul>
              {
                <li className={`nav-item`}>
                  <Link to="/details" className="nav-link text-white">
                    My Profile
                  </Link>
                  {this.state.admin ? (
                    <Link to="/user-list" className="nav-link text-white">
                      User List
                    </Link>
                  ) : null}
                </li>
              }
              <div className="clearfix" />
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default sideDrawer;
