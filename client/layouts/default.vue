<template>
  <div class="layout">
    <app-navbar></app-navbar>

    <div class="container mt-4">
      <nuxt />
    </div>
  </div>
</template>

<script>
// import Navbar from '~/components/Navbar'
export default {
  name: 'DefaultLayout',
  //   components: {
  //     Navbar
  //   }
}
</script>