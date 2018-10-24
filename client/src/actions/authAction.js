//import { TEST_DISPATCH }  from './types';
import { GET_ERRORS , SET_CURRENT_USER }  from './types';
import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import setAuthToken  from '../utils/setAuthToken';

//Register User
export const registerUser = (userData , history) => dispatch => {
	// return {
	// 	type : TEST_DISPATCH,
	// 	payload : userData
	// }

	axios.post('/api/users/register' , userData)
        .then(res => history.push('/login'))
        .catch(err =>
           dispatch({
              type: GET_ERRORS,
              payload: err.response.data
           })
        );
}

//Login User - Get use Token
export const loginUser = (userData) => dispatch => {
   axios.post('/api/users/login',userData)
  	   .then(res => {
          //Dave To LocalStorage
          const { token } = res.data;
          //Set Token to ls
          localStorage.setItem('jwtToken',token);
          //Set Token to Auth Header
          setAuthToken(token);

          //Decode token to get user data
          const decoded = jwt_decode(token);

          //set Current User
          dispatch(setCurrentUser(decoded));
  	   })
  	   .catch(err =>
          dispatch({
              type: GET_ERRORS,
              payload: err.response.data
           })
  	   	);
};

//Set Logged in user
export const setCurrentUser= (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

//Log User Out
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');

  //Remove the Auth Header
  setAuthToken(false);

  //Set Current User to empty Object and Also Set IsAuthenticated False
  dispatch(setCurrentUser({}));
}
