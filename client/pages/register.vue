<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card v-if="mustVerifyEmail">
        <div class="alert alert-success" role="alert">Verify email address</div>
      </b-card>
      <b-card v-else>
        <form @submit.prevent="register">
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Name</label>
            <div class="col-md-7">
              <input
                v-model="form.name"
                type="text"
                name="name"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Email</label>
            <div class="col-md-7">
              <input
                v-model="form.email"
                type="email"
                name="email"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right"
              >Password</label
            >
            <div class="col-md-7">
              <input
                v-model="form.password"
                type="password"
                name="password"
                class="form-control"
              />
            </div>
          </div>

          <!-- Password Confirmation -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right"
              >Confirm password</label
            >
            <div class="col-md-7">
              <input
                v-model="form.password_confirmation"
                type="password"
                name="password_confirmation"
                class="form-control"
              />
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <b-button type="submit" :loading="submitting">
                Register
              </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  middleware: 'guest',
  data: () => ({
    submitting: false,
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      device: '',
    },
    mustVerifyEmail: false,
  }),
  head() {
    return { title: 'Register' }
  },
  methods: {
    async register() {
      this.submitting = true
      const { data } = await this.$api.post('/register', this.form)

      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const {
          data: { token },
        } = await this.$api.post('/login', this.form)

        this.$store.dispatch('auth/saveToken', { token })

        await this.$store.dispatch('auth/updateUser', { user: data })

        this.$router.push({ name: 'home' })
      }
      this.submitting = false
    },
  },
}
</script>