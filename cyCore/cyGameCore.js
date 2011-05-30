/* CLASSES */

function MissionObject(domains){
  var timeOut; //un temps d'exÃ©cution en jours
  var target; //une corporation cible
  var jonhson; //une corporation commanditaire
  var prize; //une rÃ©compense en neoyens
  var doubleCross; //une probabilite de double cross en D6
  var tracing; //une probabilitÃ© de traÃ§age par la cible en cas d'Ã©chec en d6
  var domains = domains; //des seuils de difficultÃ© dans 4 domaine : magie, combat, hacking et contact en d6
  var reputation; //un niveau de rÃ©putation minimum pour Ãªtre sÃ©lectionnÃ© pour la mission
  
  //POOL D6 miser sur la mission 
  var combatPool			= new Array();
  var magicPool				= new Array();
  var hackingPool			= new Array();
  var contactPool			= new Array();
  var combatPoolCount		= 0;
  var magicPoolCount		= 0;
  var hackingPoolCount		= 0;
  var contactPoolCount		= 0;
  var diceOnSuccess			= new Array(); // Dés lancé et en succès avec index perso
  
  var missionIsOnSuccess	= false;
  
  this.timeEvent = new Array(); //stockage des time event
 
  var timeOutSetted = false; // time out is already setted
  var missionLaunched = false; // mission has begun
 
  this.GetDifficulty = function(){
	  return domains;
  };
  
  // Execute toutes les actions lors de la résolution final à la fin du timing
  this.ResolveDicesPools = function(){	  
	 
	// construction des tableau indiquant les D6 disponible
  	$.each(team.members, function(index, data){  		
  		ConstructPoolDiceArray(data.GetCombatPool(), index, 'combat');
  		ConstructPoolDiceArray(data.GetMagicPool(), index, 'magic');
  		ConstructPoolDiceArray(data.GetHackingPool(), index, 'hacking');
  		ConstructPoolDiceArray(data.GetContactPool(), index, 'contact');		
	});
	  	
  	console.log(combatPool);
	console.log(magicPool);
	console.log(hackingPool);
	console.log(contactPool);
	
	combatPoolCount = count(combatPool);
	magicPoolCount = count(magicPool);
	hackingPoolCount = count(hackingPool);
	contactPoolCount = count(contactPool);
	  
	cyLogger.log('TOTAL POOLS | Combat: '+combatPoolCount+' Magie: '+magicPoolCount+' Hacking: '+hackingPoolCount+' Contact: '+contactPoolCount,INFO_CYLOG);

	if (this.IfMissionIsSuccess()){
		missionIsOnSuccess = true;
		return 'mission success';
	}
	else{
		missionIsOnSuccess = false;
		return 'mission failed';
	}
	
  };
  
  this.IfMissionIsSuccess = function(){
	  var difficulty = mission.GetDifficulty();
	  if (combatPoolCount >= difficulty.combat && magicPoolCount >= difficulty.magic && hackingPoolCount >= difficulty.hacking && contactPoolCount >= difficulty.contact){
		return true;	
	  }
	  else{
		return false;
	  }
  };
  
  // Construit les tableaux de D6 en succès
  // un index de personnage par dé
  function ConstructPoolDiceArray(dice, index, type){	  
  		for (i=0; i<dice; i++) {	  			
  			if (rollDice()){
  				switch (type){
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
  
  this.RollPackDice = function(number, side, fail){
	  var success = 0;
	  
	  for (i=1; i<=number; i++) {
		 success = success + rollDice(side, fail);
	  }
	  
	  cyLogger.log('RollPackDice | success: '+success,INFO_CYLOG);
	  return success;
	  
  };
  
  //callback when timeOut
  TimeOutMission = function(){
	  cyLogger.log('TimeOutMission',INFO_CYLOG);
  };
  
  // set time event
  this.SetTimeOut = function(day, hour){
	  if (!timeOutSetted){
		  this.timeEvent.push(new EventObject(day,hour,TimeOutMission));
		  timeOutSetted = true;
	  }
	  else {
		  cyLogger.log('SetTimeOut : Already Setted !',WARNING_CYLOG);
	  }
	  
  };
  
  
  // set time event
  this.SetTimeEvent = function(day, hour, callback){
      this.timeEvent.push(new EventObject(day,hour,callback));  
  };
  
  
}

function TeamObject(){
	
	this.members = new Array();
	
	this.addMember = function(name, magie, combat, hacking, contact, actionPoints, magieCost, combatCost, hackingCost, contactCost){
		this.members.push(new TeamMemberObject(name, magie, combat, hacking, contact, actionPoints, magieCost, combatCost, hackingCost, contactCost));
	};
	
}

function TeamMemberObject(name, magie, combat, hacking, contact, actionPoints, magieCost, combatCost, hackingCost, contactCost){	
	var name 			= name;
	var magie 			= magie;
	var combat 			= combat;
	var hacking 		= hacking;
	var contact 		= contact;
	
	var action 			= actionPoints;
	
	var magieCost 		= magieCost ? magieCost : 2;
	var combatCost 		= combatCost ? combatCost : 2;
	var hackingCost 	= hackingCost ? hackingCost : 2;
	var contactCost 	= contactCost ? contactCost : 2;
	
	var poolMagie 		= 0;
	var poolCombat 		= 0;
	var poolHacking 	= 0;
	var poolContact 	= 0;
	
	this.poolAvailable	= 0;
	
	function initialize(){
		
	}
	initialize();	
	
	this.GetMagicPool = function(){
		return poolMagie;
	};
	
	this.GetCombatPool = function(){
		return poolCombat;
	};
	
	this.GetHackingPool = function(){
		return poolHacking;
	};
	
	this.GetContactPool = function(){
		return poolContact;
	};
	
	this.GetName = function(){
		return name;
	};
	
	this.GetMagic = function(){
		return magie;
	};
	
	this.GetCombat = function(){
		return combat;
	};
	
	this.GetHacking = function(){
		return hacking;
	};
	
	this.GetContactP = function(){
		return contact;
	};
	
	this.ShowStats = function(){
		cyLogger.log('"'+name+'" M'+magie+' C'+combat+' H'+hacking+' C'+contact+' | PA'+action+' | pM'+poolMagie+' pC'+poolCombat+' pH'+poolHacking+' pC'+poolContact, INFO_CYLOG);
	};
	
	this.AddMagicPoolDice = function(){
		
		var ifActionAvailable = this.ActionAvailable(magieCost);
		var ifPoolNotAtMax = this.CheckDomainMax(magie, poolMagie);
		
		if (ifActionAvailable && ifPoolNotAtMax){
			poolMagie++;
			action = action - magieCost;
			this.ShowStats();
		}
		else if (!ifPoolNotAtMax){
			cyLogger.log('"'+name+'" Magic Pool already MAX ! !',WARNING_CYLOG);
			return false;
		}
		else if (!ifActionAvailable){
			cyLogger.log('"'+name+'" No action point available ! !',WARNING_CYLOG);
			return false;
		}
	};
	
	this.AddCombatPoolDice = function(){
		
		var ifActionAvailable = this.ActionAvailable(combatCost);
		var ifPoolNotAtMax = this.CheckDomainMax(combat, poolCombat);
		
		if (ifActionAvailable && ifPoolNotAtMax){
			poolCombat++;
			action = action - combatCost;
			this.ShowStats();
		}
		else if (!ifPoolNotAtMax){
			cyLogger.log('"'+name+'" Combat Pool already MAX ! !',WARNING_CYLOG);
			return false;
		}
		else if (!ifActionAvailable){
			cyLogger.log('"'+name+'" No action point available ! !',WARNING_CYLOG);
			return false;
		}
	};
	
	this.AddHackingPoolDice = function(){
		
		var ifActionAvailable = this.ActionAvailable(hackingCost);
		var ifPoolNotAtMax = this.CheckDomainMax(hacking, poolHacking);
		
		if (ifActionAvailable && ifPoolNotAtMax){
			poolHacking++;
			action = action - hackingCost;
			this.ShowStats();
		}
		else if (!ifPoolNotAtMax){
			cyLogger.log('"'+name+'" hacking Pool already MAX ! !',WARNING_CYLOG);
			return false;
		}
		else if (!ifActionAvailable){
			cyLogger.log('"'+name+'" No action point available ! !',WARNING_CYLOG);
			return false;
		}
	};
	
	this.AddContactPoolDice = function(){
		
		var ifActionAvailable = this.ActionAvailable(contactCost);
		var ifPoolNotAtMax = this.CheckDomainMax(contact, poolContact);
		
		if (ifActionAvailable && ifPoolNotAtMax){
			poolContact++;
			action = action - contactCost;
			this.ShowStats();
		}
		else if (!ifPoolNotAtMax){
			cyLogger.log('"'+name+'" contact Pool already MAX ! !',WARNING_CYLOG);
			return false;
		}
		else if (!ifActionAvailable){
			cyLogger.log('"'+name+'" No action point available ! !',WARNING_CYLOG);
			return false;
		}
	};
	
	
	//check if action available
	this.ActionAvailable = function(needed){		
		totalIfUse = action - needed; 		
		if (totalIfUse >= 0){
			return true;
		}
		else {
			return false;
		}		
	};
	
	//check if Pool at max
	this.CheckDomainMax = function(domain, pool){				
		if (pool >= domain){
			return false;
		}
		else {
			return true;
		}		
	};
	
}

function TimeObject(setDay, setHour) {
	this.day = setDay;
	this.hour = setHour;
}

function EventObject(day, hour, callback){	
	this.time =  new TimeObject(day, hour);	
	this.toDo = function(){

    if (callback && typeof(callback) === "function") {
        callback();
    }
  };
}

/* FUNCTIONS */
function rollDice(side, fail){
  //attributs de base
  fail = !fail ? 5 : fail;
  side = !side ? 6 : side;
  
  var dice = Math.floor(Math.random()*(side+1));
  
  if (dice > 0){
    if (dice >= fail){
          result = 0;
    }
    else {
          result = 1;
    }
    
    cyLogger.log('Dice roll - Dice: '+dice+' | Fail: '+fail+'+ | Success: <strong>'+result+'</strong>', 'normal');
    
    return result;
  }
  else {
    cyLogger.log('Dice roll - Dice: '+dice+' >> reroll', 'info');
    return rollDice(side, fail);
  }
  
}
