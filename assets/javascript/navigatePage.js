document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('dataTable'); // Get the table element
    const tbody = table.querySelector('tbody'); // Get the table body
    const rows = Array.from(tbody.querySelectorAll('tr')); // Get an array of all table rows

    const itemsPerPage = 10; // Define the number of items per page
    let currentPage = 1; // Initialize the current page

    function showPage(page) {
        const startIdx = (page - 1) * itemsPerPage; // Calculate the starting index for the current page
        const endIdx = startIdx + itemsPerPage; // Calculate the ending index for the current page

        rows.forEach((row, idx) => {
            // Show or hide rows based on the current page
            if (idx >= startIdx && idx < endIdx) {
                row.style.display = '';// apply default display
            } else {
                row.style.display = 'none';
            }
        });
    }

    function updatePaginationButtons() {
        const totalPages = Math.ceil(rows.length / itemsPerPage); // Calculate the total number of pages

        // Enable or disable previous and next buttons based on the current page
        const prevButton = document.getElementById('prev-btn');
        const nextButton = document.getElementById('next-btn');

        prevButton.disabled = (currentPage === 1);
        nextButton.disabled = (currentPage === totalPages);
    }

    // Function to handle previous page button click
    function goToPreviousPage() {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePaginationButtons();
        }
    }

    // Function to handle next page button click
    function goToNextPage() {
        const totalPages = Math.ceil(rows.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePaginationButtons();
        }
    }

    // Attach event listeners to previous and next buttons
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    prevButton.addEventListener('click', goToPreviousPage);
    nextButton.addEventListener('click', goToNextPage);

    // Show the first page initially
    showPage(currentPage);
    updatePaginationButtons();
});
