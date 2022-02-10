<template>
  <b-card title="Home">
    {{ 'you_are_logged_in' }}
  </b-card>
</template>

<script>
export default {
  name: 'HomePage',
  middleware: 'auth',

  head() {
    return { title: 'Home' }
  },
}
</script>
