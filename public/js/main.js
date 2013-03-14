requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		"app": "../app",
		"jquery": "jquery/jquery",
		"backbone": "backbone-amd/backbone",
		"underscore": "underscore-amd/underscore"
	}
});

require(["jquery", "app/bootstrap"],
function ($) {
	$(function () {
		$("#requirejs-status").text("On");
	})
});
