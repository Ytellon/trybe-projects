import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/header.css';

class Header extends React.Component {
  render() {
    const { player } = this.props;

    return (
      <header>
        <div className="header">
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` } alt="player" />
          <h3 data-testid="header-player-name">{player.name}</h3>
          <h3 data-testid="header-score">
            { player.score }
          </h3>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps)(Header);
