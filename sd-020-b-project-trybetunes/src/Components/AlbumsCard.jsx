import React from 'react';
import PropTypes from 'prop-types';

class AlbumsCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { artistName,
      collectionName, artworkUrl100 } = this.props;
    return (
      <div>
        <div className="img-wrapper">
          <img src={ artworkUrl100 } alt={ collectionName } />
        </div>
        <h2>{collectionName}</h2>
        <p>{artistName}</p>
      </div>
    );
  }
}

AlbumsCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,

};

export default AlbumsCard;
