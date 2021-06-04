import axios from 'axios'
import {elid} from '../config/element'
import {onEvent,onAlert,addValidation,rmValidation} from '../config/helper'
import {base_url} from '../config/config'

const urlPage = `${base_url}/user`
const form = elid('my-form')

function handleDataTable() {
    $('#table').DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        lengtChange: true,
        autoWidth: false,
        ajax: {
            url: `${urlPage}/json-dt`,
        },
        columns: [
            { data: 'DT_RowIndex', name: 'id' },
            { data: 'name', name: 'name' },
            { data: 'username', name: 'username' },
            { data: 'notelp', name: 'notelp' },
            {
                data: 'is_active',
                render: (data) => {
                    switch (data) {
                        case '0':
                            return `<p class="badge badge-danger">Non-Aktif</p>`;
                        case '1':
                            return `<p class="badge badge-success">Aktif</p>`;
                        default:
                            return `<p class="badge badge-info">Menunggu</p>`;
                    }
                },
                name: 'is_active',
            },
            { data: 'action', name: 'action' },
        ],
        order: [[0, 'desc']],
        destroy: true,
    });
}

function showModal(e) {
    if (e.target.id === 'btn-modal') {
        const id = elid('id');
        if (id.value !== '') {
            id.value = '';
        }
        form.reset();
        $('#modal-input').modal({
            backdrop: 'static',
        });
    }
}

function findRow(id) {
    return new Promise((resolve, reject) => {
        try {
            resolve(axios(`${urlPage}/detail/${id}`));
        } catch (error) {
            reject(new Error('Terjadi Kesalahan Server'));
        }
    });
}

async function handleEdit(e) {
    if (e.target.classList.contains('update')) {
        const id = e.target.dataset.id || e.target.parentElement.dataset.id;
        $('#modal-input').modal({
            show: true,
            backdrop: 'static',
        });
        try {
            const res = await findRow(id);
            const data = res.data
            const notAllowed = [
                'created_at',
                'updated_at',
                'email_verified_at',
                'photo',
                'roles',
            ];
            for (const key in data) {
                if (!notAllowed.includes(key)) {
                    elid(key).value = data[key];
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function handleDelete(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.dataset.id || e.target.parentElement.dataset.id;
        const urlDelete = `${urlPage}/delete/${+id}`;
        swal({
            title: 'Apakah Kamu Yakin ?',
            text: 'Setelah dihapus anda tidak dapat memulihkan data ini!',
            icon: 'warning',
            buttons: ['No, cancel!', 'Yes, delete it!'],
        }).then((result) => {
            if (result) {
                axios
                    .delete(urlDelete)
                    .then((res) => {
                        handleDataTable()
                        swal({
                            title: 'Pesan!',
                            text: res.data.message,
                            icon: 'success',
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        onAlert('warning','Data ini tidak boleh dihapus')
                    });
            }
        });
    }
}

async function handleSubmit(e) {
    e.preventDefault();
    let icon = '';
    const formData = new FormData(form);
    try {
        const store = await axios.post(`${urlPage}/save`, formData);
        if (store.data.errors === undefined) {
            for (const key in store.data.success) {
                rmValidation(key);
            }
            icon = 'success';
            $('#modal-input').modal('hide');
            handleDataTable();
            form.reset();
        } else {
            const errors = Object.entries(store.data.errors);
            errors.map(([key, value]) => {
                addValidation(key, value);
            });
            icon = 'error';
        }
        onAlert(icon, store.data.message);
    } catch (error) {
        console.error(error);
    }
}


function init() {
    handleDataTable()
    onEvent('click',[showModal,handleEdit,handleDelete])
    form.addEventListener('submit',handleSubmit)
}
export {init,urlPage}