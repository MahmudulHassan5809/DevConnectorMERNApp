import React, { Component } from 'react';
import { connect }  from 'react-redux';
import PropTypes  from 'prop-types';
import { Link }  from 'react-router-dom';

import ProfileHeader  from './ProfileHeader';
import ProfileAbout  from './ProfileAbout';
import ProfileGithub  from './ProfileGithub';
import ProfileCred  from './ProfileCred';
import Spinner  from '../../common/Spinner';

import { getProfileByHandle }  from '../../actions/profileAction';

class Profile extends Component {

	componentDidMount(){
		if(this.props.match.params.handle){
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
	    if (nextProps.profile.profile === null && this.props.profile.loading) {
	      this.props.history.push('/not-found');
	    }
    }

	componentWillRecieve
	render() {
		const { profile , loading} = this.props.profile;
		let profileContent;
		if(profile === null || loading){
			profileContent = <Spinner />
		}else{
			profileContent = (
               <div>
               	<div className="row">
                  <div className="col-md-6">
                     <Link to="/prodiles" className="btn btn-light mb-3 float-left">Back</Link>
                  </div>
                  <div className="col-md-6" />
               	</div>
                <ProfileHeader profile={profile}/>
				<ProfileAbout profile={profile}/>
				<ProfileCred education={profile.education} experience={profile.experience}/>
				{profile.githubusername ? (<ProfileGithub username={profile.githubusername} />) : null}
               </div>
			);
		}
		return (
			<div className="profile">
               <div className="container">
                 <div className="row">
                   <div className="col-md-12">
                      {profileContent}
                   </div>
                 </div>
               </div>
			</div>
		);
	}
}


Profile.propTyes = {
	profile: PropTypes.object.isRequired,
	getProfileByHandle: PropTypes.func.isRequired
}

const mapStatesToProps  = (state) => ({
	profile : state.profile

});

export default connect(
	mapStatesToProps,
	{getProfileByHandle}
	)(Profile);
