<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends HTMLAttributes<HTMLTableCaptionElement> {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<caption class={cn('mt-4 text-sm text-muted-foreground', className)} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</caption>
