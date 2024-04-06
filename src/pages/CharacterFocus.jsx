/* eslint-disable react/prop-types */
const CharacterFocus = ({ character }) => {
  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <div className="character-image">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </div>
      <div className="character-description">
        <p>{character.description || "No description available"}</p>
        <h2>Comics:</h2>
        <ul>
          {character.comics.map((comicId) => (
            <li key={comicId}>{comicId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterFocus;
