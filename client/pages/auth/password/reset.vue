<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card :title="'Reset password'">
        <form @submit.prevent="reset">
          <alert-success :form="form" :message="status" />

          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Email</label>
            <div class="col-md-7">
              <input v-model="form.email" type="email" name="email" class="form-control" readonly />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Password</label>
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
              <b-button :loading="form.busy"> Reset password </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordResetEmail',
  middleware: 'guest',

  data: () => ({
    status: '',
    form: {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  }),

  head() {
    return { title: 'Reset password' }
  },

  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },

  methods: {
    reset() {
      this.$api.post('/password/reset', this.form).then(({ data }) => {
        this.status = data.status
        // this.form.reset()
      })
    },
  },
}
</script>
