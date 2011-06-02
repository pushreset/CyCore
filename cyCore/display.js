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

function DisplayInfoHuntingResult(type, data){
	
	if (type){
		cyLogger.log('Info hunting :'+type+' data:'+data, 'info');
	}
	else{
		cyLogger.log('Info hunting fail', 'info');
	}
};