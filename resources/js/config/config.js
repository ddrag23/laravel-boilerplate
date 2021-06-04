export const mode = 'dev'
export const csrf = { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
export const base_url = mode === 'dev' ? 'http://localhost/' : 'http://domain'