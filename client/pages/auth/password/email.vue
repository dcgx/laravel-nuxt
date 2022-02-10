<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card :title="'Reset password'">
        <form @submit.prevent="send">
          <alert-success :form="form" :message="status" />

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
              <b-button :loading="form.busy"> Send password reset link </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordEmailPage',
  data: () => ({
    status: '',
    form: {
      email: '',
    },
  }),

  head() {
    return { title: 'Reset password' }
  },

  methods: {
    send() {
      this.$api.post('/password/email', this.form).then(({ data }) => {
        this.status = data.status
        // this.form.reset()
      })
    },
  },
}
</script>
