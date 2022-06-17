import React, { Component } from 'react';
import propTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    const { isChecked } = this.props;
    this.setState({
      isChecked,
    });
  }

  favoriteSongAdd = async ({ target }) => {
    const { checked } = target;

    this.setState(
      {
        loading: true,
      },
      async () => {
        if (checked === true) {
          const music = await getMusics(target.id);
          await addSong(music[0]);
          this.setState({
            loading: false,
            isChecked: true,
          });
        } else {
          this.setState({
            loading: true,
          });
          const removeMusic = await getMusics(target.id);
          await removeSong(removeMusic[0]);
          this.setState({
            loading: false,
            isChecked: false,
          });
        }
      },
    );
  };

  render() {
    const { single, previewUrl, trackId } = this.props;
    const { isChecked, loading } = this.state;

    return (
      <section>
        {loading ? (
          <Loading />
        ) : (
          <section className="musics-container">
            <div>
              <h6>{single}</h6>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  name="isChecked"
                  id={ trackId }
                  value={ isChecked }
                  checked={ isChecked }
                  onChange={ this.favoriteSongAdd }
                  data-testid={ `checkbox-music-${trackId}` }
                />
              </label>
            </div>
          </section>
        )}
      </section>
    );
  }
}

MusicsCard.propTypes = {
  single: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  isChecked: propTypes.bool.isRequired,
};

export default MusicsCard;
