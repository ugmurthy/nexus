<script lang="ts">
  import { Mail, Zap, ArrowLeft, CheckCircle } from "lucide-svelte";
  import { auth } from "$lib/api/client";

  let email = $state("");
  let isSubmitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = null;
    isSubmitting = true;

    try {
      await auth.forgotPassword({
        tenantSlug: "freemium",
        body: { email },
      });
      success = true;
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : "Failed to send reset email";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Forgot Password — NEXUS AI</title>
  <meta name="description" content="Reset your NEXUS AI password" />
</svelte:head>

<div
  class="min-h-screen bg-slate-950 font-display text-white overflow-x-hidden flex items-center justify-center"
>
  <!-- Animated Background -->
  <div class="fixed inset-0 z-0">
    <div
      class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    ></div>
    <div class="absolute inset-0 grid-bg animate-grid-flow opacity-50"></div>
    <div
      class="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full animate-pulse-glow"
    ></div>
    <div
      class="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/20 rounded-full animate-pulse-glow delay-200"
    ></div>
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"
    ></div>
  </div>

  <!-- Forgot Password Card -->
  <div class="relative z-10 w-full max-w-md mx-4 animate-slide-up">
    <!-- Logo -->
    <a href="/" class="flex items-center justify-center gap-3 mb-8 group">
      <div class="relative w-12 h-12 flex items-center justify-center">
        <div
          class="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"
        ></div>
        <Zap class="relative w-6 h-6 text-slate-950" />
      </div>
      <span class="text-2xl font-bold tracking-tight">
        <span class="text-gradient">NEXUS</span>
        <span class="text-slate-400 font-light ml-1">AI</span>
      </span>
    </a>

    <!-- Card -->
    <div class="glass rounded-3xl p-8 glow-cyan">
      {#if success}
        <!-- Success State -->
        <div class="text-center">
          <div
            class="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle class="w-8 h-8 text-green-400" />
          </div>
          <h1 class="text-2xl font-bold mb-2">Check your email</h1>
          <p class="text-slate-400 text-sm mb-6">
            We've sent a password reset link to <span class="text-white"
              >{email}</span
            >. Please check your inbox and follow the instructions.
          </p>
          <a
            href="/signin"
            class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Sign In
          </a>
        </div>
      {:else}
        <!-- Form State -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold mb-2">Forgot password?</h1>
          <p class="text-slate-400 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onsubmit={handleSubmit} class="space-y-5">
          {#if error}
            <div
              class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400"
            >
              {error}
            </div>
          {/if}

          <!-- Email Field -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-slate-300 mb-2">Email</label
            >
            <div class="relative">
              <Mail
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              />
              <input
                type="email"
                id="email"
                bind:value={email}
                required
                class="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            disabled={isSubmitting}
            class="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-950 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {#if isSubmitting}
              <div
                class="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"
              ></div>
              Sending...
            {:else}
              Send Reset Link
            {/if}
          </button>
        </form>

        <!-- Back to Sign In -->
        <div class="text-center mt-8">
          <a
            href="/signin"
            class="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            Back to Sign In
          </a>
        </div>
      {/if}
    </div>

    <!-- Footer -->
    <div class="text-center mt-8 text-sm text-slate-600">
      © 2025 NEXUS AI. All rights reserved.
    </div>
  </div>
</div>
