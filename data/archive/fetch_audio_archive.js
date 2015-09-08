#! /usr/bin/nodejs
// ---------------------------------------------------------------
//	fetch_audio_archive.js
//
//					Jul/02/2015
//
// ---------------------------------------------------------------
var fs = require("fs");
var underscore = require('underscore');

var totaltime =require ("./totaltime");
// ---------------------------------------------------------------
// console.log ("*** 開始 ***");

var file_json_in=process.argv[2];
var data_archive = {};

console.log (file_json_in);

var json_str = fs.readFileSync (file_json_in);

if (1 < json_str.length)
	{
	var data_works = JSON.parse (json_str);
	fetch_audio_archive_proc (data_works,data_archive);
	}


	var icount = 0;
	for (var key in data_works)
		{
		icount += 1;
		}

	var displayResult  = underscore.after (icount, function()
		{
		var json_str_out = JSON.stringify (data_archive);

		var file_archive_json = 'data_archive.json';
		fs.writeFile (file_archive_json,json_str_out);
		console.log ("*** 終了 ***");
		});

// ---------------------------------------------------------------
function fetch_audio_archive_proc (data_works,data_archive)
{
	for (var key in data_works)
		{
		var url='https://archive.org/details/' + data_works[key].url_archive;

		console.log (url);
		archive_fetch_exec_proc (key,url,data_archive);
		}
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

	var head_portion = body.substr (0,9);
	if (head_portion !== "<!DOCTYPE")
		{
	var data_aa = JSON.parse (body);

	var unit_aa = filter_arhive_shorten_proc (key,data_aa);

		data_archive[key] = unit_aa;
 
		displayResult();
		}

	});

}).on('error', function(ee) {
	console.error(ee);
});
}

// ---------------------------------------------------------------
function filter_arhive_shorten_proc (key,data_aa)
{
	var unit_aa = new Object ();

//	console.log (data_aa.metadata.publicdate);
//	console.log (data_aa.item.downloads);

	var total_time = totaltime.archive_totaltime_proc (data_aa);

	console.log (total_time);
	unit_aa['total_time'] = total_time;

	unit_aa['publicdate'] = data_aa.metadata.publicdate[0];
	unit_aa['downloads'] = 0;
	unit_aa['week'] = 0;
	unit_aa['month'] = 0;

	if ('item' in data_aa)
		{
		if ('downloads' in data_aa.item)
			{
			unit_aa['downloads'] = data_aa.item.downloads;
			unit_aa['week'] = data_aa.item.week;
			unit_aa['month'] = data_aa.item.month;
			}
		}

	return	unit_aa;
}

// ---------------------------------------------------------------
