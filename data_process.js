// -----------------------------------------------------------------------
//	data_process.js
//
//					Jul/04/2015
//
// -----------------------------------------------------------------------
function data_process (data_authors,data_works,data_archive)
{
	var str_out = "";
	str_out += '<table>';

	str_out += '<tr>';
	str_out += '<th>著者</th>';
	str_out += '<th>タイトル</th>';
	str_out += '<th>Title</th>';
	str_out += '<th>Total time</th>';
	str_out += '<th>Public date</th>';
	str_out += '<th>Week</th>';
	str_out += '<th>Month</th>';
	str_out += '<th>Total</th>';
	str_out += '</tr>';
	for (var key in data_authors)
		{
		var works = find_works_proc (key,data_works);

		var nn = works.length;


		if (0 < nn)
			{
		str_out += '<tr>';
		var record = data_authors[key];
		str_out += '<td rowspan=' + nn + '>' + record.name_jp + "<br />";
		str_out += record.name_en + "</td>";

			for (var it in works)
				{
				if (0 < it)
					{
				str_out += "<tr>";
					}

				str_out += "<td>";
				var code = works[it];
				var work = data_works[code];

			str_out += '<a href=https://archive.org/details/';
				str_out += work.url_archive;
				str_out += '>';

				str_out += work.title_jp + "</td>";
				str_out += "<td>" + work.title_en + "</td>";
				str_out += '</a>';
				str_out += "</td>";

//				str_out += code;
				if (code in data_archive)
					{
				var arch = data_archive[code];
				str_out += "<td>";
				str_out += arch.total_time;
				str_out += "</td>";
				str_out += "<td>";
				var date_aa = arch.publicdate.split (' ');
				str_out += date_aa[0];
				str_out += "</td>";
				str_out += "<td>";
				str_out += arch.week;
				str_out += "</td>";
				str_out += "<td>";
				str_out += arch.month;
				str_out += "</td>";
				str_out += "<td>";
				str_out += arch.downloads;
				str_out += "</td>";
					}
				str_out += "</tr>";
				str_out += "<p />";
				}
//			str_out += "</table>";
//			str_out += "</blockquote>";
			}
		}

	str_out += '</table>';

	return str_out;
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
