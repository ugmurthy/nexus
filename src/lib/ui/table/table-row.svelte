<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/cn';

	interface Props extends HTMLAttributes<HTMLTableRowElement> {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();
</script>

<tr
	class={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</tr>
