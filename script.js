document.addEventListener("DOMContentLoaded", async () => {
  const list = document.getElementById("starred-list");

  if (!list) {
    return;
  }

  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error("Unable to load starred repositories.");
    }

    const data = await response.json();
    const repositories = Array.isArray(data.events) ? data.events : [];

    if (repositories.length === 0) {
      list.innerHTML = '<li class="empty-state">No starred repositories yet.</li>';
      return;
    }

    list.innerHTML = repositories
      .map(
        (repo) => `
          <li class="repo-card">
            <div class="repo-header">
              <a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a>
              <span class="star-count">★ ${repo.stargazers_count}</span>
            </div>
            <p>${repo.description || "No description provided."}</p>
            <div class="repo-meta">
              <span class="language-dot" style="background: ${getLanguageColor(repo.language)}"></span>
              <span>${repo.language || "Unknown"}</span>
            </div>
          </li>
        `
      )
      .join("");
  } catch (error) {
    list.innerHTML = `<li class="empty-state">${error.message}</li>`;
  }
});

function getLanguageColor(language) {
  const palette = {
    HTML: "#e34c26",
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    CSS: "#563d7c",
    Python: "#3572A5",
    Go: "#00ADD8",
    Rust: "#dea584",
    Shell: "#89e051",
    Java: "#b07219",
    Default: "#6e7781"
  };

  return palette[language] || palette.Default;
}
