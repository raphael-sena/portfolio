// services/githubService.ts

export const getGitHubRepos = async () => {
    const specificRepos = ["recipes-and-flavors", "portfolio", "relatorio-fotografico"];
  
    try {
      const repoPromises = specificRepos.map(async (repo) => {
        const response = await fetch(`https://api.github.com/repos/raphael-sena/${repo}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${repo}`);
        }
        return response.json();
      });
  
      const repos = await Promise.all(repoPromises);
      return repos;
    } catch (error) {
      throw new Error("Failed to fetch repositories");
    }
  };
  