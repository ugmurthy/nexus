<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children?: Snippet;
		class?: string;
		variant?: 'default' | 'secondary' | 'destructive' | 'outline';
	}

	let { children, class: className, variant = 'default', ...restProps }: Props = $props();

	const variants = {
		default: 'border-transparent bg-primary text-primary-foreground shadow',
		secondary: 'border-transparent bg-secondary text-secondary-foreground',
		destructive: 'border-transparent bg-destructive text-destructive-foreground shadow',
		outline: 'text-foreground'
	};
</script>

<div
	class={cn(
		'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
		variants[variant],
		className
	)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
