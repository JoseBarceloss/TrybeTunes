import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import { AlbumType, SongType } from '../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [musicList, setMusicList] = useState<SongType[]>([]);

  useEffect(() => {
    if (id) {
      getMusics(id)
        .then((response: [AlbumType, ...SongType[]]) => {
          const [albumInfo, ...musics] = response;
          setArtistName(albumInfo.artistName);
          setAlbumName(albumInfo.collectionName);
          setMusicList(musics);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 data-testid="artist-name">{artistName}</h1>
      <h2 data-testid="album-name">{albumName}</h2>
      {musicList.map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
        />
      ))}
    </div>
  );
}

export default Album;
