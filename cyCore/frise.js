var friseElement;
var elapsedElement;
var friseWidth;
var oneHourWidth;
var friseRunning = false; //set if frise is currently running or not
var runFrise = false; //set if frise have to be paused or not
var dayOfWeek = 1;
var hourOfDay = 0;
var checkFrise;

// Go to nextHour
function FriseNextHour(instruction){
  cyLogger.log('FriseNextHour - starting', 'normal');
  if(instruction==='lastDay'){
	 var newWidth = '100%';
  }
  else{
   var newWidth = elapsedElement.width() + oneHourWidth +'px';
  }
  //console.log(friseWidth+' - '+newWidth+' '+elapsedElement.width());
  elapsedElement.animate({
	    width: newWidth
	  },
    hourDuration,
    function() {
		  friseRunning = false;
		  cyLogger.log('FriseNextHour - ending', 'normal');
	  });	
}

function FriseCore(){
	var haveToRun = (!friseRunning && runFrise===true);
	if (haveToRun){
		cyLogger.log('FriseCore - Running', 'normal');
	    friseRunning = true;
	    currentTime.hour++;
	    	
		$.doWhen(CheckTimeEvent, function(){
		    cyLogger.log('FriseCore - pass CheckTimeEvent - day: '+currentTime.day+' hour: '+currentTime.hour, 'normal');
		  	if (currentTime.hour == 24){
		  		  FriseNextHour('lastDay');
		    }
		     else if (currentTime.hour == 25){
		  			currentTime.day++;
		  			currentTime.hour = 1;
		  			elapsedElement.width('0px');
		  			cyLogger.log('FriseCore - This is a new day !', INFO_CYLOG);
		  			FriseNextHour();
		  	} 
		  	else{
		        FriseNextHour();
		    }
		});		
		
	}
	else {
		return false;
	}
}

function CheckTimeEvent(){
    cyLogger.log('checkTimeEvent - '+currentTime.day+'/'+currentTime.hour, 'normal');
    for(x in mission.timeEvent){
        if(CompareObject(mission.timeEvent[x].time, currentTime)){
           cyLogger.log('checkTimeEvent - Event found ! ', 'info', StopFrise);
           mission.timeEvent[x].toDo();
        }   
    }
    return true; 
}

function TimeOutMission(){
  cyLogger.log('Mission time out !', 'info');
  StopFrise();
}

function StopFrise(){
  runFrise = false;
  cyLogger.log('STOP FRISE', 'warning');
}

function StartFrise(){
  runFrise = true;
  cyLogger.log('GO FRISE', 'warning');
}

function CalculPlusTime(hours){
	//hourOfDay	dayOfWeek
	var daysPlus = 0;
	var hoursPlus = 0;
	
	var hourFinal;
	var dayFinal;
	
	//check if hours >= days
	if (hours >= 24){
		
		daysPlus = round(hours / 24);
		hoursPlus = round(hours % 24);
		
		//console.log(daysPlus +' '+ hoursPlus);
		
	}
	else{
		hoursPlus = hours;
	}
	
	hourFinal = currentTime.hour + hoursPlus;
	
	//console.log('hourOfDay: '+hourOfDay);
	//console.log('hourPlus: '+hourFinal);
	
	if (hourFinal >= 25 ){
		daysPlus++;		
		hourFinal = hourFinal - 24;		
	}
	
	dayFinal = currentTime.day + daysPlus;
	
	return new Array({day: dayFinal, hour: hourFinal});
	
}