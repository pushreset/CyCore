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
//(name, magic, combat, hacking, contact, actionPoints,
team.addMember('the magot', 4, 1, 1, 1, 10);
team.addMember('the warrior', 0, 5, 0, 1, 10);
team.addMember('the face', 1, 1, 1, 3, 10);
team.addMember('the hacker', 0, 2, 3, 1, 10);

$(document).ready(function() {
	$(window).load(function() {
		DisplayConstructTeam();
		UpdateInfos();
		
		setInterval(UpdateInfos, 500);
		
		$.each(team.members, function(index, value){
			console.log(value);
		});
		
		
		friseElement = $('#frise');
		elapsedElement = $('#elapsed');
		
		friseWidth = friseElement.width();
		oneHourWidth = friseWidth / 24;
		
		checkFrise = setInterval(FriseCore, 100);
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
	  
	  $('#playOST').click(function(e){
		  e.preventDefault();

	  });
	  
	  $('#stopOST').click(function(e){
		  e.preventDefault();

	  });
	  
	  $('.addCombatDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddPoolDice('combat');
		  UpdateInfos();
	  });
	  
	  $('.addMagicDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddPoolDice('magic');
		  UpdateInfos();
	  });
	  
	  $('.addHackingDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddPoolDice('hacking');
		  UpdateInfos();
	  });
	  
	  $('.addContactDice').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].AddPoolDice('contact');
		  UpdateInfos();
	  });
	  
	  $('.goToSleep').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].GoToSleep();
		  UpdateInfos();
	  });
	  
	   $('.goToPowerNap').live('click', function(e){
		  e.preventDefault();
		  var index = $(this).parent('.teamMember').attr('id');
		  team.members[index].GoToSleep('short');
		  UpdateInfos();
	  });
	  
	});
});