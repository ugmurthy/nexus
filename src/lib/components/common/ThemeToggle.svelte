<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { Sun, Moon } from 'lucide-svelte';
	import { Button } from '$lib/ui/button';
</script>

<Button variant="ghost" size="icon" onclick={() => theme.toggle()} aria-label="Toggle theme">
	{#if $theme === 'light'}
		<Moon class="h-5 w-5" />
	{:else}
		<Sun class="h-5 w-5" />
	{/if}
</Button>
