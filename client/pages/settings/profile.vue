<template>
  <b-card :title="'Your info'">
    <form @submit.prevent="update">
      <alert-success :form="form" :message="'Info update'" />

      <!-- Name -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">Name</label>
        <div class="col-md-7">
          <input v-model="form.name" type="text" name="name" class="form-control" />
        </div>
      </div>

      <!-- Email -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">Email</label>
        <div class="col-md-7">
          <input v-model="form.email" type="email" name="email" class="form-control" />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-group row">
        <div class="col-md-9 ml-md-auto">
          <b-button :loading="form.busy" type="success"> Update </b-button>
        </div>
      </div>
    </form>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfilePage',
  scrollToTop: false,

  data: () => ({
    form: {
      name: '',
      email: '',
    },
  }),

  head() {
    return { title: 'Settings' }
  },

  computed: mapGetters({
    user: 'auth/user',
  }),

  created() {
    // Fill the form with user data.
    // this.form.keys().forEach((key) => {
    //   this.form[key] = this.user[key]
    // })
  },

  methods: {
    update() {
      this.$api.patch('/settings/profile', this.form).then(({ data: user }) => {
        this.$store.dispatch('auth/updateUser', { user })
      })
    },
  },
}
</script>
