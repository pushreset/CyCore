function loadSoundAPI(){

	soundManager.url = 'lib/swf/';
	soundManager.flashVersion = 9; // optional: shiny features (default = 8)
	soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in
	// enable HTML5 audio support, if you're feeling adventurous. iPad/iPhone will always get this.
	soundManager.useHTML5Audio = true;
	soundManager.onready(function() {
	
		soundManager.createSound({
		  id: 'ost-preparations',
		  url: 'sound/preparations-v2.mp3',
		  autoLoad: true,
		  autoPlay: false,
		  onload: function() {
		    //alert('The sound '+this.sID+' loaded!');
		  },
		  volume: 50
		});
		
		//soundManager.play('ost-preparations')
	
	});

}