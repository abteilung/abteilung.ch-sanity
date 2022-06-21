<script lang="ts">
    import type { NormalizedCustomBlock } from 'pote-parse';
    import Prism from 'prismjs';
  
    import 'prismjs/components/prism-javascript.js';
    import 'prismjs/components/prism-markup.js';
    import 'prismjs/components/prism-typescript.js';
    import 'prismjs/components/prism-css.js';
    import 'prismjs/components/prism-markdown.js';
    import 'prismjs/components/prism-python.js';
    import 'prismjs/components/prism-json.js';
  
    import '$lib/prism.css';
    // TODO: Enable these as we need them
    // import 'prismjs/components/prism-bash';
    // import 'prismjs/components/prism-rust';
    // import 'prismjs/components/prims-go';
    // import 'prismjs/components/prism-sql';
    // import 'prismjs/components/prism-wasm';
  
    export let block: NormalizedCustomBlock;
  
    const { code, language, filename } = block.fields as Sanity.Schema.Code;
  </script>
  
  <div class="py-4 text-center sm:py-6">
    <div class="flex flex-col max-w-full text-left sm:inline-flex">
      {#if filename}
        <span class="text-gray-500">
          {filename}
        </span>
      {/if}
  
      <pre class="relative inline-block max-w-full !my-0 overflow-x-auto text-left">
        {#if Prism.languages.hasOwnProperty(language)}
          {@html Prism.highlight(code, Prism.languages[language], language)}
        {:else}
          {code}
        {/if}
      </pre>
  
      <button class="self-end text-sm text-gray-400 no-js-hidden hover:underline active:text-green-600 dark:active:text-green-400" on:click={() => navigator.clipboard.writeText(code)}>
        Copy
      </button>
    </div>
  </div>
  