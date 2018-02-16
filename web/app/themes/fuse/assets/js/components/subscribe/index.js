import wpfetch from '../../helpers/wpfetch'

if (document.profileForm) {
  const $subscriptions = document.querySelector('.subscriptions')
  const $inputs = $subscriptions.getElementsByTagName('input')
  const { email, md5 } = $subscriptions.dataset
  const c = status => +(status !== 404 && !/404|unsubscribe/.test(status))

  Array.from($inputs, el => {
    const list = (() => {
      switch (el.name) {
        case 'weekly': return '7b0cf054a5'
        case 'newsletter': return '9311688004'
      }
    })()

    const endpoint = `lists/${list}/members/${md5}`

    if (localStorage.getItem(el.name)) {
      const status = localStorage.getItem(el.name)
      document.profileForm[el.name].value = c(status)
    } else {
      wpfetch('mailchimp', { endpoint }, ({ status }) => {
        document.profileForm[el.name].value = c(status)
        localStorage.setItem(el.name, status)
      })
    }

    el.addEventListener('click', ({ currentTarget: { value } }) => {
      const subStatus = value ? 'subscribed' : 'unsubscribed'

      wpfetch('mailchimp', { endpoint }, ({ status }) => {
        let obj = {
          endpoint,
          payload: { status: subStatus }
        }

        if (status === 404) {
          obj = {
            endpoint: `lists/${list}/members`,
            payload: {
              email_address: email,
              status: subStatus
            }
          }
        }

        wpfetch('mailchimp', obj, data => {})
      })
    })
  })
}
