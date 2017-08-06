var MINI = require('minified');
var $ = MINI.$;

$(function () {
	var tmplQuote = "{{quote}} - {{author}}";
	var toggleQuote = $('#quote').toggle({'$$fade': 1}, {'$$fade': 0}, 500);
	function toggleLoad() {
		$('#get-quote').set('is-loading');
	}
	function getQuote() {
		var headersMap = {
			"X-Mashape-Key": "NrOvUAOKNWmshP1vIdIHRJCcQf4Fp1zyeI4jsnaKYwrRH4NKpy",
			"Content-Type": "application/x-www-form-urlencoded",
			"Accept": "application/json"
		};
		$.request('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/', null, {headers: headersMap}).then(function (text){
			var data = $.parseJSON(text),
			tweet = data.quote + " - " + data.author;
			$('#tweet-quote').set('@href', "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent(tweet));
			$('#quote').ht(tmplQuote, data);
		});
	}
	$('#get-quote').onClick(function (){
		toggleLoad();
		$.wait(1200)
			.then(getQuote)
			.then(toggleQuote)
			.then(toggleLoad)
			.then(toggleQuote);
	});
});