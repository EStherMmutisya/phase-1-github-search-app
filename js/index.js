document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('github-form');
    const input = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const searchTerm = input.value.trim();
  
      if (searchTerm !== '') {
        try {
          // Clear previous results
          userList.innerHTML = '';
          reposList.innerHTML = '';
  
          // Fetch user data
          const userResponse = await fetch "http://localhost:3001";
          const userData = await userResponse.json();
  
          // Display user information
          userData.items.forEach(user => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login} avatar" class="avatar">
              <span>${user.login}</span>
              <a href="${user.html_url}" target="_blank" rel="noopener noreferrer">Profile</a>
            `;
            listItem.addEventListener('click', function () {
              getUserRepositories(user.login);
            });
            userList.appendChild(listItem);
          });
        } catch (error) {
          console.error('Error fetching GitHub users:', error);
        }
      }
    });
  
    async function getUserRepositories(username) {
      try {
        // Clear previous results
        reposList.innerHTML = '';
  
        // Fetch user's repositories
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repoData = await repoResponse.json();
  
        // Display user's repositories
        repoData.forEach(repo => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>${repo.name}</strong>
            <p>${repo.description || 'No description available'}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Visit Repository</a>
          `;
          reposList.appendChild(listItem);
        });
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  });