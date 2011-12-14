/* CLASSES */
function MissionObject(domains) {
	var timeOut;
	//un temps d'exécution en jours
	var target;
	//une corporation cible
	var jonhson;
	//une corporation commanditaire
	var prize;
	//une récompense en neoyens
	var doubleCross;
	//une probabilite de double cross en D6
	var tracing;
	//une probabilité de traçage par la cible en cas d'échec en d6
	var domains = domains;
	//des seuils de difficulté dans 4 domaine : magic, combat, hacking et contact en d6
	var reputation;
	//un niveau de réputation minimum pour être sélectionné pour la mission

	//POOL D6 miser sur la mission

	//// OBSOLETE //////////////////////
	//D6 stocké
	var combatPool = new Array();
	var magicPool = new Array();
	var hackingPool = new Array();
	var contactPool = new Array();

	var combatPoolCount = 0;
	var magicPoolCount = 0;
	var hackingPoolCount = 0;
	var contactPoolCount = 0;
	var diceOnSuccess = new Array();
	// D�s lanc� et en succ�s avec index perso
	////////////////////////////////////



	/* NEW DICE MANAGEMENT
	 * DICES
	 *
	 * Model
	 * 	{
	 * 	type: string // combat/magic/hacking/contact
	 * 	member: int //index of member
	 * 	failOn: int // 1/2/3/4/5/6 difficulté of the roll
	 * 	state: int // 0: not launched / 1: success / 2: failed
	 * }
	 */

	var dicesPool = new Array();

	this.AddDiceInPool = function(memberIndex, diceType, failOn, state) {
		if(memberIndex == '') {
			//return false; // break if no memberIndex
		}
		if(diceType != 'combat' && diceType != 'magic' && diceType != 'hacking' && diceType != 'contact') {
			return false; // break if no dicetype
		}
		failOn = failOn ? failOn : 5;
		state = state ? state : 0;

		var dice = {
			type : diceType,
			member : memberIndex,
			failOn : failOn,
			state : state
		}

		dicesPool.add(dice);
		return true;
	}

	this.CountNotRolledDice = function(theDiceType) {
		return dicesPool.count(function(d) {
			if(d.type == theDiceType && d.state == 0)
				return true
		});
	}

	this.CountOnSuccessDice = function(theDiceType) {
		return dicesPool.count(function(d) {
			if(d.type == theDiceType && d.state == 1)
				return true
		});
	}

	this.CountFailedDice = function(theDiceType) {
		return dicesPool.count(function(d) {
			if(d.type == theDiceType && d.state == 2)
				return true
		});
	}
	
	this.RollPoolDice = function(theDiceType, malus){
		var rolls =  dicesPool.findAll(function(d) {
			if(d.type == theDiceType && d.state == 0){				

				var roll = rollDice(6, (d.failOn - malus));
				if(roll){
					d.state = 1; // set dice on success
				}
				else{
					d.state = 2; // set dice on fail
				}				
			}			
		});
	}
	
	
	
	
	/*
	 * END DICE MANAGEMENT
	 */
	
	var missionTarget = 'Renraku';

	var missionIsOnSuccess = false;

	this.timeEvent = new Array();
	//stockage des time event

	var timeOutSetted = false;
	// time out is already setted
	var missionLaunched = false;
	// mission has begun

	var infoHuntingType;

	this.GetDifficulty = function() {
		return domains;
	};

	this.GetMissionInfos = function() {
		return new Array({
			target : missionTarget
		});
	};

	this.GoToRun = function(isFinal){
		var memberCount = 0;
		$.each(team.members, function(index, member) {
			if(!member.checkIfBusy()){
				memberCount++
				member.SetMemberBusyForHours(CONSTANT.RUNDURATION);
			}
		});
		
		if(memberCount > 0){ //can RUN only if at least one member available
			var malus = CONSTANT['RUNMALUS_IFCOUNTMEMBER_'+memberCount];
			mission.RollPoolDice('combat', malus);
			mission.RollPoolDice('hacking', malus);
			mission.RollPoolDice('magic', malus);
			mission.RollPoolDice('contact', malus);
		}
		
		if(isFinal){
			
			if(this.IfMissionIsSuccess()) {
				missionIsOnSuccess = true;
				alert('Mission réussie !');
				cyLogger.log('Mission is a success');
			} else {
				missionIsOnSuccess = false;
				alert('Mission failed...');
				cyLogger.log('mission failed');
			}
			
		}
	}
	
	// Execute toutes les actions lors de la r�solution final � la fin du timing
	// A REFAIRE
	this.ResolveDicesPools = function() {

		


/*	
		// construction des tableau indiquant les D6 disponible
		$.each(team.members, function(index, data) {
			ConstructPoolDiceArray(data.GetCombatPool(), index, 'combat');
			ConstructPoolDiceArray(data.GetMagicPool(), index, 'magic');
			ConstructPoolDiceArray(data.GetHackingPool(), index, 'hacking');
			ConstructPoolDiceArray(data.GetContactPool(), index, 'contact');
		});
		//console.log(combatPool);
		//console.log(magicPool);
		//console.log(hackingPool);
		//console.log(contactPool);

		combatPoolCount = count(combatPool);
		magicPoolCount = count(magicPool);
		hackingPoolCount = count(hackingPool);
		contactPoolCount = count(contactPool);

		cyLogger.log('TOTAL POOLS | Combat: ' + combatPoolCount + ' magic: ' + magicPoolCount + ' Hacking: ' + hackingPoolCount + ' Contact: ' + contactPoolCount, INFO_CYLOG);

		if(this.IfMissionIsSuccess()) {
			missionIsOnSuccess = true;
			cyLogger.log('mission success');
		} else {
			missionIsOnSuccess = false;
			cyLogger.log('mission failed');
		}
*/
	};

	this.IfMissionIsSuccess = function() {
		var difficulty = mission.GetDifficulty();
		
		var isMagicSuccess 		= mission.CountOnSuccessDice('magic') >= difficulty.magic;
		var isCombatSuccess 	= mission.CountOnSuccessDice('combat') >= difficulty.combat;
		var isHackingSuccess 	= mission.CountOnSuccessDice('hacking') >= difficulty.hacking;
		var isContactSuccess 	= mission.CountOnSuccessDice('contact') >= difficulty.contact;
		
		if(isMagicSuccess && isCombatSuccess && isHackingSuccess && isContactSuccess) {
			return true;
		} else {
			return false;
		}
	};
	// Construit les tableaux de D6 en succ�s
	// un index de personnage par d�
	function ConstructPoolDiceArray(dice, index, type) {
		for( i = 0; i < dice; i++) {
			if(rollDice()) {
				switch (type) {
					case 'combat':
						combatPool.push(index);
						break;
					case 'magic':
						magicPool.push(index);
						break;
					case 'hacking':
						hackingPool.push(index);
						break;
					case 'contact':
						contactPool.push(index);
						break;
				}
			}
		}
		return true;
	};


	this.RollPackDice = function(number, side, fail) {
		var success = 0;

		for( i = 1; i <= number; i++) {
			success = success + rollDice(side, fail);
		}

		cyLogger.log('RollPackDice | success: ' + success, INFO_CYLOG);
		return success;

	};
	//callback when timeOut
	TimeOutMission = function() {
		cyLogger.log('TimeOutMission', INFO_CYLOG);
		mission.GoToRun(true);
	};
	// set time event
	this.SetTimeOut = function(day, hour) {
		if(!timeOutSetted) {
			this.timeEvent.push(new EventObject(day, hour, TimeOutMission, CONSTANT.EVENTTYPE_ENDMISSION, CONSTANT.EVENTNOMEMBERINDEX));
			timeOutSetted = true;
		} else {
			cyLogger.log('SetTimeOut : Already Setted !', WARNING_CYLOG);
		}

	};
	// set time event
	this.SetTimeEvent = function(day, hour, callback, type, memberIndex) {
		this.timeEvent.push(new EventObject(day, hour, callback, type, memberIndex));
	};
	
	// return index of time event
	this.SearchTimeEvent = function(type, memberIndex, isDone){
		var eventIndexs = new Array();
		
		this.timeEvent.findAll(function(e, index) {
			if(e.isDone == isDone && e.type == type && e.memberIndex == memberIndex){				
				eventIndexs.add(index);			
			}			
		});
		
		return eventIndexs;
	}
}

