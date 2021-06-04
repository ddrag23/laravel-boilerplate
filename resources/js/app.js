import Router from './config/Router'

const currentUrl = window.location.href
const run = (callback) => window.addEventListener('DOMContentLoaded', callback)
for (const key of Router) {
    if (currentUrl === key.urlPage) {
        run(key.init)
    }
}
