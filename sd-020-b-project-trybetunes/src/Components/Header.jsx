import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUsed();
  }

  getUsed = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ user: user.name, loading: false });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? (<Loading />) : (
          <p data-testid="header-user-name">
            { user }
          </p>) }
        <nav>
          <hr />
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <hr />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <hr />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <hr />
        </nav>
      </header>
    );
  }
}

export default Header;
