import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import PropTypes  from 'prop-types';
import { connect }  from 'react-redux';
import { getCurrentProfile , deleteAccount }  from '../../actions/profileAction';
import Spinner from '../../common/Spinner';

import ProfileAction  from './ProfileAction';
import Experience  from './Experience';
import Education  from './Education';

class Dashboard extends Component {

	componentDidMount(){
		this.props.getCurrentProfile();
	};

	onDeleteClick(e){
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile , loading } = this.props.profile;

		let dashboardContent;
		if (profile === null || loading) {
			dashboardContent = <Spinner />;
		} else {
			//Check if Logged In user Has Profile
			if(Object.keys(profile).length > 0){
                dashboardContent = (
                   <div>
                   	  <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                   	  <ProfileAction />
                   	  <Experience experience={profile.experience} />
                   	  <Education education={profile.education} />
                   	  <div style={{marginBottom : '60px'}} />

                       <button onClick={this.onDeleteClick.bind(this)} type="button" className="btn btn-danger">Delete My Account</button>
                   </div>
                );
			}else{
               //User Is Logged In But Has No Profile
               dashboardContent = (
                  <div>
                  	<p className="lead text-muted">Welcome {user.name}</p>
                  	<p>You Have Not Yet Set Up Your Profile..<br/>
                  	Please Add Some Info..</p>
                  	<Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                  </div>

               	);
			}
		}
		return (
			<div className="dashboard">
				<div className="container">
                   <div className="row">
                      <div className="col-md-12">
                         <h1 className="display-4">Dashboard</h1>
                         {dashboardContent}
                      </div>
                   </div>
				</div>
			</div>
		);
	}
}

Dashboard.propTyes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStatesToProps  = (state) => ({
	auth: state.auth,
	profile : state.profile
});

export default connect(
    mapStatesToProps,
    { getCurrentProfile,deleteAccount }
	)(Dashboard);
