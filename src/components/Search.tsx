import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { AlbumType } from '../types';

function Search() {
  const [artistName, setArtistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchedArtist, setSearchedArtist] = useState('');
  const [searched, setSearched] = useState(false);

  const handleArtistNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setArtistName(event.target.value);
  };

  const handleSearch = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await searchAlbumsAPI(artistName);

    setArtistName('');
    setSearchedArtist(artistName);
    setLoading(false);
    setAlbums(response);
    setSearched(true);
  };

  const isButtonDisabled = artistName.length < 2;

  return (
    <div>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <form>
            <label>
              Nome do artista:
              <input
                type="text"
                value={ artistName }
                onChange={ handleArtistNameChange }
                data-testid="search-artist-input"
              />
            </label>
            <button
              type="button"
              onClick={ handleSearch }
              disabled={ isButtonDisabled }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
          {searched && albums.length === 0 && <div>Nenhum álbum foi encontrado.</div>}
          {albums && albums.length > 0 && (
            <div>
              <p>
                Resultado de álbuns de:
                {' '}
                { searchedArtist }
              </p>
              <ul>
                {albums.map((album) => (
                  <li key={ album.collectionId }>
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      { album.collectionName }
                      <br />
                      <p>
                        Artist Name:
                        { album.artistName }
                      </p>
                      <img
                        src={ album.artworkUrl100 }
                        alt="Album Artwork"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Search;
