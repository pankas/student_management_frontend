import React from 'react';
import { connect } from 'react-redux';
import EmailModal from './EmailModal';
import {getUsers}  from '../store/actions/index'
import Loader from 'react-loader-spinner'

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayModal: false,
            username:null,
            name:'',
            email:'',
            list:[],
            showLoader:true
        }
        // this.delete = this.delete.bind(this)
    }
    hideModal =(bool)=>{
        this.setState({
            displayModal: false
        })
    }
    sendEmail = (e,n1,n2) => {
        this.setState({
            displayModal: true,
            email:e,
            name: `${n1} ${n2}`
        })
    }

        find = (key,array)=>{
            for(let i=0;i<array.length;i++){
                if(array[i].email === key){
                    return i;
                }
            }
            return -1;
        }

    componentWillMount() {
        let token  = localStorage.getItem('token')
        this.props.getUsers(token,()=>{
            let list = this.props.list
            let ind = this.find(this.props.user.email,this.props.list);
            list.splice(ind,1);
            this.setState({
                showLoader:false,
                list: list
            })
        })
    }


    render() {

        return (

            <div className="content-wrapper">
                <section class="hero is-primary">
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title">
                                <strong>Welcome {this.state.username}</strong>
                            </h1>
                            <div>
                                <p id="temporary"></p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container-fluid" style={{ padding: "5%" }} >
                    {this.state.displayModal ? <EmailModal hide={this.hideModal} name={this.state.name} email={this.state.email} /> : null}
                    <br />
                   {this.state.showLoader?
                   <div className="d-flex justify-content-center">
                     <Loader
                       type="Audio"
                       color="#00BFFF"
                       height={100}
                       width={100}
                    //    timeout={3000} //3 secs
                    />
                    </div>
                  :<div className="row table-responsive">
      <table className="table table-hover" style={{ marginLeft: "2%" }}>
          <thead style={{ fontSize: "0.77rem" }}>
              <tr>
                  <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> Name </th>
                  <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> Email </th>
                  <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> Role </th>
                  <th scope="col" ><i className="fa fa-fw fa-sort"  ></i> Send Mail</th>
              </tr>
          </thead>
          <tbody>
              {this.state.list.map((list,index) => {
                //   console.log("lists",list)
                   return   <tr key={index}  >
                      <td >{list.firstName} {list.lastName}</td>
                      <td >{list.email}</td>
                      <td >{list.uType}</td>
                      <td>
                      <button  onClick={this.sendEmail.bind(this,list.email,list.firstname,list.lastname)} type="button" class="btn btn-dark">
                            Send mail
                          </button>
                      </td>
                      </tr>
              })}
          </tbody>
      </table>
  </div>} 
                    
                    <br />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getUsers,
        user: state.auth,
    }
}

export default connect(mapStateToProps, { getUsers })(UserList);