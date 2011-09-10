var hourDuration = 300; //in mseconds
var dayDuration = hourDuration * 24;
var cyLoggerIsActive = true;
var cyLoggerConsoleIsActive = true;
var cyLoggerHtmlIsActive = true;
var cyLoggerHtmlSize = 'large';

var SLEEPDURATION = 6; //in hours
var INFOHUNTINGDURATION = 4; // in hours


var CONSTANT = {
	MAGIC_DEFAULT_COST_TIME: 			4, // in hours
	COMBAT_DEFAULT_COST_TIME: 			4, // in hours
	HACKING_DEFAULT_COST_TIME: 			4, // in hours
	CONTACT_DEFAULT_COST_TIME: 			4, // in hours
	
	MAGIC_DEFAULT_COST_AP: 				5, // action points
	COMBAT_DEFAULT_COST_AP: 			5, // action points
	HACKING_DEFAULT_COST_AP: 			5, // action points
	CONTACT_DEFAULT_COST_AP: 			5, // action points
	
	SLEEPDURATION: 						6, // in hours
	INFOHUNTINGDURATION: 				4, // in hours
	
	HOURDURATION:						2000, //in ms
	
	SLEEPDURATION_SHORT:				3, //in hours
	SLEEPDURATION_FULL:					6, //in hours
	SLEEPRECOVER_SHORT:					4, // actions points
	
	RUNDURATION:						6, //in hours
	
	EVENTTYPE_ENDMISSION:				'mission_final_time',
	EVENTTYPE_SKILL:					'skill',
	EVENTTYPE_MISSIONEVENT:				'mission_event',
	EVENTTYPE_TEAMMEMBER_READY:			'team_member_ready',
	EVENTTYPE_TEAMMEMBER_SLEEP:			'team_member_sleep',
	EVENTNOMEMBERINDEX:					'all_member',
	
	//Malus if run not at full member
	RUNMALUS_IFCOUNTMEMBER_4:			0, //team full
	RUNMALUS_IFCOUNTMEMBER_3:			1,
	RUNMALUS_IFCOUNTMEMBER_2:			2,
	RUNMALUS_IFCOUNTMEMBER_1:			3,
	RUNMALUS_IFCOUNTMEMBER_0:			4,
}
