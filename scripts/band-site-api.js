const API_KEY = '0e2a70e0-7036-4aea-a5e1-ff0bc540dee5';

class BandSiteApi {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com';
    }
    async postComment(comment) {
      try {
        const response = await fetch(`${this.baseUrl}/comments?api_key=${this.apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        });
        return await response.json();
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
    async getComments() {
      try {
        const response = await fetch(`${this.baseUrl}/comments?api_key=${this.apiKey}`);
        const comments = await response.json();
        return comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 3);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
    async getShows() {
      try {
        const response = await fetch(`${this.baseUrl}/showdates?api_key=${this.apiKey}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    }
  }

  const api = new BandSiteApi(API_KEY);
