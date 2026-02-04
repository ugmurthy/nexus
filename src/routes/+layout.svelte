<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { authStore } from '$lib/stores/auth';

	let { children } = $props();

	onMount(() => {
		theme.init();
		authStore.init();
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
	{@render children()}
</div>
