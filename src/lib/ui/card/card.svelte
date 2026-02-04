<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<div
	class={cn(
		'rounded-xl border bg-card text-card-foreground shadow-sm',
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
