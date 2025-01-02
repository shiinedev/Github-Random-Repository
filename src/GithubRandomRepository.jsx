import { useState, useEffect } from "react";

function GithubRandomRepository() {
  const [languages, setLanguages] = useState([]);
  const [repo, setRepo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json`
        );
        const data = await response.json();
        console.log();
        setLanguages(data);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchLanguages();
  }, []);

  const handleRandomRepo = async (event) => {
    const language = event.target.value;

    setIsLoading(true);
    setRepo(null);
    setError("");

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
      );
      const data = await response.json();
      const index = Math.floor(Math.random() * data.items.length);
      console.log(data.items[index]);
      setRepo(data.items[index]);
      setIsLoading(false);
    } catch (error) {
      console.error("error", error);
      setError(error);
    }
  };

  const reset = () => {
    setRepo(null);
    setIsLoading(false);
    setError("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "500px",
        marginInline: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <i class="fa-brands fa-github" style={{ fontSize: "20px" }}></i>
        <h1>Github Random Repository</h1>
      </div>

      <select
        onChange={handleRandomRepo}
        style={{ width: "60%", padding: "8px 10px" }}
      >
        {languages.map((lang) => (
          <option value={lang.value}>{lang.title}</option>
        ))}
      </select>

      {isLoading && <p>loading.....</p>}
      {error && (
        <div>
          <p>Error, {error}</p>
          <button
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={reset}
          >
            Click To Try
          </button>
        </div>
      )}
      {repo && (
        <div
          style={{
            backgroundColor: "#f4f1f8",
            fontSize: "24px",
            padding: "10px",
            borderRadius: "10px",
            marginTop: "10px",
            width: "60%",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{repo.name}</p>
          <p>{repo.description}</p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: "15px " }}>{repo.language}</span>

            <span
              style={{
                fontSize: "15px ",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <i class="fa-solid fa-star" style={{ fontSize: "10px" }}></i>
              {repo.stargazers_count.toLocaleString("en-US")}
            </span>

            <span
              style={{
                fontSize: "15px ",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <i class="fa-solid fa-code-fork" style={{ fontSize: "10px" }}></i>
              {repo.forks.toLocaleString("en-US")}
            </span>

            <span
              style={{
                fontSize: "15px ",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <a
                href={repo.html_url}
                target="_blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <i class="fa-brands fa-github" style={{ fontSize: "20px" }}></i>
              </a>
            </span>
           
          </div>

          <button
            onClick={reset}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}

export default GithubRandomRepository;
