import { useEffect, useState } from "react";
import { fetchJokes } from "../services/api";
import JokeCard from "../components/JokeCard";

const Home = () => {
  const [jokes, setJokes] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadJokes = async (signal) => {
    try {
      setLoading(true);
      const data = await fetchJokes(signal);
      setJokes(data);
      setIndex(0);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadJokes(controller.signal);
    return () => controller.abort();
  }, []);

  const nextJoke = () => {
    if (index < jokes.length - 1) {
      setIndex(index + 1);
    } else {
      loadJokes(); // fetch new batch
    }
  };

  if (loading) return <p className="status">Loading jokes...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="container">
      <JokeCard joke={jokes[index]} />

      <button className="btn" onClick={nextJoke}>
        Next Joke 😂
      </button>
    </div>
  );
};

export default Home;