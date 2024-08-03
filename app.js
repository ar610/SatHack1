async function fetchRepoStats() {
    const repoName = document.getElementById('repoName').value;
    if (!repoName) {
        alert('Please enter a repository name.');
        return;
    }

    const token = 'YOUR_GITHUB_PERSONAL_ACCESS_TOKEN'; // Replace with your GitHub token
    const headers = {
        'Authorization': `token ${token}`
    };

    try {
        const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`, { headers });
        if (!repoResponse.ok) throw new Error('Repository not found');
        const repoData = await repoResponse.json();

        const contributorsResponse = await fetch(repoData.contributors_url, { headers });
        if (!contributorsResponse.ok) throw new Error('Contributors not found');
        const contributorsData = await contributorsResponse.json();

        document.getElementById('stars').innerText = `Stars: ${repoData.stargazers_count}`;
        document.getElementById('forks').innerText = `Forks: ${repoData.forks_count}`;
        document.getElementById('issues').innerText = `Open Issues: ${repoData.open_issues_count}`;
        document.getElementById('contributors').innerText = `Contributors: ${contributorsData.length}`;
    } catch (error) {
        alert(error.message);
    }
}
