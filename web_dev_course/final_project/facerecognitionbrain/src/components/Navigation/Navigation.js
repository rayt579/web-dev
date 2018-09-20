import React from 'react'

const Navigation = ({ onRouteChanged, isSignedIn }) => {
		if (isSignedIn){
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChanged('signin')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
				</nav>
			);
		} else {
 			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={() => onRouteChanged('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
					<p onClick={() => onRouteChanged('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
				</nav>
			);
		}
}

export default Navigation;