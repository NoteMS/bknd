let fileInput = document.getElementById('myfile');
let fileList = document.getElementById('fileList');
let filterSelect = document.getElementById('filter');

function uploadFile() {
    let selectedFile = fileInput.files[0];
    if (selectedFile) {
        let listItem = document.createElement('li');
        listItem.textContent = selectedFile.name;
        fileList.appendChild(listItem);
    }
}

function filterFiles() {
    let selectedFileType = filterSelect.value;
    let fileItems = fileList.getElementsByTagName('li');

    for (const item of fileItems) {
        if (selectedFileType === 'all') {
            item.style.display = 'block';
        } else {
            const fileType = item.textContent.split('.').pop().toLowerCase();
            if (fileType === selectedFileType) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    }
}

fileInput.addEventListener('change', uploadFile);

filterSelect.addEventListener('change', filterFiles);
