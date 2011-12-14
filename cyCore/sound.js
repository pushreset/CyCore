//use buzz.jz
function cyCoreMusics(){
		
		var isActivated = false;
		
		function init(){
			buzz.defaults.preload 	= true;
			buzz.defaults.loop 		= true;
			buzz.defaults.duration 	= 5000;
			buzz.defaults.formats 	= ['ogg', 'mp3']; 
			
		}
		
		init();
		
		var currentlyRunning = '';
		var soundFolder = '/sound/';
		//var soundFolder = 'http://www.pushreset.fr/cycore/sound/';
		
		var musics = {
			preparations: 		new buzz.sound(soundFolder+"preparations"),
			menu:				new buzz.sound(soundFolder+"menu"),
			battle:				new buzz.sound(soundFolder+"battle2project")
		}
		
		this.Play = function(musicName){
			
			if (currentlyRunning != musicName){
				if(!currentlyRunning){
					musics[musicName].play();
				}
				else{
					musics[currentlyRunning].fadeWith( musics[musicName], 2000);
				}
				currentlyRunning = musicName;
			}
		}
		
		this.StopAll = function(){		
			musics[currentlyRunning].mute();
		}

		this.preload = function(){
			$.each(musics, function(index, music) {
				music.load();
			});
		}
}