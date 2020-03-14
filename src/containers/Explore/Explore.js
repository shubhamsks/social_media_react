import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Posts from '../../components/Posts/Posts';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-insta';
class Explore extends React.Component {
    componentDidMount(){
        const{token,loadPosts} = this.props;
        loadPosts(token);
    }
    render(){
        const { loading } = this.props;
        let displayPosts = <Spinner/>
        if(!loading) {
            const {posts} = this.props;
            displayPosts = <Posts posts = {posts}/>
        }
        return (
            <div className='col s12'>
                {displayPosts}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token:state.auth.token,
        posts:state.explore.posts,
        loading:state.explore.loading,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        loadPosts:(token) => dispatch(actionCreators.loadExplorePosts(token)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Explore,axios));