/**
 * @author Susan Kronberg
 */

const SERVICE_URL =
	"https://webservice.informatik.umu.se/webservice_livsmedel/getlivsmedel.php";

const searchBtn = $("#sok-button");

const table = $("#search-table");

table.hide();

/**
 * Event handler for search button. Sends GET request to URL for search value
 */
searchBtn.on("click", (e) => {
	e.preventDefault();

	// clear table body
	$("tbody").empty();

	let searchInput = $("#search-word");

	// GET request: handles success and fail
	$.ajax({
		url: SERVICE_URL + "?namn=" + searchInput.val() + "&callback=getLivsmedel",
		dataType: "jsonp",
		success: function (res) {
			// populate and show table if there are search results, else hide the table
			if (res.livsmedel.length > 0) {
				populateTable(res.livsmedel);
				table.show();
			} else {
				table.hide();
			}
		},
		fail: function () {
			// if there was a fail status message then hide the table
			table.hide();
		},
	});
});

/**
 * Populate table with items gotten from GET request
 * @param {*} items - array of objects
 */
const populateTable = (objects) => {
	for (let i = 0; i < objects.length; i++) {
		// create new row in table
		// add data into each row column
		let row = $("<tr></tr>");
		$("tbody").append(row);

		row.append($("<td>" + objects[i].namn + "</td>"));
		row.append($("<td>" + objects[i].energi + "</td>"));
		row.append($("<td>" + objects[i].kolhydrater + "</td>"));
		row.append($("<td>" + objects[i].protein + "</td>"));
		row.append($("<td>" + objects[i].fett + "</td>"));
	}
};
