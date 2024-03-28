<template>
	<div class="header-holder">
		<a href="/">
			<img class="header-logo" src="/images/logo.svg" />
		</a>
		<ul class="nav-bar">
			<li v-for="(menu, index) in MENU_ITEMS" :key="index">
				<a class="nav-item" :href="menu.path">
					<img class="nav-icon" :src="`/images/${menu.icon}`" />
					<span class="nav-title">{{ menu.title }}</span>
				</a>
			</li>
		</ul>
	</div>
</template>

<script setup>
	const MENU_ITEMS = [
		{
			title: "Schedule",
			icon: "schedule.png",
			path: "/schedule",
		},
		{
			title: "Leaderboard",
			icon: "leaderboard.png",
			path: "/leaderboard",
		},
	];
</script>
