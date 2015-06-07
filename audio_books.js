// -----------------------------------------------------------------------
//	audio_books.js
//
//					Jun/07/2015
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** audio_books *** start *** Jun/07/2015 ***");

	var data_text = "";

	var file_authors = "data/authors.json";
	var file_works = "data/works.json";
	var file_archive = "data/short_merged.json";

	jQuery.getJSON (file_authors,function (data_authors)
		{
		jQuery.getJSON (file_works,function (data_works)
			{
			jQuery.getJSON (file_archive,function (data_archive)
				{
				data_process (data_authors,data_works,data_archive);
				});
			});
		});

	jQuery("#outarea_hh").html
		("*** audio_books *** end *** Jun/07/2015 ***");

});

// -----------------------------------------------------------------------
function data_process (data_authors,data_works,data_archive)
{
	var str_out = "";
	for (var key in data_authors)
		{
		var record = data_authors[key];
//		str_out += key + " ";
		str_out += record.name_jp + " ";
		str_out += "( " + record.name_en + " )<br />";

		var works = find_works_proc (key,data_works);

		if (0 < works.length)
			{
			str_out += "<blockquote>";
			str_out += "<table>";
			for (var it in works)
				{
				str_out += "<tr>";
				str_out += "<td>";
				var code = works[it];
				var work = data_works[code];

			str_out += '<a href=https://archive.org/details/';
				str_out += work.url_archive;
				str_out += '>';

				str_out += work.title_jp + " ";
				str_out += "( " + work.title_en + " )";
				str_out += '</a>';
				str_out += "</td>";

//				str_out += code;
				if (code in data_archive)
					{
				str_out += "<td>";
				var arch = data_archive[code];
				str_out += "&nbsp;"
				str_out += arch.publicdate;
				str_out += "</td>";
				str_out += "<td>";
				str_out += "&nbsp;"
				str_out += arch.downloads;
				str_out += "</td>";
					}
				str_out += "</tr>";
				str_out += "<p />";
				}
			str_out += "</table>";
			str_out += "</blockquote>";
			}
		}

	jQuery(".contents").html (str_out);
}

// -----------------------------------------------------------------------
function find_works_proc (key_author,data_works)
{
	var works = [];

	for (var key in data_works)
		{
		if (data_works[key].author == key_author)
			{
			works.push (key);
			}
		}

	return	works;
}
// -----------------------------------------------------------------------
