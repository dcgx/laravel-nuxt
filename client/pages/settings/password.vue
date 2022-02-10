<template>
  <b-card :title="'Your password'">
    <form @submit.prevent="update">
      <alert-success :form="form" message="Password update" />

      <!-- Password -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">New password</label>
        <div class="col-md-7">
          <input v-model="form.password" type="password" name="password" class="form-control" />
        </div>
      </div>

      <!-- Password Confirmation -->
      <div class="form-group row">
        <label class="col-md-3 col-form-label text-md-right">Confirm password</label>
        <div class="col-md-7">
          <input v-model="form.password_confirmation" type="password" name="password_confirmation" class="form-control" />
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
export default {
  name: 'PasswordPage',
  scrollToTop: false,

  data: () => ({
    form: {
      password: '',
      password_confirmation: '',
    },
  }),

  head() {
    return { title: 'Settings' }
  },

  methods: {
    update() {
      this.$api.patch('/settings/password', this.form).then(() => {
        // this.form.reset()
      })
    },
  },
}
</script>
