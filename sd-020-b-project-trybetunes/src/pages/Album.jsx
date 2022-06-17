import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicsCard from '../Components/MusicsCard';
import Loading from '../Components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistName: '',
      singleAlbumName: '',
      songs: [],
      myFavorites: [],
    };
  }

  componentDidMount() {
    this.renderMusics();
    this.favoriteSongs();
  }

  renderMusics = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const fetchAlbum = await getMusics(id);
    const filtredSongs = fetchAlbum.filter((e) => Object.keys(e).includes('previewUrl'));
    // console.log(filtredSongs);

    this.setState({
      artistName: fetchAlbum[0].artistName,
      singleAlbumName: fetchAlbum[0].collectionName,
      songs: [...filtredSongs],
    });
  };

  favoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const fetchFavSongs = await getFavoriteSongs();
    this.setState({ loading: false, myFavorites: fetchFavSongs });
  };

  render() {
    const { artistName, singleAlbumName, songs,
      loading, myFavorites,
    } = this.state;

    return (
      <section data-testid="page-album">
        <Header />
        <section>
          <h1 data-testid="artist-name">{artistName}</h1>
          <h4 data-testid="album-name">{singleAlbumName}</h4>
          {loading ? (
            <Loading />
          ) : (
            songs.map((single) => (
              <MusicsCard
                key={ single.trackId }
                single={ single.trackName }
                previewUrl={ single.previewUrl }
                trackId={ single.trackId }
                isChecked={ myFavorites.some((s) => s.trackId === single.trackId) }
                favoriteSongs={ this.favoriteSongs }
                onChange={ this.favoriteSongs }
              />
            ))
          )}
        </section>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