function TeamObject() {
	
	var teamInfos	= {
		maxByRun: {
			combat:		0,
			hacking:	0,
			contact:	0,
			magic:		0
		},
		membersCount: 0
	};
	this.members 	= new Array();

	this.addMember 	= function(name, magic, combat, hacking, contact, actionPoints, magicCost, combatCost, hackingCost, contactCost) {		
		//add member
		var index = teamInfos.membersCount;
		this.members.add(
			new TeamMemberObject(index, name, magic, combat, hacking, contact, actionPoints, skills, magicCost, combatCost, hackingCost, contactCost)
		);

		// change global team infos
		teamInfos.membersCount 		= teamInfos.membersCount		+ 1;
		teamInfos.maxByRun.combat 	= teamInfos.maxByRun.combat 	+ combat;
		teamInfos.maxByRun.magic 	= teamInfos.maxByRun.magic 		+ magic;
		teamInfos.maxByRun.hacking 	= teamInfos.maxByRun.hacking 	+ hacking;
		teamInfos.maxByRun.contact 	= teamInfos.maxByRun.contact 	+ contact;
	};
	
	this.getMaxReserveDice = function(diceType){
		return teamInfos.maxByRun[diceType];
	}
}

function TeamMemberObject(index, name, magic, combat, hacking, contact, actionPoints, skills, magicAPCost, combatAPCost, hackingAPCost, contactAPCost, magicTimeCost, combatTimeCost, hackingTimeCost, contactTimeCost) {
	
	var magicAPCost 	= magicAPCost 		? magicAPCost 		: CONSTANT.MAGIC_DEFAULT_COST_AP;
	var combatAPCost 	= combatAPCost 		? combatAPCost 		: CONSTANT.COMBAT_DEFAULT_COST_AP
	var hackingAPCost	= hackingAPCost 	? hackingAPCost 	: CONSTANT.HACKING_DEFAULT_COST_AP;
	var contactAPCost 	= contactAPCost 	? contactAPCost 	: CONSTANT.CONTACT_DEFAULT_COST_AP;
	
	var magicTimeCost 	= magicTimeCost 	? magicTimeCost 	: CONSTANT.MAGIC_DEFAULT_COST_TIME;
	var combatTimeCost 	= combatTimeCost 	? combatTimeCost 	: CONSTANT.COMBAT_DEFAULT_COST_TIME;
	var hackingTimeCost	= hackingTimeCost 	? hackingTimeCost 	: CONSTANT.HACKING_DEFAULT_COST_TIME;
	var contactTimeCost = contactTimeCost 	? contactTimeCost 	: CONSTANT.CONTACT_DEFAULT_COST_TIME;
	
	var memberAttributes = {
		magic: 		{
						value: magic,
						apCost: magicAPCost,
						timeCost: magicTimeCost
					},
		combat: 	{
						value: combat,
						apCost: combatAPCost,
						timeCost: combatTimeCost
					},
		hacking: 	{
						value: hacking,
						apCost: hackingAPCost,
						timeCost: hackingTimeCost
					},
		contact: 	{
						value: contact,
						apCost: contactAPCost,
						timeCost: contactTimeCost
				},
		maxAP: actionPoints,
		actualAP: actionPoints,
		index: index,
		isBusy: false

	}
	
	this.skills= skills;
	
	var name = name;

	var infoHuntingCost = 5;
	var infoHuntingType;


	function initialize() {

	}

	initialize();


	this.GetName = function() {
		return name;
	};

	this.GetMagic = function() {
		return memberAttributes.magic.value;
	};

	this.GetCombat = function() {
		return memberAttributes.combat.value;
	};

	this.GetHacking = function() {
		return memberAttributes.hacking.value;
	};

	this.GetContact = function() {
		return memberAttributes.contact.value;
	};

	this.GetActionPoint = function() {
		return memberAttributes.actualAP;
	};

	this.ShowStats = function() {
		cyLogger.log('"' + name + '" M' + magic + ' C' + combat + ' H' + hacking + ' C' + contact + ' | PA' + action + ' | pM' + poolmagic + ' pC' + poolCombat + ' pH' + poolHacking + ' pC' + poolContact, INFO_CYLOG);
	};
	
	this.SetMemberBusyForHours = function(hours){
		memberAttributes.isBusy = true;
		var time = CalculPlusTime(hours);	
		mission.SetTimeEvent(time[0].day, time[0].hour, SetMemberActive, CONSTANT.EVENTTYPE_TEAMMEMBER_READY, memberAttributes.index);
		return true;
	}
	
	function SetMemberActive(){
		cyLogger.log('"' + name + '" member available !', WARNING_CYLOG);
		memberAttributes.isBusy = false;
	}
	
	this.AddPoolDice = function(diceType) {
		
		var ifMemberBusy 		= this.checkIfBusy();
		var ifActionGranted 	= memberAttributes[diceType].value > 0;
		var ifActionAvailable 	= this.ActionAvailable(diceType);
		var ifPoolNotAtMax 		= this.CheckDomainMax(diceType);	
		
		if(ifActionAvailable && ifPoolNotAtMax && !ifMemberBusy && ifActionGranted) {		
			if(mission.AddDiceInPool(memberAttributes.index, diceType)){
				//use action poibnts
				memberAttributes.actualAP = memberAttributes.actualAP - memberAttributes[diceType].apCost;
				
				//set when have to reactivate member
				this.SetMemberBusyForHours(memberAttributes[diceType].timeCost);
				return true;
			}
			else{
				return false;
			}		
		}else if(!ifActionGranted) {
			cyLogger.log('"' + name + '" Action not granted ! !', WARNING_CYLOG);
			return false;
		}else if(!ifPoolNotAtMax) {
			cyLogger.log('"' + name + '" '+diceType+' Pool already MAX ! !', WARNING_CYLOG);
			return false;
		} else if(!ifActionAvailable) {
			cyLogger.log('"' + name + '" No action point available ! !', WARNING_CYLOG);
			return false;
		}else if(ifMemberBusy) {
			cyLogger.log('"' + name + '" is already busy ! !', WARNING_CYLOG);
			return false;
		}
	};

	//check if action available
	this.ActionAvailable = function(diceType) {
		totalIfUse = memberAttributes.actualAP - memberAttributes[diceType].apCost;
		if(totalIfUse >= 0) {
			return true;
		} else {
			return false;
		}
	};
	//check if Pool at max
	this.CheckDomainMax = function(diceType) {
		if(mission.CountNotRolledDice(diceType) >= team.getMaxReserveDice(diceType)) {
			return false;
		} else {
			return true;
		}
	};
	
	this.checkIfBusy = function(){
		return memberAttributes.isBusy;
	}
	
	// Member go to sleep and rest => restore Action Point
	this.GoToSleep = function(duration) {
		memberAttributes.isBusy = true;
		// calcul fin
		switch (duration){
			case "short":
				var sleepDuration 	= CONSTANT.SLEEPDURATION_SHORT;
				var time = CalculPlusTime(sleepDuration);
				mission.SetTimeEvent(time[0].day, time[0].hour, RestoreMyActionShort, CONSTANT.EVENTTYPE_TEAMMEMBER_SLEEP, memberAttributes.index);
				break;
			case "full":
			default:
				var sleepDuration 	= CONSTANT.SLEEPDURATION_FULL;
				var time = CalculPlusTime(sleepDuration);
				mission.SetTimeEvent(time[0].day, time[0].hour, RestoreMyActionFull, CONSTANT.EVENTTYPE_TEAMMEMBER_SLEEP, memberAttributes.index);
				break;
		}

		cyLogger.log('"' + name + '" are going to sleep: ' + time[0].day + '/' + time[0].hour, INFO_CYLOG);

		return time;
	};
	function RestoreMyActionFull() {
		memberAttributes.actualAP = memberAttributes.maxAP;
		memberAttributes.isBusy = false;
		cyLogger.log('"' + name + '" Restore Action Points : ' + memberAttributes.actualAP, INFO_CYLOG);	
		return true;
	};
	
	function RestoreMyActionShort() {		
		memberAttributes.actualAP = memberAttributes.actualAP + CONSTANT.SLEEPRECOVER_SHORT;	
		if (memberAttributes.actualAP > memberAttributes.maxAP)
			memberAttributes.actualAP = memberAttributes.maxAP;
		memberAttributes.isBusy = false;
		cyLogger.log('"' + name + '" Restore Action Points : ' + memberAttributes.actualAP, INFO_CYLOG);		
		return true;
	}
	
	
	this.AlterMyActionsPoints = function(number) {		
		memberAttributes.actualAP = memberAttributes.actualAP + number;	
		
		if (memberAttributes.actualAP > memberAttributes.maxAP) memberAttributes.actualAP = memberAttributes.maxAP;
		
		if (memberAttributes.actualAP < 0) memberAttributes.actualAP = 0;
			
		memberAttributes.isBusy = false;
		cyLogger.log('"' + name + '" Restore Action Points : ' + memberAttributes.actualAP, INFO_CYLOG);		
		return true;
	}
	
	// Member active contact and try to find info about mission
	this.GoToInfoHunting = function(type) {
		infoHuntingType = type;

		if(this.ActionAvailable(infoHuntingCost)) {
			var time = CalculPlusTime(INFOHUNTINGDURATION);
			mission.SetTimeEvent(time[0].day, time[0].hour, InfoHunting, CONSTANT.EVENTTYPE_SKILL, memberAttributes.index);

			return time;
		} else {
			return false;
		}
	};
	function InfoHunting() {
		var difficulty = 2 + contact;
		// reussite  sur 1 + score contact
		difficulty = difficulty > 6 ? 6 : difficulty;
		// echec automatique sur 6+
		var isSuccess = rollDice(6, difficulty);

		if(isSuccess) {
			var missionInfos = mission.GetMissionInfos();
			switch (infoHuntingType) {
				case 'target':
					var data = missionInfos[0].target;
					break;
			}
			DisplayInfoHuntingResult(infoHuntingType, data);
		} else {
			DisplayInfoHuntingResult(false);
		}

		return true;
	};
	
	/**
	 * 
	 
	 {
	 	type: skills / object
	 	name: Name of the skill
	 	slug: Slug name
	 	usage-count: int
	 	usage: {
	 		before-run:			0/1,
	 		before-final-run:	0/1,
	 		after-run:			0/1,
	 		after-final-run:	0/1,
	 		action:				0/1
	 		}
	 	effects: {
	 		{
	 			type: actions points, reroll, etc.
	 			who: me / team / choose # which is impacted by the effect
	 			value: int or function
	 		}
	 		
	 	}
	 }
	 
	 exemple1:
	 Medpack utilisable qu'une seule fois, rajouter 4 AP à toute la team, le runner qui l'utilise doit d'abord dépenser 4 AP + 1 hour
	 {
	 	type: 'object'
	 	name: 'Shinmeia MedPack'
	 	slug: 'shinmeia-medpack'
	 	usage-count: 1,
	 	usage: { 
	 		before-run:			0,
	 		before-final-run:	0,
	 		after-run:			0,
	 		after-final-run:	0,
	 		action:				1
	 		}
	 	effects: {
	 				{
	 					type: 'ap',
	 					who: 'me',
	 					value: -4
	 				},
	 				{
	 					type: 'hour',
	 					who: 'me',
	 					value: -1
	 				},
	 				{
	 					type: 'ap'
	 					who: 'team',
	 					value: 4
	 					
	 				}
	 	}
	 }
	 
	 exemple 2:
	 
	 */
	
	this.GetMemberSkills = function(){
		return skills;
	}
	
	this.UseSkill = function(name){

		mySkills = this.GetMemberSkills(); 
		
		$.each(mySkills, function(index, skill){		
			console.log(skill.slug);
			if(skill.slug == name && skill.usageCount > 0){
				console.log(skill);
				DoEffects(skill.effects);
				return false; // looking for one item only
			}
		});
	}
	
	function DoEffects(effects){
		
		$.each(effects, function(index, effect){
			var membersIndex = new Array();
			
			switch(effect.who){
				case 'me':
					membersIndex.add(memberAttributes.index);
					break;
				case 'team':
					$.each(team.members, function(memberIndex, member){
						membersIndex.add(memberIndex);
					});
					break;
			}
			
			$.each(index, function(memberIndex, member){
				DoEffect(memberIndex, effect);
			});
					
		});
	}
	
	function DoEffect(memberIndex, effect){
		console.log(effect.type + " "  +effect.who+" "+effect.value);
		
		switch (effect){
			case 'AP': // action points
				
				break;
			
			
		}
		
		
	}
	
}

function TimeObject(setDay, setHour) {
	this.day = setDay;
	this.hour = setHour;
}

function EventObject(day, hour, callback, type, memberIndex) {
	this.time 			= new TimeObject(day, hour);
	this.type 			= type;
	this.memberIndex 	= memberIndex;
	this.isDone 		= 0;
	this.toDo 			= function() {
							if(callback && typeof (callback) === "function") {
								callback();
							}
						}
	this.addHours		= function(hours){
		this.time  = CalculPlusTime(hours, this.time);
	}
	
	
}

/* FUNCTIONS */
function rollDice(side, fail) {
	//attributs de base
	fail = !fail ? 5 : fail;
	side = !side ? 6 : side;

	var dice = Math.floor(Math.random() * (side + 1));

	if(dice > 0) {
		if(dice >= fail) {
			result = 0;
		} else {
			result = 1;
		}

		cyLogger.log('Dice roll - Dice: ' + dice + ' | Fail: ' + fail + '+ | Success: <strong>' + result + '</strong>', 'normal');

		return result;
	} else {
		cyLogger.log('Dice roll - Dice: ' + dice + ' >> reroll', 'info');
		return rollDice(side, fail);
	}

}