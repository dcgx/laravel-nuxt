<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card title="Login">
        <form @submit.prevent="login">
          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ 'Email' }}</label>
            <div class="col-md-7">
              <input v-model="form.email" type="email" name="email" class="form-control" />
            </div>
          </div>

          <!-- Password -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">{{ 'Password' }}</label>
            <div class="col-md-7">
              <input v-model="form.password" type="password" name="password" class="form-control" />
            </div>
          </div>

          <!-- Remember Me -->
          <div class="form-group row">
            <div class="col-md-3" />
            <div class="col-md-7 d-flex">
              <b-checkbox v-model="remember" name="remember">
                {{ 'Remember me' }}
              </b-checkbox>

              <router-link :to="{ name: 'password.request' }" class="small ml-auto my-auto">
                {{ 'Forgot password' }}
              </router-link>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <!-- Submit Button -->
              <b-button :loading="form.busy"> Login </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLoginPage',
  middleware: 'guest',
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    remember: false,
  }),

  head() {
    return { title: 'Login' }
  },

  methods: {
    async login() {
      let data
      this.form.device = 'device'
      // Submit the form.
      try {
        const response = await this.$api.post('/login', this.form)
        data = response.data
      } catch (e) {
        return
      }

      // Save the token.
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember,
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser')

      // Redirect home.
      this.$router.push({ name: 'home' })
    },
  },
}
</script>
