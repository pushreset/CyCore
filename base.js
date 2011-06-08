//initialize logger
var cyLogger = new cyLogger();

//initialize currentTime
var currentTime = new TimeObject(dayOfWeek, hourOfDay);

//initialize mission
var domains= {magic: 3, combat:4, hacking: 2, contact: 2};
var mission = new MissionObject(domains);
mission.SetTimeOut(2,12);
//mission.SetTimeEvent(1,4,rollDice);
//mission.SetTimeEvent(1,12,rollDice);

//initialize team
var team = new TeamObject();
team.addMember('the magot', 4, 1, 0, 3, 10);
team.addMember('the warrior', 0, 5, 0, 2, 10);
team.addMember('the face', 0, 2, 2, 4, 10);
team.addMember('the hacker', 0, 0, 6, 2, 10);

$(document).ready(function() {
	$(window).load(function() {
		DisplayConstructTeam();
		UpdateInfos();
		
		//add pool dice for tests
//		team.members[0].AddCombatPoolDice();
//		team.members[1].AddCombatPoolDice();
//		team.members[1].AddCombatPoolDice();
//		team.members[1].AddCombatPoolDice();
//		team.members[2].AddCombatPoolDice();
//		team.members[3].AddCombatPoolDice();
//
//		team.members[0].AddMagicPoolDice();
//		team.members[0].AddMagicPoolDice();
//		team.members[1].AddMagicPoolDice();
//		team.members[2].AddMagicPoolDice();
//		team.members[3].AddMagicPoolDice();
//
//		team.members[0].AddHackingPoolDice();
//		team.members[1].AddHackingPoolDice();
//		team.members[2].AddHackingPoolDice();
//		team.members[3].AddHackingPoolDice();
//		team.members[3].AddHackingPoolDice();
//
//		team.members[0].AddContactPoolDice();
//		team.members[1].AddContactPoolDice();
//		team.members[2].AddContactPoolDice();
//		team.members[2].AddContactPoolDice();
//		team.members[3].AddContactPoolDice();		
		
		
		$.each(team.members, function(index, value){
			console.log(value);
		});
		
		
		friseElement = $('#frise');
		elapsedElement = $('#elapsed');
		
		friseWidth = friseElement.width();
		oneHourWidth = friseWidth / 24;
		
		checkFrise = setInterval(FriseCore, 250);
		
		$('#runFrise').click(function(e){
	      e.preventDefault();
	      StartFrise();  
	  });
	  
	  $('#stopFrise').click(function(e){
	      e.preventDefault();
	      StopFrise();  
	  });
	  
	  $('#rollDice').click(function(e){
		  e.preventDefault();
		  rollDice();
	  });
 
	  $('.addCombatDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddCombatPoolDice();
		  UpdateInfos();
	  });
	  
	  $('.addMagicDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddMagicPoolDice();
		  UpdateInfos();
	  });
	  
	  $('.addHackingDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddHackingPoolDice();
		  UpdateInfos();
	  });
	  
	  $('.addContactDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddContactPoolDice();
		  UpdateInfos();
	  });
	  
	  $('.goToSleep').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].GoToSleep();
		  UpdateInfos();
	  });
	  
	  
	});
});