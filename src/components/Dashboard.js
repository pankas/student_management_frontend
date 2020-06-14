import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import UserList from "./UserList";
import Details from "./Details";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

const routes = [
  {
    path: "/details",
    component: Details
  },
  {
    path: "/user-list",
    component: UserList
  }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: null,
      sideDrawerOpen: false
    };
  }

  logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    this.props.history.push("/");
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  isActive = (path, match, location) => !!(match || path === location.pathname);

  render() {
    const routeComponents = routes.map(({ path, component, i }) => (
      <Route path={path} component={component} key={i} />
    ));
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <div>
        <BrowserRouter>
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <div>
            <div>
              <nav
                className="custom-navbar default-layout-navbar navbar-dark bg-dark fixed-top navigation"
                style={{ padding: "0px", height: "10%" }}
              >
                <div className="p-2 flex-shrink-1 bd-highlight">
                  <button
                    className="mt-2 navbar-toggler hidden-sm-up float-xs-left"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={this.drawerToggleClickHandler}
                  >
                    {" "}
                    <span class="navbar-toggler-icon"></span>{" "}
                  </button>{" "}
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                  <ul className="navbar-nav navbar-nav-right">
                    <li className="nav-item" onClick={this.logout}>
                      <button type="button" class="btn btn-dark">
                        Logout{" "}
                        <span class="badge badge-secondary">
                          <i className="fa fa-power-off" />
                        </span>
                      </button>
                    </li>
                  </ul>
                  <button
                    className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                    type="button"
                    data-toggle="offcanvas"
                  >
                    <span className="mdi mdi-menu" />
                  </button>
                </div>
              </nav>
              <div
                className="content-container page-body-wrapper"
                style={{ paddingLeft: "0px !important" }}
              >
                <div className="main-panel">
                  <div className="main-div">{routeComponents}</div>
                </div>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Dashboard;
