/*
 * Function d'affichages 
 */

function DisplayConstructTeam(){
	var target = $('#team');

	$.each(team.members, function(index, value){		
		var html = '<div id="'+index+'">'+value.GetName()+'</div>';
		target.append(html);
	});
	
};
