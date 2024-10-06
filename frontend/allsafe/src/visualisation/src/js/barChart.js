// Create bar chart
export function createBarChart(data, containerId) {
    console.log("Filtered data passed to Bar Chart:", data);  // Log the filtered data

    // Check if data is empty after filtering
    if (data.length === 0) {
        console.log("No data available for the selected year");
        d3.select(`#${containerId}`).append("text")
            .attr("x", 100)
            .attr("y", 100)
            .text("No data available for the selected year")
            .style("font-size", "16px")
            .style("color", "red");
        return;
    }

    // Set up container and dimensions of the graph
    const container = document.getElementById(containerId);
    
    function getDimensions() {
        const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
        return {
            width: containerWidth,
            height: containerHeight > 400 ? containerHeight : 400 // Minimum height
        };
    }

    // Get dimension
    let { width, height } = getDimensions();

    // Set up margin
    const margin = { top: 30, right: 50, bottom: 150, left: 80 }

    // Flatten data by year and category_level2
    function flattenData(data) {
        const grouped = d3.group(data, d => d.category_level2, d => d.category_level3);
        const flattened = [];

        for (const [level2, level3Map] of grouped) {
            // Calculate total amount and report number
            let totalAmountForLevel2 = 0;
            let totalReportNumber = 0;
            const level3Data = [];

            // Iterate for calculation
            for (const [level3, values] of level3Map) {
                const amount = d3.sum(values, d => d.amount);
                totalAmountForLevel2 += amount;
                const report = d3.sum(values, d => d.no_of_reports);
                totalReportNumber += report;
                level3Data.push({ category_level3: level3, amount });
            }

            // Push the data to the list
            flattened.push({
                category_level2: level2,
                totalAmount: totalAmountForLevel2,
                totalReport: totalReportNumber,
                level3Data
            });
        }

        // Sort data by total report number for color mapping wiht sunburst
        const sortedData = flattened.filter((d) => d.category_level2 !== "Other") 
                                    .sort((a, b) => b.totalReport - a.totalReport);

        // Return data with choosing top 5 scams
        return sortedData.slice(0, 5);
    }

    // Get data
    const allYearData = flattenData(data);
    console.log("Flattened data for Bar Chart:", allYearData);  // Log the data

    // Set x scale
    const x = d3.scaleBand()
        .domain(allYearData.map(d => d.category_level2))
        .range([margin.left, width - margin.right]) 
        .padding(0.2);

    // Set x scale
    const y = d3.scaleLinear()
                .domain([0, d3.max(allYearData, d => d.totalAmount)])
                .nice()
                .range([height - margin.bottom, margin.top]); 

    // Get scam types
    const scamTypes = allYearData.map(d => d.category_level2);
    // console.log(scamTypes);

    // Set color scale
    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, scamTypes.length + 1));

    // Create SVG
    const svg = d3.select(`#${containerId}`).append("svg")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("viewBox", `0 0 ${width} ${height}`);

    // Create x-axis
    const xAxisGroup = svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));
    
    // Adjust x-axis texts
    xAxisGroup.selectAll("text")
        .style("font-size", "14px")
        .attr("transform", "rotate(-18)")
        .attr("text-anchor", "end") 
        .attr("dx", "-0.5em") 
        .attr("dy", "0.5em"); 

    // Add x-axis label
    const xAxisLabel = xAxisGroup.append("text")
        .attr("class", "axis-label")
        .attr("x", width - margin.right)
        .attr("y", 35) 
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Scam Type");


    // Function for update x-label
    function updateXAxisLabel() {
        xAxisLabel.attr("x", width - margin.right) 
                .attr("y", 25);}

    // Create y-axis
    const yAxisGroup = svg.append("g")
                            .attr("transform", `translate(${margin.left},0)`)
                            .call(d3.axisLeft(y));

    // Adjust y-axis texts
    yAxisGroup.selectAll("text")
                .style("font-size", "14px");

    // Add y-axis labels
    yAxisGroup.append("text")
        .attr("x", -margin.left) 
        .attr("y", 15) 
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("↑ Amount (AUD)"); 

    // Create a tooltip
    const tooltip = d3.select("#tooltip-bar")
                        .style("position", "absolute")
                        .style("padding", "12px")
                        .style("text-align", "center")
                        .style("font-size", "16px")
                        .style("border", "1px solid #ddd")
                        .style("border-radius", "3px")
                        .style("transform", "translateX(15px)")
                        .style("box-shadow", "0 0 5px rgba(0,0,0,0.2)");
    
    // Convert to integer
    const formatNumber = new Intl.NumberFormat('en-US', {maximumFractionDigits: 0});

    // Create a variable to store the currently selected bar
    let selectedBar = null;
    

    // Draw bars
    const bars = svg.append("g")
        .attr("transform", `translate(0,0)`)
        .selectAll("rect")
        .data(allYearData)
        .join("rect")
        .attr("x", d => x(d.category_level2))
        .attr("y", d => y(d.totalAmount))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d.totalAmount))
        .attr("fill", d => color(d.category_level2))
        .style("opacity", 0.6)  // Set initial opacity for all bars
        // Set mouse events
        .on("mouseover", function(event, d) {
            if (selectedBar !== this) {  // Only apply hover effect if this bar is not selected
                bars.style("opacity", 0.2);  // Fade all bars
                d3.select(this).style("opacity", 0.95);  // Highlight the hovered bar
            }

            // Show tooltip content
            tooltip.classed("hidden", false)
                .style("visibility", "visible")
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 50}px`)
                .html(`Scam Type: ${d.category_level2}<br>Total Lost: $${formatNumber.format(d.totalAmount)}`);
        })
        .on("mousemove", (event,) => {
            tooltip.style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 50}px`);
        })
        .on("mouseout", function() {
            // Reset hover effect only if no bar is selected
            if (selectedBar === null) {
                bars.style("opacity", 0.7);  // Reset all bars to normal opacity
            } else if (selectedBar !== this) {
                // Keep the selected bar highlighted, and others faded
                bars.style("opacity", 0.2);
                d3.select(selectedBar).style("opacity", 0.95);
            }

            tooltip.classed("hidden", true)
                    .style("visibility", "hidden");
        })
        .on("click", function(event, d) {
            console.log("Clicked bar")
            if (selectedBar === this) {
                console.log("Deseleted bar")
                // Deselect the currently selected bar and reset opacity
                d3.select(this)
                    .style("opacity", 0.7);   // Reset opacity
                
                console.log("Deselecting the same bar, reset it.");
                
                // Clear the selection
                selectedBar = null;
        
                // Dispatch the reset event to the sunburst chart
                console.log('Dispatching resetSunburst event');  // Add this log
                const resetSunburstEvent = new CustomEvent('resetSunburst');
                window.dispatchEvent(resetSunburstEvent);
        
            } else {
                console.log("Selected bar")
                // Existing logic for new bar selection
                if (selectedBar === null) {
                    d3.select(selectedBar)
                        .style("opacity", 0.95);  // Reset opacity
                    console.log("Bar color changed")
                }
        
                // Notify the sunburst chart that a new bar has been clicked
                const barClickEvent = new CustomEvent('barClick', {
                    detail: { level2Id: d.category_level2 }
                });
                window.dispatchEvent(barClickEvent);
            }
        });                   
                            
        
    // Event listener for the click event from the sunburst chart
    window.addEventListener('sunburstClick', function(event) {
        const { level2Id } = event.detail;
        console.log('Bar Chart Received Sunburst Click Event, level2Id:', level2Id);  // Log the received event
    
        // Iterate over each bar to find the one that matches the level2Id
        bars.each(function(d) {
            if (d.category_level2 === level2Id) {
                console.log('Bar to Click:', d);  // Log the matched bar data
    
                // Simulate the bar click behavior
                if (selectedBar === this) {
                    // Deselect the bar
                    bars.style("opacity", 0.7);  // Reset all bars to normal opacity
                    d3.select(this).style("opacity", 0.7);
                    selectedBar = null;
                } else {
                    // Fade all other bars
                    bars.style("opacity", 0.2);
    
                    // Deselect previously selected bar
                    if (selectedBar) {
                        d3.select(selectedBar).style("opacity", 0.2);
                    }
    
                    // Highlight the newly clicked bar
                    d3.select(this)
                        .style("opacity", 0.95);
    
                    selectedBar = this;  // Update the selected bar reference
                }
            }
        });
    });
    
    // Event listener for the reset event from the sunburst chart
    window.addEventListener('resetBarChart', function() {
        console.log('Bar Chart Received Reset Event');  // Log the received event
        
        // Reset all bars to their default state (e.g., remove highlighting)
        bars.style("opacity", 0.7);  // Reset all bars' opacity and color
    
        // Clear the selected bar reference
        selectedBar = null;
    });

    // Update chart on resize
    window.addEventListener("resize", () => {
        const newDimensions = getDimensions();
        svg.attr("viewBox", `0 0 ${newDimensions.width} ${newDimensions.height}`);

        width = newDimensions.width;
        height = newDimensions.height;

        // Update scales
        x.range([margin.left, width - margin.right]).padding(0.2);
        y.range([height - margin.bottom, margin.top]);

        // Update axes
        xAxisGroup.attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSizeOuter(0));
        yAxisGroup.attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y));

        // Update bars
        bars.attr("x", d => x(d.category_level2))
            .attr("y", d => y(d.totalAmount))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d.totalAmount));
            
        updateXAxisLabel();
    });
    
    container.appendChild(svg.node());
}
