// -----------------------------------------------------------------------
//	works.js
//
//					Jun/04/2015
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** works *** start *** Jun/04/2015 ***");

	var data_text = "";

	var file_works = "data/works.json";

	jQuery.getJSON (file_works,function (data_works)
		{
		data_process (data_works);
		});

	jQuery("#outarea_hh").html
		("*** works *** end *** Jun/04/2015 ***");

});

// -----------------------------------------------------------------------
function data_process (data_works)
{
	var str_out = "";
	str_out += "<table>";
	for (var key in data_works)
		{
		str_out += "<tr>";
		var record = data_works[key];
		str_out += "<td>" + key + "</td>";
		str_out += "<td>" + record.title_jp + "</td>";
		str_out += "<td>" + record.title_en + "</td>";
		str_out += "<td>" + record.author + "</td>";
		str_out += "<td>" + record.url_archive + "</td>";
		str_out += "</tr>";
		}
	str_out += "</table>";

	jQuery(".contents").html (str_out);
}

// -----------------------------------------------------------------------
