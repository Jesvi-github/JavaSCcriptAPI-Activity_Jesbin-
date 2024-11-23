// The base API endpoint URL
const apiUrl = 'https://developers.coinmarketcal.com/v1/cryptocurrency-news'; // Replace with actual endpoint if different

// API key
const apiKey = 'gFs523Ce8V8AeSKtD6rir9R7Y8ztt16O5v5olWAb';

// Function to fetch and display the latest cryptocurrency news
function fetchCryptoNews() {
  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${gFs523Ce8V8AeSKtD6rir9R7Y8ztt16O5v5olWAb}`, // Use your actual API key here
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    return response.json();
  })
  .then(data => {
    // Assuming the API returns a list of news articles in 'data.data' (adjust this if needed)
    const articles = data.data;

    // Clear the loading message and add news articles
    document.getElementById('news-container').innerHTML = '';

    // Loop through the articles and display them
    articles.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      
      // Add article title
      const title = document.createElement('h3');
      title.textContent = article.title;
      articleElement.appendChild(title);
      
      // Add article summary
      const summary = document.createElement('p');
      summary.textContent = article.summary || 'No summary available.';
      articleElement.appendChild(summary);
      
      // Add a link to the full article
      const link = document.createElement('a');
      link.href = article.url; // Assuming 'url' contains the full article link
      link.textContent = 'Read full article';
      articleElement.appendChild(link);
      
      // Append the article element to the container
      document.getElementById('news-container').appendChild(articleElement);
    });
  })
  .catch(error => {
    console.error('Error fetching news:', error);
    document.getElementById('news-container').textContent = 'Failed to load news. Please try again later.';
  });
}

// Call the function to fetch and display news when the page loads
window.onload = fetchCryptoNews;
