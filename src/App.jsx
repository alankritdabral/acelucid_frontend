import React, { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://acelucid-backend-latest-n364znmy1-alankrit-dabrals-projects.vercel.app/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre: userInput }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Unknown server error");
      }

      setResult(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parsedMovies =
    result?.movies?.length > 0
      ? JSON.parse(result.movies[0]).recommended_movies
      : [];

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "2rem",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      color: "#fff",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.5rem",
      marginBottom: "1.5rem",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    input: {
      width: "300px",
      padding: "0.7rem",
      borderRadius: "8px",
      border: "none",
      fontSize: "1rem",
    },
    button: {
      padding: "0.7rem 1.2rem",
      borderRadius: "8px",
      border: "none",
      background: "#ff9800",
      color: "#000",
      fontWeight: "bold",
      cursor: "pointer",
    },
    error: {
      color: "#ff6b6b",
      marginTop: "1rem",
    },
    subHeading: {
      marginBottom: "1rem",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1rem",
      maxWidth: "800px",
      margin: "0 auto",
    },
    card: {
      background: "#ffffff",
      color: "#000",
      padding: "1rem",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Movie Recommender</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="e.g. action, sci-fi, romantic thrillers"
          style={styles.input}
          required
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Finding..." : "Get Recommendations"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {parsedMovies.length > 0 && (
        <>
          <h2 style={styles.subHeading}>Recommended Movies</h2>
          <div style={styles.cardGrid}>
            {parsedMovies.map((movie, index) => (
              <div key={index} style={styles.card}>
                🎥 {movie}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
