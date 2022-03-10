<template>
  <div class="row">
    <div class="col-lg-8 m-auto">
      <b-card :title="'Verify email'">
        <form @submit.prevent="send">
          <alert-success :form="form" :message="status" />

          <!-- Email -->
          <div class="form-group row">
            <label class="col-md-3 col-form-label text-md-right">Email</label>
            <div class="col-md-7">
              <input v-model="form.email" class="form-control" type="email" name="email" />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-group row">
            <div class="col-md-9 ml-md-auto">
              <b-button :loading="form.busy"> Send verification link </b-button>
            </div>
          </div>
        </form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResendPage',
  middleware: 'guest',

  metaInfo() {
    return { title: 'Verify email' }
  },

  data: () => ({
    status: '',
    form: {
      email: '',
    },
  }),

  created() {
    if (this.$route.query.email) {
      this.form.email = this.$route.query.email
    }
  },

  methods: {
    send() {
      this.$api.post('/email/resend', this.form).then(({ data }) => {
        this.status = data.status
        // this.form.reset()
      })
    },
  },
}
</script>
