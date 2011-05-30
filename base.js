//initialize logger
var cyLogger = new cyLogger();

//initialize currentTime
var currentTime = new TimeObject(dayOfWeek, hourOfDay);

//initialize mission
var domains= {magic: 3, combat:4, hacking: 2, contact: 2};
var mission = new MissionObject(domains);
mission.SetTimeOut(2,8);
mission.SetTimeEvent(1,4,rollDice);
mission.SetTimeEvent(1,12,rollDice);

//initialize team
var team = new TeamObject();
team.addMember('the magot', 4, 1, 0, 3,10);
team.addMember('the warrior', 0, 5, 0, 2,10);
team.addMember('the face', 0, 2, 2, 4,10);
team.addMember('the hacker', 0, 0, 6, 2,10);

$(document).ready(function() {
	$(window).load(function() {
		
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
 
	  
	});
});