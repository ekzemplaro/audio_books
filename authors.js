// -----------------------------------------------------------------------
//	authors.js
//
//					Jun/04/2015
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** authors *** start *** Jun/04/2015 ***");

	var data_text = "";

	var file_authors = "data/authors.json";

	jQuery.getJSON (file_authors,function (data_authors)
		{
		data_process (data_authors);
		});

	jQuery("#outarea_hh").html
		("*** authors *** end *** Jun/04/2015 ***");

});

// -----------------------------------------------------------------------
function data_process (data_authors)
{
	var str_out = "";
	str_out += "<table>";
	for (var key in data_authors)
		{
		str_out += "<tr>";
		var record = data_authors[key];
		str_out += "<td>" + key + "</td>";
		str_out += "<td>" + record.name_jp + "</td>";
		str_out += "<td>" + record.name_en + "</td>";
		str_out += "</tr>";
		}
	str_out += "</table>";

	jQuery(".contents").html (str_out);
}

// -----------------------------------------------------------------------
