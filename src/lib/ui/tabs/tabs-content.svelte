<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn';

	interface Props {
		children?: Snippet;
		value: string;
		class?: string;
	}

	let { children, value, class: className }: Props = $props();
</script>

<TabsPrimitive.Content
	{value}
	class={cn(
		'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</TabsPrimitive.Content>
