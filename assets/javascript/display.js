// in this we handling the event of input text box 
function search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('dataTable');
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]; // Adjust index for the column  to search
        if (td) {
            txtValue = td.textContent || td.innerText;
            // if data is found according to typed text it will set tr display via default display = '' otherwise none
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

// fire the event to filter the data according character
document.getElementById('searchInput').addEventListener('input', search);
 
// fire the event when press backspace to filter data according to remaining data
document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Backspace') {
        search();
    }
});


