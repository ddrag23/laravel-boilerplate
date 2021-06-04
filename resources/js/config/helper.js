export function rmValidation(key) {
    let pesan = $('#' + key)
    let text = $('.' + key)
    text.removeClass('invalid-feedback')
    pesan.removeClass('is-invalid')
    text.text(null)
}
export function addValidation(el,value) {
    const pesan = document.getElementById(el)
    const text = document.querySelector(`.${el}`)
    pesan.classList.add('is-invalid')
    text.classList.add('invalid-feedback')
    text.textContent = value
}
export function onEvent(event,cb) {
    if (Array.isArray(callback)) {
        for (let i of callback) {
            document.addEventListener(event, i)
        }
    }
    document.addEventListener(event, cb)
}

export function dateFormat() {
    const date = new Date(dateParams)
    const monthFormat = (month) => {
        let resultMont = ''
        switch (month) {
            case 0:
                resultMont = 'Januari'
                break
            case 1:
                resultMont = 'Februari'
                break
            case 2:
                resultMont = 'Maret'
                break
            case 3:
                resultMont = 'April'
                break
            case 4:
                resultMont = 'Mei'
                break
            case 5:
                resultMont = 'Juni'
                break
            case 6:
                resultMont = 'Juli'
                break
            case 7:
                resultMont = 'Agustus'
                break
            case 8:
                resultMont = 'September'
                break
            case 9:
                resultMont = 'Oktober'
                break
            case 10:
                resultMont = 'November'
                break
            case 11:
                resultMont = 'Desember'
                break
            default:
                resultMont = 'Bulan tidak ada'
                break
        }
        return resultMont
    }
    const format =
        date.getDate() +
        ' ' +
        monthFormat(date.getMonth()) +
        ' ' +
        date.getFullYear()
    return format
}

export function onAlert(icon,message) {
    swal({
        title: 'Pesan!',
        icon: icon,
        text: message
    })
}

export function formatToIdr(nominal) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(nominal)
}