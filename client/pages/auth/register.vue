<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card v-if="mustVerifyEmail" :title="'Register'">
        <div class="alert alert-success" role="alert">
          {{ 'Verify email address' }}
        </div>
      </b-card>
      <b-card v-else :title="'Register'">
        <form @submit.prevent="register">
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

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <b-button :loading="form.busy"> Register </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthRegisterPage',
  middleware: 'guest',

  data: () => ({
    form: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    mustVerifyEmail: false,
  }),

  head() {
    return { title: 'Register' }
  },

  methods: {
    async register() {
      let data

      // Register the user.
      try {
        const response = await this.$api.post('/register', this.form)
        data = response.data
      } catch (e) {
        return
      }

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true
      } else {
        // Log in the user.
        const {
          data: { token },
        } = await this.$api.post('/login', this.form)

        // Save the token.
        this.$store.dispatch('auth/saveToken', { token })

        // Update the user.
        await this.$store.dispatch('auth/updateUser', { user: data })

        // Redirect home.
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
