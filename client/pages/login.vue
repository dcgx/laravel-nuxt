<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card>
        <form @submit.prevent="login">
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

          <!-- Remember Me -->
          <div class="form-group row">
            <div class="col-md-3" />
            <div class="col-md-7 d-flex">
              <b-form-checkbox v-model="remember" name="remember">
                Remember me
              </b-form-checkbox>

              <router-link
                :to="{ name: 'password.request' }"
                class="small ml-auto my-auto"
              >
                Olvide contraseña
              </router-link>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-7 offset-md-3 d-flex">
              <b-button type="submit" :loading="submitting"> Login </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  middleware: 'guest',
  data: () => ({
    submitting: false,
    form: {
      email: '',
      password: '',
      device: 'device',
    },
    remember: false,
  }),
  head() {
    return { title: 'Login Title' }
  },
  methods: {
    async login() {
      this.submitting = true

      const { data } = await this.$api.post('/login', this.form)

      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: this.remember,
      })

      await this.$store.dispatch('auth/fetchUser')
      this.submitting = false

      this.$router.push({ name: 'home' })
    },
  },
}
</script>