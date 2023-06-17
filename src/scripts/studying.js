function changeInput(id, value) {
    let element = document.getElementById(id);
    element.value = value;
}

function showModal() {
    let modal = document.getElementById(`modal`);
    modal.style.opacity = 1;
    modal.style.visibility = 'visible';
}

function closeModal() {
    let modal = document.getElementById('modal');
    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';
}

function edit(){
    let butt = document.getElementById('saveButton');
    console.log(butt);
    butt.style.display = 'block';
    let edit = document.getElementById('editButton');
    edit.style.display = 'none';
    let times = document.querySelectorAll('input');
    for (let time of times) {
        time.disabled = false;
    }
}

function saveChanges(){
    let butt = document.getElementById('saveButton');
    butt.style.display = 'none';
    let edit = document.getElementById('editButton');
    edit.style.display = 'block';
    let times = document.querySelectorAll('input#text');
    console.log(times);
    for (let time of times) {
        time.disabled = true;
    }
}