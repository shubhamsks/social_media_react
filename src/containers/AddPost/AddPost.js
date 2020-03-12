import React from 'react';
import axios,{post} from 'axios';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

class AddPost extends React.Component{
    state = {
        image:null,
        caption:"",
        submitting:false,
        error:null
    }
    handleOnChange =(event,type) => {
        switch(type){
            case 'file':
                this.setState({image:event.target.files[0]});
                break;
            case 'caption':
                this.setState({caption:event.target.value });
                break;
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const {image, caption} = this.state;
        if(!image) {
            this.setState({error:"image is required"});
        } else if(!caption) {
            this.setState({error:'caption is required'});
        } else {
            this.setState({submitting:true});
            this.add(caption, image)
            .then(response => {
                console.log(response.data);
                this.setState({submitting:false});
                const {id} = response.data;
                this.props.history.push('/p/'+id);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    add(caption, image){
        const{token} = this.props;
        const profileEditUrl = `http://127.0.0.1:8000/api/add_post/`;
        const formData = new FormData();
        formData.append('caption',caption);
        formData.append('image',image);
        const config = {
            headers: {
                Authorization:`token ${token}`
            }
        }
        return post(profileEditUrl, formData,config);
      }
        
    render() {

        return(
            <div>
                <h3>Add new post</h3>
                <form onSubmit = {this.handleSubmit}>
                    <label>Image</label>
                    <input required type='file' onChange = {(event) => this.handleOnChange(event,'file')} />
                    <label>Caption</label>
                    <textarea maxLength = {250} value = {this.state.caption} 
                    onChange = { (event) => this.handleOnChange(event,'caption')}/>
                    {this.state.error ? <p> {this.state.error} </p>:''}
                    <button type='submit'>{this.state.submitting?'Adding...':'Add'}</button>

                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token:state.auth.token,
    }
}
export default connect(mapStateToProps)(AddPost);