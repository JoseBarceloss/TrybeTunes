import React, { useState } from 'react';
import checkedHeartImg from '../images/checked_heart.png';
import emptyHeartImg from '../images/empty_heart.png';

type MusicCardProps = {
  trackId: number;
  trackName: string;
  previewUrl: string;
};

export default function MusicCard({ trackId, trackName, previewUrl }: MusicCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteChange = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
        .
      </audio>

      <label htmlFor="favorite">
        <input
          type="checkbox"
          id="favorite"
          data-testid={ `checkbox-music-${trackId}` }
          checked={ isFavorite }
          onChange={ handleFavoriteChange }
        />
        {' '}
        {
         isFavorite ? <img
           src={ checkedHeartImg }
           alt="favorite"
         /> : <img
           src={ emptyHeartImg }
           alt="favorite"
         />
}
      </label>

    </div>
  );
}
