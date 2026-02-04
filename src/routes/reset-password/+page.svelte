<script lang="ts">
  import { Lock, Eye, EyeOff, Zap, CheckCircle } from "lucide-svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { auth } from "$lib/api/client";

  let password = $state("");
  let confirmPassword = $state("");
  let showPassword = $state(false);
  let showConfirmPassword = $state(false);
  let isSubmitting = $state(false);
  let error = $state<string | null>(null);
  let success = $state(false);

  let token = $derived($page.url.searchParams.get("token") ?? "");

  async function handleSubmit(e: Event) {
    e.preventDefault();
    error = null;

    if (password !== confirmPassword) {
      error = "Passwords do not match";
      return;
    }

    if (password.length < 8) {
      error = "Password must be at least 8 characters";
      return;
    }

    if (!token) {
      error = "Invalid or missing reset token";
      return;
    }

    isSubmitting = true;

    try {
      await auth.resetPassword({
        body: { token, password },
      });
      success = true;
    } catch (err: unknown) {
      error = err instanceof Error ? err.message : "Failed to reset password";
    } finally {
      isSubmitting = false;
    }
  }

  function redirectToSignIn() {
    goto("/signin");
  }
</script>

<svelte:head>
  <title>Reset Password — NEXUS AI</title>
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

  <!-- Reset Password Card -->
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
          <h1 class="text-2xl font-bold mb-2">Password reset successful</h1>
          <p class="text-slate-400 text-sm mb-6">
            Your password has been reset. You can now sign in with your new
            password.
          </p>
          <button
            onclick={redirectToSignIn}
            class="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-950 hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      {:else if !token}
        <!-- No Token State -->
        <div class="text-center">
          <div
            class="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
          >
            <Lock class="w-8 h-8 text-red-400" />
          </div>
          <h1 class="text-2xl font-bold mb-2">Invalid reset link</h1>
          <p class="text-slate-400 text-sm mb-6">
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <a
            href="/forgot-password"
            class="inline-block w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-950 hover:opacity-90 transition-opacity text-center"
          >
            Request New Link
          </a>
        </div>
      {:else}
        <!-- Form State -->
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold mb-2">Reset your password</h1>
          <p class="text-slate-400 text-sm">Enter your new password below.</p>
        </div>

        <form onsubmit={handleSubmit} class="space-y-5">
          {#if error}
            <div
              class="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400"
            >
              {error}
            </div>
          {/if}

          <!-- New Password Field -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-slate-300 mb-2"
              >New Password</label
            >
            <div class="relative">
              <Lock
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                bind:value={password}
                required
                minlength="8"
                class="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onclick={() => (showPassword = !showPassword)}
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {#if showPassword}
                  <EyeOff class="w-5 h-5" />
                {:else}
                  <Eye class="w-5 h-5" />
                {/if}
              </button>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-slate-300 mb-2"
              >Confirm Password</label
            >
            <div class="relative">
              <Lock
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                bind:value={confirmPassword}
                required
                minlength="8"
                class="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onclick={() => (showConfirmPassword = !showConfirmPassword)}
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {#if showConfirmPassword}
                  <EyeOff class="w-5 h-5" />
                {:else}
                  <Eye class="w-5 h-5" />
                {/if}
              </button>
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
              Resetting...
            {:else}
              Reset Password
            {/if}
          </button>
        </form>
      {/if}
    </div>

    <!-- Footer -->
    <div class="text-center mt-8 text-sm text-slate-600">
      © 2025 NEXUS AI. All rights reserved.
    </div>
  </div>
</div>
