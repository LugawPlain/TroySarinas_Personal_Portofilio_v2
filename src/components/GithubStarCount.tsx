"use client";
import { useEffect } from "react";

interface GitHubStarCountProps {
  username: string;
  repo: string;
}

interface GitHubRepoData {
  stargazers_count: number;
  message?: string; // Add message for potential API errors (like 'Not Found')
}

const GitHubStarCount: React.FC<GitHubStarCountProps> = ({
  username,
  repo,
}) => {
  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repo}`)
      .then((response) => {
        if (!response.ok) {
          // Throw an error if response is not OK (e.g., 404 Not Found)
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<GitHubRepoData>;
      })
      .then((data) => {
        if (typeof data.stargazers_count === "number") {
        } else {
          // Handle cases where stargazers_count might be missing or not a number
          throw new Error("Invalid data format received");
        }
      })
      .catch((error) => {
        console.error("Error fetching star count:", error);
        // Set a user-friendly error message
      });
  }, [username, repo]);

  return (
    <div>
      {/* {error ? (
        <p style={{ color: "red" }}>{error}</p> // Display error message
      ) : starCount !== null ? (
        <p>Stars: {starCount}</p> // Display star count on success
      ) : (
        <p>Loading stars...</p> // Display loading message
      )} */}
    </div>
  );
};

export default GitHubStarCount;
