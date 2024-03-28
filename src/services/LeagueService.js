/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 *
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM,
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.
 *
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 *
 */
class LeagueService {
	/**
	 * Sets the match schedule.
	 * Match schedule will be given in the following form:
	 * [
	 *      {
	 *          matchDate: [TIMESTAMP],
	 *          stadium: [STRING],
	 *          homeTeam: [STRING],
	 *          awayTeam: [STRING],
	 *          matchPlayed: [BOOLEAN],
	 *          homeTeamScore: [INTEGER],
	 *          awayTeamScore: [INTEGER]
	 *      },
	 *      {
	 *          matchDate: [TIMESTAMP],
	 *          stadium: [STRING],
	 *          homeTeam: [STRING],
	 *          awayTeam: [STRING],
	 *          matchPlayed: [BOOLEAN],
	 *          homeTeamScore: [INTEGER],
	 *          awayTeamScore: [INTEGER]
	 *      }
	 * ]
	 *
	 * @param {Array} matches List of matches.
	 */
	setMatches(matches) {
		this.matches = matches;
	}

	/**
	 * Returns the full list of matches.
	 *
	 * @returns {Array} List of matches.
	 */
	getMatches() {
		return this.matches;
	}

	/**
	 * Returns the leaderboard in a form of a list of JSON objecs.
	 *
	 * [
	 *      {
	 *          teamName: [STRING]',
	 *          matchesPlayed: [INTEGER],
	 *          goalsFor: [INTEGER],
	 *          goalsAgainst: [INTEGER],
	 *          points: [INTEGER]
	 *      },
	 * ]
	 *
	 * @returns {Array} List of teams representing the leaderboard.
	 */
	getLeaderboard() {
		// Pushing matches results (match played, amount of goals given of taken) and calculating points to also push them into each team standings. Then organizing teams following ranking system.
		const teamStandings = {};
		console.log(this.matches);
		this.matches.forEach((match) => {
			const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;

			// Initializing each teams if they don't already exists.
			if (!teamStandings[homeTeam]) {
				teamStandings[homeTeam] = {
					matchesPlayed: 0,
					goalsFor: 0,
					goalsAgainst: 0,
					points: 0,
				};
			}
			if (!teamStandings[awayTeam]) {
				teamStandings[awayTeam] = {
					matchesPlayed: 0,
					goalsFor: 0,
					goalsAgainst: 0,
					points: 0,
				};
			}

			// Adding a match played for both teams that played the match
			teamStandings[homeTeam].matchesPlayed++;
			teamStandings[awayTeam].matchesPlayed++;

			// Adding goals for scored and taken for both teams that played the match
			teamStandings[homeTeam].goalsFor += homeTeamScore;
			teamStandings[homeTeam].goalsAgainst += awayTeamScore;
			teamStandings[awayTeam].goalsFor += awayTeamScore;
			teamStandings[awayTeam].goalsAgainst += homeTeamScore;

			// Updating points for both teams ( 3 points for a win, 1 point for a draw )
			if (homeTeamScore > awayTeamScore) {
				teamStandings[homeTeam].points += 3;
			} else if (homeTeamScore === awayTeamScore) {
				teamStandings[homeTeam].points += 1;
				teamStandings[awayTeam].points += 1;
			} else if (awayTeamScore > homeTeamScore) {
				teamStandings[awayTeam].points += 3;
			}
		});

		// Mapping standings into leaderboard
		const leaderboard = Object.entries(teamStandings).map(
			([teamName, standings]) => ({
				teamName,
				matchesPlayed: standings.matchesPlayed,
				goalsFor: standings.goalsFor,
				goalsAgainst: standings.goalsAgainst,
				points: standings.points,
			})
		);
		// Sorting leaderboard in descending order
		leaderboard.sort((a, b) => {
			//The first tiebreaker is the number of points in head-to-head matches between the teams that have the same number of points. So, if multiple teams have the same number of points the order is defined by “creating” a mini leaderboard of those teams only and sorting them only by the number of points.
			if (a.points !== b.points) {
				return b.points - a.points;
			}
			// The second tiebreaker is goal difference.
			else if (a.points === b.points) {
				if (a.goalsFor - a.goalsAgainst !== b.goalsFor - b.goalsAgainst) {
					return a.goalsFor - a.goalsAgainst - (b.goalsFor - b.goalsAgainst);
				}
				// The third tiebreaker is the number of scored goals
				else if (a.goalsFor - a.goalsAgainst === b.goalsFor - b.goalsAgainst) {
					if (a.goalsFor !== b.goalsFor) {
						return b.goalsFor - a.goalsFor;
					}
					// The final tiebreaker is alphabetic ascending order by name.
					else if (a.goalsFor === b.goalsFor) {
						if (a.teamName > b.teamName) {
							return 1;
						} else {
							return -1;
						}
					}
				}
			}
		});
		return leaderboard;
	}

	/**
	 * Asynchronic function to fetch the data from the server and set the matches.
	 */
	async fetchData(accessToken) {
		const response = await fetch('http://localhost:3001/api/v1/getAllMatches', {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + accessToken,
			},
		});
		const { success, matches } = await response.json();
		if (success) {
			this.setMatches(matches);
		}
	}
}

export default LeagueService;
