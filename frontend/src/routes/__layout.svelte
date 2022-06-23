<script>
  import "../app.css";
  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
</script>
<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed|Source+Sans+Pro:300,400,700,900&display=swap" rel="stylesheet">
</svelte:head>
<Header />
  <div class="container">
    <slot />
  </div>
<Footer />
  