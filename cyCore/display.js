/*
 * Function d'affichages 
 */

function DisplayConstructTeam(){
	var target = $('#team');

	$.each(team.members, function(index, value){		
		var html = (
			'<div id="'+index+'" class="teamMember">'+
				'<div class="head">'+
				'<span class="name">'+value.GetName()+'</span>'+
				' <span class="memberInfos">[Action Points: <span class="actionPoint">'+value.GetActionPoint()+'</span>]</span>'+
				'</div>'+
				'<a class="addCombatDice actionButton" href="#">Add Combat Dice</a>'+
				'<a class="addMagicDice actionButton" href="#">Add Magic Dice</a>'+
				'<a class="addHackingDice actionButton" href="#">Add Hacking Dice</a>'+
				'<a class="addContactDice actionButton" href="#">Add Contact Dice</a>'+
				'<a class="goToSleep actionButton" href="#">Go to sleep</a> '+
				'<a class="goToPowerNap actionButton" href="#">Take a power nap</a>'+
				'<div style="clear:both;"></div>'+
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
	UpdateMemberAvailability();
};

function UpdateTeamInfo(){
	$.each(team.members, function(index, member){		
		var target = $('#'+index);
			target.find('.actionPoint').text(member.GetActionPoint());
	});
};

function UpdatePoolInfo(){
	
	$('#combatPool').text(mission.CountNotRolledDice('combat'));
	$('#magicPool').text(mission.CountNotRolledDice('magic'));
	$('#hackingPool').text(mission.CountNotRolledDice('hacking'));
	$('#contactPool').text(mission.CountNotRolledDice('contact'));
	
	$('#combatPoolSuccess').text(mission.CountOnSuccessDice('combat'));
	$('#magicPoolSuccess').text(mission.CountOnSuccessDice('magic'));
	$('#hackingPoolSuccess').text(mission.CountOnSuccessDice('hacking'));
	$('#contactPoolSuccess').text(mission.CountOnSuccessDice('contact'));
	
	$('#combatPoolMax').text(team.getMaxReserveDice('combat'));
	$('#magicPoolMax').text(team.getMaxReserveDice('magic'));
	$('#hackingPoolMax').text(team.getMaxReserveDice('hacking'));
	$('#contactPoolMax').text(team.getMaxReserveDice('contact'));
};

function UpdateMemberAvailability(){
	$.each(team.members, function(index, member){		
		var target = $('#'+index);
		if(member.checkIfBusy()){
			target.addClass('busy');
			target.removeClass('available');	
		}else{
			target.removeClass('busy');
			target.addClass('available');
		}
		
		
	});
	
}
