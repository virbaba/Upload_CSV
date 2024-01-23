document.getElementById('uploadBtn').addEventListener('click', async function(e) {
    // stoping the default behaviour of upload button
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('csvFile');
    formData.append('csvFile', fileInput.files[0]);

    try {
        const response = await fetch('/upload/file', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        const fileListElement = document.getElementById('fileList');
        fileListElement.innerHTML = ''; // Clear existing list

        data.files.forEach(file => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            fileListElement.appendChild(listItem);
        });

        console.log(data.message); // Log the message from the server

    } catch (error) {
        console.error('Error uploading file:', error);
    }
});