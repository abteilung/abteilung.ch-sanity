
<script>
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import navigation from '$lib/stores/navigation';

  const progress = tweened(0, {
    duration: 3500,
    easing: cubicOut
  });

  onMount(() => {
    const unsubscribe = navigation.subscribe((state) => {
      if (state === 'loaded') {
        progress.set(1, { duration: 1000 });
      }
    });

    progress.set(0.7);

    return () => {
      unsubscribe()
    }
  });
</script>

<div class="fixed inset-0 h-0.5">
    <div class="h-full bg-green-500 opacity-50 dark:bg-green-200 progress" style={`--width: ${$progress * 100}%`} />
</div>

<style>
  .progress {
    width: var(--width);
  }
</style>
