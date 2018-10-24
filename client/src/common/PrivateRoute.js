import React from 'react';
import { Route , Redirect }  from 'react-router-dom';
import { connect }  from 'react-redux';
import PropTypes  from 'prop-types';

const PrivateRoute = ({component : Component , auth , ...rest}) => (
   <Route
   {...rest}
   render = {props =>
      auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (

        <Redirect to="/login" />
      )
   }
   />
);

PrivateRoute.propTyes = {
	auth: PropTypes.object.isRequired
}

const mapStatesToProps  = (state) => ({
	auth: state.auth,
});

export default connect(
	mapStatesToProps)(PrivateRoute);
