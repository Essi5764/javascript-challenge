// from data.js
var tableData = data;

// YOUR CODE HERE!
//column for date/time, city, state, country, shape, and comment at the very least.


// Referencing the table 
var tbody = d3.select("tbody");

// Looping through the UFO data
tableData.forEach((ufo) => {

	// Use d3 to append one table row `tr` for each ufo object
	var row = tbody.append("tr");

	// Use `Object.entries` and forEach to iterate through keys and values
	Object.entries(ufo).forEach(([key, value]) => {

		// Use d3 to append one cell per ufo object value (date, city, state, country, shape, duration, and comments)  
		var cell = row.append("td");
		cell.text(value);
	});
});

// Using D3 to filter, select and fill the blanks

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Handling the execution of the click and submit 
button.on("click", runEnter);
form.on("submit", runEnter);

// Assign a function for the form
function runEnter() {

  // Freeze the page
  d3.event.preventDefault();

  // Select the input element 
  var inputElement = d3.select(".form-control");

  // Get the value of the input element
  var inputValue = inputElement.property("value");

  // Filter the data by datetime
	var results = tableData.filter(ufo => ufo.datetime === inputValue);
	
	// Resetting the table
	tbody.html("");

	// Matching results vs Non-Matching 
	if (results.length === 0) {
		tbody.text(`No ufo sightings on ${inputValue}.`);
	}

	
	else {
		results.forEach((ufo) => {
			var row = tbody.append("tr");
			Object.entries(ufo).forEach(([key, value]) => {
				var cell = row.append("td");
				cell.text(value);
			});
		});
	};
};