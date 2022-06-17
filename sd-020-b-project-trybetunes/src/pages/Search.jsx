import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import AlbumsCard from '../Components/AlbumsCard';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      user: '',
      searchedArtist: '',
      albums: [],
      isLoading: false,
    };
  }

  buttonAble = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      const { user } = this.state;
      const min = 2;
      if (user.length >= min) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  handleClick = async () => {
    const { user } = this.state;

    this.setState({
      isLoading: true,
    });

    const artistAlbums = await searchAlbumsAPI(user);
    console.log(artistAlbums);

    this.setState({
      albums: [...artistAlbums],
      searchedArtist: user,
      user: '',
      isLoading: false,
    });
  }

  render() {
    const { disabled, user, searchedArtist, isLoading, albums,
    } = this.state;

    return (
      <section data-testid="page-search">
        <Header />
        <p>Search</p>
        <div>
          <input
            name="user"
            type="text"
            data-testid="search-artist-input"
            id="search-artist-input"
            value={ user }
            onChange={ this.buttonAble }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            Search
          </button>
        </div>
        <div className="albums-container">
          {isLoading && <Loading />}

          {
            albums.length > 0
          && (
            <p>
              { `Resultado de álbuns de: ${searchedArtist} `}
            </p>
          )
          }

          {albums.length > 0 ? (
            albums.map((album) => (
              <Link
                to={ `/album/${album.collectionId}` }
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <AlbumsCard { ...album } />
              </Link>
            ))
          ) : (
            <p> Nenhum álbum foi encontrado </p>
          )}
        </div>
      </section>
    );
  }
}

export default Search;
