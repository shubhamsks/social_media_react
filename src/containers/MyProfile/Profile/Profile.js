import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import {connect} from 'react-redux';
class Profile extends React.Component{
    state = {
        follows : this.props.follows,
    }
    handleFollowClick = () => {
        const {follows} = this.state;
        const {user_id, token} = this.props;
        const url = 'http://127.0.0.1:8000/api';
        const accountUrl = `${url}/auth/accounts/${user_id}`;
        let followUrl;
        if(follows) {
            // user already follows the current profile user 
            // Make url for unfollowing the profile 
            followUrl = `${accountUrl}/unfollow/`;
        } else {
            followUrl = `${accountUrl}/follow/`;
        }
        const headers ={
            headers:{Authorization:`token ${token}`}
        }
        axios.post(followUrl,null,headers)
        .then(response => {
            this.setState({follows:!follows});
        })
        .catch(error => {
            console.log(error);

        })
    }
    render(){
        const {user_id} = this.props;
        const {follows} = this.state;
        console.log(user_id);
        return (
            <div className='profile'>
                <div className='profileUpperSection'>
                    <img src={this.props.profileImg} alt = {this.props.username} className='profileImg'/>
                    <div className = 'upperRightSection'>
                        <div className='followSection'>
                            <Link to={`/acc/${user_id}/followers`}>Followers {this.props.followers}</Link>
                            <Link to= {`/acc/${user_id}/following`}>Following {this.props.following}</Link>
                        </div>
                        
                        <button
                        onClick={this.handleFollowClick}
                        className = 'followButton'
                        >
                            {follows?'Unfollow':'Follow' }
                        </button> 
                    </div>
                </div>
                <b className='username'>{this.props.username}</b>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(Profile);