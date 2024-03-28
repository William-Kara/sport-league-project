<template>
	<div class="container">
		<div class="content">
			<h1 class="page-title">League Schedule</h1>
			<table class="lw-table">
				<thead>
					<tr class="lw-table-title-line">
						<th class="text-right under-500-none">Date/Time</th>
						<th class="text-left empty-th under-750-none"></th>
						<th class="text-left under-750-none">Stadium</th>
						<th class="text-right">Home Team</th>
						<th class="text-center"></th>
						<th class="text-left">Away Team</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="lw-table-line"
						:key="index"
						v-for="(match, index) in matches"
					>
						<td class="text-right under-500-none">
							{{ formattedDate(match.matchDate) }} <br />
							{{ formattedTime(match.matchDate) }}
						</td>
						<td class="under-750-none"></td>
						<td class="text-left under-750-none">
							{{ match.stadium }}
						</td>
						<td class="country-item left-country">
							<span class="country-name is-bold">{{ match.homeTeam }}</span>
							<img
								class="flag"
								:src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
							/>
						</td>
						<td class="text-center is-bold">
							{{ match.matchPlayed ? match.homeTeamScore : '-' }} :
							{{ match.matchPlayed ? match.awayTeamScore : '-' }}
						</td>
						<td class="country-item right-country is-bold">
							<img
								class="flag"
								:src="`https://flagsapi.codeaid.io/${match.awayTeam}.png`"
							/>
							<span class="country-name is-bold">{{ match.awayTeam }}</span>
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
	const leagueService = new LeagueService();

	const getAccesToken = async () => {
		// Getting access token from the api to use in match fetching below.
		try {
			const response = await fetch(
				'http://localhost:3001/api/v1/getAccessToken'
			);
			accessToken.value = await response.json();
			fetchMatches();
		} catch (error) {
			console.error('Error fetching access token:', error);
		}
	};
	const fetchMatches = async () => {
		// Getting matches data from the api using the access token fetched before.
		try {
			await leagueService.fetchData(accessToken.value.access_token);
			matches.value = leagueService.getMatches();
		} catch (error) {
			console.error('Error fetching all matches:', error);
		}
	};
	// Formatting date following the W3C Date/Time Formatting formatting rules.
	const formattedDate = (timestamp) => {
		const date = new Date(timestamp);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	// Formatting time following the W3C Date/Time Formatting formatting rules.
	const formattedTime = (timestamp) => {
		const date = new Date(timestamp);
		const hour = date.getHours();
		const minute = date.getMinutes();
		return `${hour}:${minute}`;
	};

	onMounted(() => {
		getAccesToken();
	});
</script>
