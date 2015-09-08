// -----------------------------------------------------------------------
//	audio_books.js
//
//					Jul/04/2015
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").html
		("*** audio_books *** start *** Jul/04/2015 ***");

	var data_text = "";

	var file_authors = "data/authors.json";
	var file_works = "data/works.json";
	var file_archive = "data/data_archive.json";

	jQuery.getJSON (file_authors,function (data_authors)
		{
		jQuery.getJSON (file_works,function (data_works)
			{
			jQuery.getJSON (file_archive,function (data_archive)
				{
				var str_out = data_process (data_authors,data_works,data_archive);

	jQuery(".contents").html (str_out);
				});
			});
		});

	jQuery("#outarea_hh").html
		("*** audio_books *** end *** Jul/04/2015 ***");

});

// -----------------------------------------------------------------------
