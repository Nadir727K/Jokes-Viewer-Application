const JokeCard = ({ joke }) => {
  if (!joke) return null;

  const content = joke?.content || "No joke available";

  return (
    <div className="card">
      <p className="joke-text">"{content}"</p>
    </div>
  );
};

export default JokeCard;