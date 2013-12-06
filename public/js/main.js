$(function(){

 	$('#btn-link').on('click', function(){
    $.get( '/searching', function(data) {
    	$('#results').html(data);
  	});
 	});
});
