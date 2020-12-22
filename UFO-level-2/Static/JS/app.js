// from data.js
var tableData = data;

// LEVEL 2: MULTIPLE SEARCH CATEGORIES

// Referencing the table 
var tbody = d3.select("tbody");

// Adding the table to the page
tableData.forEach((ufo) => {
	var row = tbody.append("tr");
	Object.entries(ufo).forEach(([key, value]) => {
		var cell = row.append("td");
		cell.text(value);
	})
})

// Create arrays to put countries, states, and shapes in alphabetic order
var uniqueCountry = [... new Set(tableData.map(ufo => ufo.country))].sort();
console.log(uniqueCountry);

var uniqueState = [... new Set(tableData.map(ufo => ufo.state))].sort();
console.log(uniqueState);

var uniqueShape = [... new Set(tableData.map(ufo => ufo.shape))].sort();
console.log(uniqueShape);

// Add countries, states and shapes to a dropdown menu
uniqueCountry.forEach((country) => {
	d3.select("#country").append("option").text(country);
})

uniqueState.forEach((state) => {
	d3.select("#state").append("option").text(state);
})

uniqueShape.forEach((shape) => {
	d3.select("#shape").append("option").text(shape);
})

// Select and Create event handlers for the form's inputs and dropdown selections
d3.selectAll(".form-control").on("change", updateFilters);

// Select and Create event handlers for the button Clear Filter
d3.select("#filter-btn").on("click", clear);

// Create filter object to keep track of all filters
var multifilters = {};

// Create a function to dynamically add a filter value each time user add any filter
function updateFilters() {

  // Store previously selected element
	
  var inputElement = d3.select(this);
  var filterId = inputElement.attr("id");
  var inputValue = inputElement.property("value").toLowerCase();

  // per filter value entered, add that filterId and value
 
  if (inputValue) {
	  multifilters[filterId] = inputValue;
  }
  else {
    delete multifilters[filterId];
  }

  // Use a function to apply all filters
  filterTable();
}

function filterTable() {

  // Freeze the page
  d3.event.preventDefault();

	// Use the form's inputs and dropdown information to fill in 
	var results = tableData.filter(function(ufo) {
		for (var key in multifilters) {
			if (multifilters[key] === undefined || ufo[key] != multifilters[key])
				return false;
		}
		return true;
	})
	
	// Resetting the table
	tbody.html("");

	// Storing the information that does not match the result
	if (results.length === 0) {
		tbody.text(`No ufo sightings found.`);
	}
	else {
		results.forEach((ufo) => {
			var row = tbody.append("tr");
			Object.entries(ufo).forEach(([key, value]) => {
				var cell = row.append("td");
				cell.text(value);
			})
		})
	}
}

function clear() {
	multifilters = {};
	document.getElementById("filter-form").reset();
	filterTable();
}