// services/githubService.ts

export const getGitHubRepos = async () => {
    const specificRepos = ["remediar", "dress-manager", "recipes-and-flavors", "portfolio", "relatorio-fotografico"];
  
    try {
      const repoPromises = specificRepos.map(async (repo) => {
        const repoResponse = await fetch(`https://api.github.com/repos/raphael-sena/${repo}`);
        if (!repoResponse.ok) {
          throw new Error(`Failed to fetch ${repo}`);
        }
        const repoData = await repoResponse.json();
        
        // Fetch languages for this repository
        const languagesResponse = await fetch(`https://api.github.com/repos/raphael-sena/${repo}/languages`);
        const languagesData = languagesResponse.ok ? await languagesResponse.json() : {};
        
        // Get top 3 languages by bytes, filtering out languages with less than 35000 bytes
        const topLanguages = Object.entries(languagesData)
          .filter(([, bytes]) => (bytes as number) >= 35000)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 3)
          .map(([lang]) => lang);
        
        return {
          ...repoData,
          languages: topLanguages
        };
      });
  
      const repos = await Promise.all(repoPromises);
      return repos;
    } catch (error) {
      throw new Error("Failed to fetch repositories");
    }
  };
  