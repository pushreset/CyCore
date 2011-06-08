/*
 * Function d'affichages 
 */

function DisplayConstructTeam(){
	var target = $('#team');

	$.each(team.members, function(index, value){		
		var html = (
			'<div id="'+index+'" class="teamMember">'+
				'<span class="name">'+value.GetName()+'</span>'+
				' <span class="actionPoint">'+value.GetActionPoint()+'</span>'+
				'<br />'+
				' <a class="addCombatDice" href="#">Add Combat Dice</a>'+
				' <a class="addMagicDice" href="#">Add Magic Dice</a>'+
				' <a class="addHackingDice" href="#">Add Hacking Dice</a>'+
				' <a class="addContactDice" href="#">Add Contact Dice</a>'+
				'<br />'+
				'<a class="goToSleep" href="#">Go to sleep</a>'+
			'</div>'
		);
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

function UpdateInfos(){
	UpdateTeamInfo();
	UpdatePoolInfo();
};

function UpdateTeamInfo(){
	$.each(team.members, function(index, value){		
		var target = $('#'+index);
			target.find('.actionPoint').text(value.GetActionPoint());
	});
};

function UpdatePoolInfo(){
	var combatPool = 0;
	var magicPool = 0;
	var hackingPool = 0;
	var contactPool = 0;
	
	$.each(team.members, function(index, value){		
		combatPool = combatPool + value.GetCombatPool();
		magicPool = magicPool + value.GetMagicPool();
		hackingPool = hackingPool + value.GetHackingPool();
		contactPool = contactPool + value.GetContactPool();
	});
	
	
	$('#combatPool').text(combatPool);
	$('#magicPool').text(magicPool);
	$('#hackingPool').text(hackingPool);
	$('#contactPool').text(contactPool);	
};