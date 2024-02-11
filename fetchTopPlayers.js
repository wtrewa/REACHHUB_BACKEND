const { default: axios } = require("axios");


async function fetchTopPlayers() {
    try {
        console.log('hello data fetch')
      const response = await axios.get('https://lichess.org/api/player/top/500/classical');
      console.log('response++==>', response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching top players:', error.message);
      return [];
    }
  }

  async function fetchRatingHistory(username) {
    try {
      const response = await axios.get(`https://lichess.org/api/user/${username}/rating-history`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error(`Error fetching rating history for ${username}:`, error.message);
      return [];
    }
  };
  
  
  function get30DaysRatingHistory(playersData) {
    const result = playersData.map(player => {
        const username = player.username;
        const ratingHistory = player.ratingHistory.reduce((acc, game) => {
            const gameName = game.name;
            const lastActiveDate = new Date(Math.max(...game.points.map(point => new Date(point[0], point[1] - 1, point[2]))));
            const thirtyDaysAgo = new Date(lastActiveDate);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); // Subtract 30 days from the last active date

            const gameRatingHistory = game.points.filter(point => {
                const date = new Date(point[0], point[1] - 1, point[2]); // Month is 0-based
                return date.getTime() >= thirtyDaysAgo.getTime() && date.getTime() <= lastActiveDate.getTime();
            }).map(point => {
                return {
                    year: point[0],
                    month: point[1],
                    date: point[2],
                    rating: point[3]
                };
            });

            if (gameRatingHistory.length > 0) { // Check if there are points in the last 30 days
                acc.push({ name: gameName, ratingHistory: gameRatingHistory });
            }
            return acc;
        }, []);

        return { username, ratingHistory };
    });

    return result;
}

  module.exports = {fetchTopPlayers,fetchRatingHistory};