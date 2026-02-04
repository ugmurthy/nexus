<script lang="ts">
	import { onMount } from 'svelte';
	import { artifacts } from '$lib/api/client';
	import MarkdownRenderer from '$lib/components/common/MarkdownRenderer.svelte';
	import { FileText, Loader2, ChevronLeft, AlertCircle, File, FileCode, FileImage, Calendar, Hash, X } from 'lucide-svelte';

	interface Artifact {
		id: string;
		name: string;
		type: string;
		size?: number;
		createdAt: string;
		executionId?: string;
		mimeType?: string;
	}

	let artifactsList = $state<Artifact[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let selectedArtifact = $state<Artifact | null>(null);
	let artifactContent = $state<string | null>(null);
	let loadingContent = $state(false);

	onMount(async () => {
		await fetchArtifacts();
	});

	async function fetchArtifacts() {
		loading = true;
		error = null;
		try {
			const response = await artifacts.list({ limit: 50 });
			artifactsList = (response.data as Artifact[]) || (response.artifacts as Artifact[]) || [];
		} catch (err: any) {
			error = err.message || 'Failed to load artifacts';
			artifactsList = [];
		} finally {
			loading = false;
		}
	}

	async function selectArtifact(artifact: Artifact) {
		selectedArtifact = artifact;
		loadingContent = true;
		artifactContent = null;
		try {
			const content = await artifacts.getContentById({ id: artifact.id });
			artifactContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
		} catch (err: any) {
			artifactContent = `# Error Loading Content\n\n${err.message || 'Failed to load artifact content'}`;
		} finally {
			loadingContent = false;
		}
	}

	function closeViewer() {
		selectedArtifact = null;
		artifactContent = null;
	}

	function getFileIcon(type: string, mimeType?: string) {
		if (mimeType?.startsWith('image/')) return FileImage;
		if (type === 'code' || mimeType?.includes('javascript') || mimeType?.includes('typescript')) return FileCode;
		return FileText;
	}

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function formatSize(bytes?: number) {
		if (!bytes) return '—';
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
</script>

<svelte:head>
	<title>Artifacts — NEXUS AI</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 font-display text-white">
	<!-- Background -->
	<div class="fixed inset-0 z-0">
		<div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
		<div class="absolute inset-0 grid-bg opacity-30"></div>
		<div class="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
		<div class="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
	</div>

	<!-- Header -->
	<header class="relative z-10 glass border-b border-slate-800/50">
		<div class="max-w-7xl mx-auto px-6 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-4">
					<a href="/" class="text-slate-400 hover:text-white transition-colors">
						<ChevronLeft class="w-5 h-5" />
					</a>
					<div class="flex items-center gap-3">
						<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
							<FileText class="w-5 h-5 text-cyan-400" />
						</div>
						<div>
							<h1 class="text-xl font-semibold">Artifacts</h1>
							<p class="text-sm text-slate-500">Browse and view generated files</p>
						</div>
					</div>
				</div>
				<div class="text-sm text-slate-500">
					{artifactsList.length} artifacts
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="relative z-10 max-w-7xl mx-auto px-6 py-8">
		{#if loading}
			<div class="flex items-center justify-center py-24">
				<Loader2 class="w-8 h-8 text-cyan-400 animate-spin" />
			</div>
		{:else if error}
			<div class="glass rounded-2xl p-8 text-center">
				<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
					<AlertCircle class="w-8 h-8 text-red-400" />
				</div>
				<h2 class="text-xl font-semibold mb-2">Failed to Load Artifacts</h2>
				<p class="text-slate-400 mb-6">{error}</p>
				<button
					onclick={fetchArtifacts}
					class="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-semibold text-slate-950 hover:opacity-90 transition-opacity"
				>
					Retry
				</button>
			</div>
		{:else if artifactsList.length === 0}
			<div class="glass rounded-2xl p-12 text-center">
				<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
					<File class="w-10 h-10 text-slate-500" />
				</div>
				<h2 class="text-2xl font-semibold mb-2">No Artifacts Yet</h2>
				<p class="text-slate-400 max-w-md mx-auto">
					Artifacts will appear here once your agents generate files, reports, or other outputs.
				</p>
			</div>
		{:else}
			<div class="grid gap-4">
				{#each artifactsList as artifact}
					{@const IconComponent = getFileIcon(artifact.type, artifact.mimeType)}
					<button
						onclick={() => selectArtifact(artifact)}
						class="glass rounded-xl p-5 text-left hover:border-cyan-500/30 transition-all duration-300 group w-full"
					>
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
								<IconComponent class="w-6 h-6 text-cyan-400" />
							</div>
							<div class="flex-1 min-w-0">
								<h3 class="font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
									{artifact.name}
								</h3>
								<div class="flex items-center gap-4 mt-1 text-sm text-slate-500">
									<span class="flex items-center gap-1">
										<Hash class="w-3 h-3" />
										{artifact.type}
									</span>
									<span class="flex items-center gap-1">
										<Calendar class="w-3 h-3" />
										{formatDate(artifact.createdAt)}
									</span>
									{#if artifact.size}
										<span>{formatSize(artifact.size)}</span>
									{/if}
								</div>
							</div>
							<div class="text-slate-600 group-hover:text-cyan-400 transition-colors">
								<ChevronLeft class="w-5 h-5 rotate-180" />
							</div>
						</div>
					</button>
				{/each}
			</div>
		{/if}
	</main>

	<!-- Content Viewer Modal -->
	{#if selectedArtifact}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<!-- Backdrop -->
			<button
				class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
				onclick={closeViewer}
				aria-label="Close viewer"
			></button>
			
			<!-- Modal -->
			<div class="relative w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col glow-cyan">
				<!-- Modal Header -->
				<div class="flex items-center justify-between p-4 border-b border-slate-800">
					<div class="flex items-center gap-3">
						{#if selectedArtifact}
							{@const IconComponent = getFileIcon(selectedArtifact.type, selectedArtifact.mimeType)}
							<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
								<IconComponent class="w-5 h-5 text-cyan-400" />
							</div>
							<div>
								<h2 class="font-semibold text-white">{selectedArtifact.name}</h2>
								<p class="text-sm text-slate-500">{selectedArtifact.type} • {formatDate(selectedArtifact.createdAt)}</p>
							</div>
						{/if}
					</div>
					<button
						onclick={closeViewer}
						class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
					>
						<X class="w-5 h-5" />
					</button>
				</div>
				
				<!-- Modal Content -->
				<div class="flex-1 overflow-auto p-6 bg-slate-900/50">
					{#if loadingContent}
						<div class="flex items-center justify-center py-12">
							<Loader2 class="w-8 h-8 text-cyan-400 animate-spin" />
						</div>
					{:else if artifactContent}
						<div class="prose prose-invert prose-cyan max-w-none">
							<MarkdownRenderer source={artifactContent} />
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
