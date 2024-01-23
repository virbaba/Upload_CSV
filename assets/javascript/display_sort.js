document.addEventListener('DOMContentLoaded', function() {
    function getCellValue(row, index) {
      if (row && row.children[index]) {
        return row.children[index].textContent || row.children[index].innerText;
      }
      return ""; // Return an empty string or handle the absence of the element as needed.
    }

    // sorting the table according to each column data
    function sortTable(columnIndex, ascending) {
        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
            // fetching the value of cell
            const str1 = getCellValue(a, columnIndex);
            const str2 = getCellValue(b, columnIndex);

            if (!isNaN(str1) && !isNaN(str2)) {
                return (Number(str1) - Number(str2)) * (ascending ? 1 : -1);
            }
            // this function compare the string behave on which character come first into dictionary order into the string
            // if ascending is true then do it in ascending order other wise descending order
            return str1.localeCompare(str2) * (ascending ? 1 : -1);
        });

        rows.forEach(row => tbody.appendChild(row));
    }

    const ascDescIcons = document.querySelectorAll(".asc-icon, .desc-icon");

    ascDescIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const columnIndex = this.getAttribute("data-index");
        const isAscending = this.classList.contains("asc-icon");
        sortTable(columnIndex, isAscending);
      });
    });
});