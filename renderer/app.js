

let showModal = document.getElementById('show-modal');
let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('modal');
let url = document.getElementById('url');

let addItem = document.getElementById('add-item');


// LOGIC TO SHOW AND HIDE MODAL
showModal.addEventListener('click', (e) => {
    modal.style.display = 'flex';
    url.focus();
});

closeModal.addEventListener('click', (e) => {
    modal.style.display = 'none';
});


addItem.addEventListener('click', (e) => {
    if (url.value){
        console.log(url.value);
        url.value = '';
    }
});

url.addEventListener('keyup', (e) => {
    if (e.key === 'Enter'){
        addItem.click();
    }
})

