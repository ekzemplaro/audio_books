#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	fetch_audio_archive.js
//
//					Jun/06/2015
//
// ---------------------------------------------------------------
var fs = require("fs");

// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];

console.log (file_json_in);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_works = JSON.parse (json_str);
	fetch_audio_archive_proc (data_works);
	}

// console.log ("*** 終了 ***");
// ---------------------------------------------------------------
function fetch_audio_archive_proc (data_works)
{
	var data_archive = {};

	for (var key in data_works)
		{
		var url='https://archive.org/details/' + data_works[key].url_archive;

		console.log (url);
		archive_fetch_exec_proc (key,url,data_archive);
		}
/*
	var json_str_out = JSON.stringify (data_archive);

	var file_archive_json = 'data_archive.json';
	fs.writeFile (file_archive_json,json_str_out);
*/		
}

// ---------------------------------------------------------------
function archive_fetch_exec_proc (key,url,data_archive)
{
	var url_json = url + '&output=json';
	var file_json = key + '.json';

	var https = require('https');

https.get(url_json, function(res) {
	var body = '';
	res.setEncoding('utf8');
	
	res.on ('data', function (chunk) {
	body += chunk;
	});

	res.on('end', function() {

//	fs.writeFile (file_json,body);

	var head_portion = body.substr (0,9);
	if (head_portion !== "<!DOCTYPE")
		{
	var data_aa = JSON.parse (body);

	var data_shorten = filter_arhive_shorten_proc (key,data_aa);

	var file_shorten_json = key + '_short.json';

		var json_str_out = JSON.stringify (data_shorten);
		fs.writeFile (file_shorten_json,json_str_out);

		}

	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
function filter_arhive_shorten_proc (key,data_aa)
{
	var data_shorten = new Object ();
	var unit_aa = new Object ();

//	console.log (data_aa.metadata.publicdate);
//	console.log (data_aa.item.downloads);

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0];
	unit_aa['downloads'] = 0;

	if ('item' in data_aa)
		{
		if ('downloads' in data_aa.item)
			{
		unit_aa['downloads'] = data_aa.item.downloads;
			}
		}

	data_shorten[key] = unit_aa;

	return	data_shorten;
}

// ---------------------------------------------------------------
