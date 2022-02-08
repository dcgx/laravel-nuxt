// import Swal from 'sweetalert2'

export default function ({ $axios, store, error: nuxtError }, inject) {
  // Create a custom axios instance
  const api = $axios.create({})

  if (process.server) {
    return
  }

  api.setBaseURL(process.env.apiUrl)

  api.onRequest((config) => {
    const token = store.getters['auth/token']

    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
      // api.setToken(token, 'Bearer')
    }

    const locale = store.getters['lang/locale']

    if (locale) {
      config.headers.common['Accept-Language'] = locale
    }
  })

  api.onResponse((response) => {
    // console.log(response, 'onresponse')
  })

  api.onError((error) => {
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Alert title',
    //   text: 'Texto',
    //   reverseButtons: true,
    //   confirmButtonText: 'Ok',
    //   cancelButtonText: 'Cancelar',
    // })

    nuxtError({
      statusCode: error.response.status,
      message: error.message,
    })
    return Promise.resolve(false)
  })

  inject('api', api)
}
