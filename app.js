

async function fetchRepoStats() {
    const repoName = document.getElementById('repoName').value;
    if (!repoName) {
        alert('Please enter a repository name.');
        return;
    }

    try {
        // Fetch repository details
        const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`);
        if (!repoResponse.ok) throw new Error('Repository not found');
        const repoData = await repoResponse.json();

        // Fetch contributors
        const contributorsResponse = await fetch(repoData.contributors_url);
        if (!contributorsResponse.ok) throw new Error('Contributors not found');
        const contributorsData = await contributorsResponse.json();

        // Update the UI
        document.getElementById('stars').innerText = `Stars: ${repoData.stargazers_count}`;
        document.getElementById('forks').innerText = `Forks: ${repoData.forks_count}`;
        document.getElementById('issues').innerText = `Open Issues: ${repoData.open_issues_count}`;
        document.getElementById('contributors').innerText = `Contributors: ${contributorsData.length}`;
    } catch (error) {
        alert(error.message);
    }
}

