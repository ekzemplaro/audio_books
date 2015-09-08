// ---------------------------------------------------------------
//
//	totaltime.js
//
//					Sep/05/2015
//
// ---------------------------------------------------------------
// [6-8]:
exports.archive_totaltime_proc = function (data_archive)
{
	var total_sec = 0;

	for (var it in data_archive.files)
		{

		var pos = it.indexOf (".mp3");

		if (0 < pos)
			{
			if ("original" in data_archive.files[it])
				{
//		console.log (it);
//		console.log (data_archive.files[it].length);

			var time_length = data_archive.files[it].length;
			var sec = convert_to_second (time_length);
			total_sec += sec;

//		console.log (sec,total_sec);
				}
			}
		}

	var total_time = convert_to_hour (total_sec);
		console.log (total_sec,total_time);

	return	total_time;
}

// ---------------------------------------------------------------
function convert_to_second (time_length)
{
	var second = 0;

	var aa = 0;

	if (typeof (time_length) != "string")
		{
		second = 0;
		}
	else if (time_length == null)
		{
		second = 0;
		}
	else if (time_length.length < 2)
		{
		second = 0;
		}
	else
		{
		aa = time_length.indexOf (":");

		if (0 <= aa)
			{
			var min = parseInt (time_length.substring (0,aa),10);

			var str_sec = time_length.slice (aa + 1);

			var sec = parseInt (str_sec,10);

			second = min * 60 + sec;
			}
		else
			{
			second = parseInt (time_length,10);
			}

		}

	if (second.toString () == "NaN")
		{
		second = 0;
		}

	return	second;
}

// ---------------------------------------------------------------
function convert_to_hour (second)
{
	var str_ret = "";

	var day = 0;

	if (second.toString () == "NaN")
		{
		str_ret = "--:--:--";
		}
	else
		{ 
		var hour = Math.floor (second / 3600);

		if (24 < hour)
			{
			day = Math.floor (hour / 24);
			hour = hour - day * 24;
			}


		var sec_tmp = (day * 24 + hour) * 3600;

		var min = Math.floor ((second - sec_tmp) / 60);

		var ss = second - sec_tmp - min * 60;

		if (hour < 10)
			{
			hour = "0" + hour;
			}

		if (min < 10)
			{
			min = "0" + min;
			}

		if (ss < 10)
			{
			ss = "0" + ss;
			}

		str_ret = "" + hour + ":" + min + ":" + ss;

		if (0 < day)
			{
			str_ret = day + ":" + str_ret;
			}
		}

	return	str_ret;
}

// ---------------------------------------------------------------
