import * as actionTypes from './actionTypes';
import axios from '../../axios-insta';

export const authStart =() => {
    return {
        type: actionTypes.AUTH_START,
    }
};
export const authSuccess = (token, userId,username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId:userId,
        username:username
    }
};

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error
    }
};
export const logoutStart = () => {
    return {
        type:actionTypes.LOGOUT_START,
    }
}
export const logoutSuccess = () => {
    return {
        type:actionTypes.LOGOUT_SUCCESS
    }
}
export const logoutFail = (error) =>{
    return {
        type:actionTypes.LOGOUT_FAIL,
        error:error
    }
}
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
};

export const auth = (username, email, password, isSignUp) => {
    return (dispatch) => {
        dispatch(authStart());
        let authData = {
            'content-type':'application/json',
            "username":username,
            "email":email,
            "password":password
        }
        let authUrl = 'auth/register';
        if(!isSignUp) {
            authUrl = 'auth/login';
            authData = {
                "username":username,
                "password":password
            }
        }
        axios.post(authUrl,authData)
        .then((response) =>{
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('username',response.data.user.username);
            dispatch(authSuccess(response.data.token, response.data.user.id, response.data.user.username));
        })
        .catch((error) => {
            console.log(error);
            dispatch(authFail(error));
        });
    }
}
export const setAuthRedirect  = path => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
}
export const authCheckState = () =>{
    return dispath => {
        const token = localStorage.getItem('token');
        if(!token) {
            logout();
        } else {
            const userId = localStorage.getItem('userId');
            const username = localStorage.getItem('username');
            dispath(authSuccess(token, userId, username));
        }
    }
}