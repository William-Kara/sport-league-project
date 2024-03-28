<template>
	<div class="container">
		<div class="content">
			<h1 class="page-title">League Standings</h1>
			<table class="lw-table">
				<thead>
					<tr class="lw-table-title-line">
						<th class="leaderboard-first-th">Team Name</th>
						<th class="text-center">MP</th>
						<th class="text-center">GF</th>
						<th class="text-center under-500-none">GA</th>
						<th class="text-center">Points</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="lw-table-line"
						:key="index"
						v-for="(team, index) in leaderboard"
					>
						<td class="is-bold">
							<div class="country-item leaderboard-country">
								<img
									class="flag"
									:src="`https://flagsapi.codeaid.io/${team.teamName}.png`"
								/>
								<span>{{ team.teamName }}</span>
							</div>
						</td>
						<td class="text-center">
							{{ team.matchesPlayed }}
						</td>
						<td class="text-center">
							{{ team.goalsFor }}
						</td>
						<td class="text-center under-500-none">
							{{ team.goalsAgainst }}
						</td>
						<td class="text-center is-bold is-points">
							{{ team.points }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import LeagueService from '../services/LeagueService';

	const matches = ref(null);
	const accessToken = ref(null);
	const leaderboard = ref(null);
	const leagueService = new LeagueService();

	const getAccesToken = async () => {
		// Getting access token from the api to use in match fetching below.
		try {
			const response = await fetch(
				'http://localhost:3001/api/v1/getAccessToken'
			);
			accessToken.value = await response.json();
			fetchLeaderboard();
		} catch (error) {
			console.error('Error fetching access token:', error);
		}
	};

	const fetchLeaderboard = async () => {
		// Getting matches data from the api using the access token fetched before.
		try {
			await leagueService.fetchData(accessToken.value.access_token);
			leaderboard.value = leagueService.getLeaderboard();
		} catch (error) {
			console.error('Error fetching leaderboard:', error);
		}
	};

	onMounted(() => {
		getAccesToken();
	});
</script>
