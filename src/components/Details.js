import React from 'react';
import { connect } from 'react-redux';
import {update} from '../store/actions/index';

class Details extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            type:'admin',
            disabled:true,
            editable:true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.setState({
            firstname:this.props.user.firstname,
            lastname:this.props.user.lastname,
            email:this.props.user.email,
            type:this.props.user.type,
        },()=>{
            console.log("adminss",this.state.type)
        })
    }

    handleChange(event) {
        this.setState({type: event.target.value});
    }

    editable = (e)=>{
        e.preventDefault()
        this.setState({
            disabled:false,
            editable:false
        })
    }

    handleSubmit = (e)=>{
        const target = e.target;
        const value = target.value;
        const name = target.name;
        e.preventDefault();
        this.setState({
            disabled:true,
            editable:true,
            [name]: value
        },()=>{
            let fname = this.state.firstname;
            let lname = this.state.lastname;
            let email = this.state.email;
            let type = this.state.type;
            const val ={
                "data":{
                    fname,
                    lname,
                    email,
                    type
                }
            }
            this.props.update(val,()=>{
                console.log("successfully updated")
            })
        })
    }

    render() {
        return (
            <div className="container">
                         <form name="registration" onSubmit={this.handleSubmit}>
                            <div className="form-group flex-fill">
                                <label for="name">Name</label>
                                <div className="d-flex flex-row">
                                    <input type="text" className="form-control mr-1" id="name" name="firstname"  placeholder="First Name" value={this.state.firstname} onChange={(e)=>this.setState({firstname:e.target.value})}  disabled = {this.state.disabled} />
                                    <input type="text" className="form-control" id="name" name="lastname" placeholder="Last Name" value={this.state.lastname} onChange={(e)=>this.setState({lastname:e.target.value})}  disabled = {this.state.disabled} />                            
                                </div>
                            </div>
                            <div className="form-group flex-fill">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  disabled={true} />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="type">Type</label>
                                <select class="form-control" id="type" name="type" value={this.state.type} onChange={this.handleChange}  disabled = {this.state.disabled} >
                                  <option value="admin">Admin</option>
                                  <option value="user">User</option>
                                  <option value="volunteer">Volunteer</option>
                                </select>
                            </div>
                            {this.state.editable?                            <div className="d-flex justify-content-center">
                                <button type="button" onClick={this.editable} class="btn btn-success" id="submitButton">Edit</button>
                            </div>:
                                <div className="d-flex justify-content-center">
                                    <button type="submit" class="btn btn-success" id="submitButton">Save</button>
                                </div>
                        }
                        </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth,
    }
}

export default connect(mapStateToProps, { update })(Details);