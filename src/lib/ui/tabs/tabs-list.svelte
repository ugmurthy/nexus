<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/cn';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<TabsPrimitive.List
	class={cn(
		'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
		className
	)}
>
	{#if children}
		{@render children()}
	{/if}
</TabsPrimitive.List>
