document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = 'none';

    let selectedColumns = [];

    // Function to get the cell value of a specific column
    function getCellValue(row, index) {
      if (row && row.children[index]) {
        return row.children[index].textContent || row.children[index].innerText;
      }
      return ""; // Return an empty string or handle the absence of the element as needed.
    }

    // Function to fetch column data
    function fetchColumnData(index) {
        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const columnData = rows.map(row => getCellValue(row, index));
        return columnData;
    }

    // Function to sort column data
    function sortColumnData(columnData, ascending) {
        return columnData.sort((a, b) => {
            if (!isNaN(a) && !isNaN(b)) {
                return (Number(a) - Number(b)) * (ascending ? 1 : -1);
            }
            return a.localeCompare(b) * (ascending ? 1 : -1);
        });
    }

   
    const createChartButton = document.getElementById('createChartButton');
    const controlsContainer = document.getElementById('controlsContainer');

    createChartButton.addEventListener('click', function() {
        controlsContainer.style.display = 'block';
        populateColumnSelect();
    });

    // Function to populate the column select dropdown
    function populateColumnSelect() {
        const headerCells = document.querySelectorAll('thead th');
        const columnSelect = document.getElementById('columnList');
        columnSelect.innerHTML = '';
        headerCells.forEach((cell, index) => {
            const columnName = cell.textContent.trim();
            const option = document.createElement('option');
            option.value = index;
            option.textContent = columnName;
            columnSelect.appendChild(option);
        });
    }

    // Function to generate the bar chart using D3.js
    function generateBarChart(selectedColumn) {
        const columnData = fetchColumnData(selectedColumn);
        const chart = document.getElementById('chart');
        chart.style.display = 'block';

        const numBars = columnData.length;
        const barWidth = 40;
        const padding = 40;

        // find the height of screen to display the chart within screen not outside the screen
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // set the width of chart container
        const chartWidth = Math.min(numBars * (barWidth + padding), screenWidth - 40);
        const chartHeight = Math.min(screenHeight - 100, d3.max(columnData, d => +d) + 50);

        chart.style.height = chartHeight + 20;
        chart.style.width = chartWidth+20;

        const svg = d3.select("#chartContainer")
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight);
        // set x axis
        const xScale = d3.scaleBand()
            .domain(columnData.map((d, i) => i))
            .range([padding, chartWidth - padding])
            .padding(0.1);

            // y axis
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(columnData, d => +d) * 1.2])
            .range([chartHeight - padding, padding]);

        svg.selectAll("rect")
            .data(columnData)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(i))
            .attr("y", d => yScale(+d))
            .attr("width", xScale.bandwidth())
            .attr("height", d => chartHeight - padding - yScale(+d))
            .attr("fill", "steelblue");
        // break the mile stone if the bar height value is high
        svg.append("g")
            .attr("transform", "translate(0," + (chartHeight - padding) + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", "translate(" + padding + ",0)")
            .call(d3.axisLeft(yScale));
    }

    const chartButton = document.getElementById('createChart');
    const controlsCont = document.getElementById('controlsContainer');

    chartButton.addEventListener('click', function() {
        chartContainer.style.display = 'block'
        controlsCont.style.display = 'none';

        // Get the selected columns
        selectedColumns = Array.from(document.querySelectorAll('#columnList option:checked')).map(option => option.value);

        // Clear the chart container
        clearChartContainer();

        // Generate bar charts for selected columns
        selectedColumns.forEach(selectedColumn => {
            generateBarChart(selectedColumn);
        });
    });

    // Function to clear the chart container
    function clearChartContainer() {
        chartContainer.innerHTML = '';
    }

    // Function to hide the chart container
    function hideChartContainer() {
        chartContainer.style.display = 'none';
        const chart = document.getElementById('chart');
        chart.style.display = 'none';

    }

    // Button to hide the chart container
    const hideButton = document.getElementById('hide');
    hideButton.addEventListener('click', hideChartContainer);

});
