import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-profile">Profile</div>
      </main>
    );
  }
}

export default Profile;
