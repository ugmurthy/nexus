<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { dags } from "$lib/api/client";
  import { isAdmin } from "$lib/stores/auth";
  import JsonEditor from "$lib/components/common/JsonEditor.svelte";
  import type { Content } from "svelte-jsoneditor";

  let content: Content = $state({ json: {} });
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    if (!$isAdmin) {
      goto("/");
      return;
    }

    try {
      const response = await dags.list({ limit: 50 });
      content = { json: response };
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to load DAGs";
    } finally {
      loading = false;
    }
  });
</script>

{#if $isAdmin}
  <div class="container mx-auto p-6 max-w-6xl">
    <h1 class="text-3xl font-bold mb-6">Plan (DAGs)</h1>

    {#if loading}
      <div class="flex items-center justify-center h-64 text-muted-foreground">
        Loading DAGs...
      </div>
    {:else if error}
      <div class="bg-red-50 text-red-600 p-4 rounded">
        {error}
      </div>
    {:else}
      <JsonEditor
        bind:content
        mode="tree"
        readOnly={true}
        mainMenuBar={true}
        navigationBar={true}
        statusBar={true}
        height="600px"
      />
    {/if}
  </div>
{:else}
  <div class="container mx-auto p-6 max-w-6xl">
    <div class="bg-red-50 text-red-600 p-4 rounded">
      Access denied. Admin role required.
    </div>
  </div>
{/if}
