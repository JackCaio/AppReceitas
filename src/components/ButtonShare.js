import { string } from 'prop-types';
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ButtonShare(props) {
  const { pathname } = props;
  const [shareRecipe, setShareRecipe] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000${pathname}`);
    setShareRecipe(true);
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShare }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
      {shareRecipe && <p>Link copied!</p>}
    </div>
  );
}

ButtonShare.propTypes = {
  pathname: string,
}.isRequired;
