/*jshint undef:false */
var AudioController = Class.extend({
	init:function(){
		// alert(window.location.pathname);
		// var media = new Media('sounds/loop.mp3', function(){
		// 	alert('success');
		// }, function(error){
		// 	alert(error.message);
		// });
		// media.play();
		this.audioList = [
			{
				label:'loop',
				urls: ['dist/audio/loop.mp3','sounds/loop.mp3','dist/audio/wub.ogg'],
				// urls: ['dist/audio/star.mp3'],
				volume: 0.1,
				loop: true
			},
			{
				label:'wub',
				urls: ['dist/audio/wub.mp3','dist/audio/wub.ogg'],
				volume: 0.2,
				loop: false
			},
			{
				label:'error',
				urls: ['dist/audio/error.mp3'],
				volume: 0.5,
				loop: false
			},
			{
				label:'laser1',
				urls: ['dist/audio/laser1.mp3'],
				volume: 0.05,
				loop: false
			},
			{
				label:'laser2',
				urls: ['dist/audio/laser2.mp3'],
				volume: 0.05,
				loop: false
			},
			{
				label:'laser3',
				urls: ['dist/audio/laser3.mp3'],
				volume: 0.05,
				loop: false
			},
			{
				label:'laser4',
				urls: ['dist/audio/laser4.mp3'],
				volume: 0.05,
				loop: false
			},
			{
				label:'fall',
				urls: ['dist/audio/fall.mp3'],
				volume: 0.3,
				loop: false
			},
			{
				label:'explode1',
				urls: ['dist/audio/explode1.mp3'],
				volume: 0.15,
				loop: false
			},
			{
				label:'play',
				urls: ['dist/audio/play.mp3'],
				volume: 0.6,
				loop: false
			},
			{
				label:'perfect',
				urls: ['dist/audio/perfect.mp3'],
				volume: 0.1,
				loop: false
			},
		];
		this.onCompleteCallback = null;
		this.loadedAudioComplete = false;
		this.audios = [];
		var self = this;
		function loadError(error){
			// alert(error.message);
		}
		function end(){
			// console.log('end');
			self.updateAudioList(this);
		}
		function load(){
			// alert('load');
			self.currentLoaded ++;
			// console.log(self.currentLoaded);
			if(self.currentLoaded >= self.audioList.length){
				self.loadedAudioComplete = true;
				// console.log('all loaded');
				if(self.onCompleteCallback){
					self.onCompleteCallback();
				}
			}
		}
		for (var i = this.audioList.length - 1; i >= 0; i--) {
			// console.log(this.audioList[i].loop);
			var tempObj = {
				label:this.audioList[i].label,
				audio:new Howl({
					urls:this.audioList[i].urls,
					volume: this.audioList[i].volume,
					// sprite: this.audioList[i].sprite?this.audioList[i].sprite:null,
					loop: this.audioList[i].loop,
					onend: end,
					onload: load,
					onloaderror: loadError
				})
			};
			// console.log(this.audioList[i].loop,'audio');
			if(!this.audioList[i].loop){
				// console.log('set');
				tempObj.audio.onend = end;
			}
			this.audios.push(tempObj);
			// });
		}

		this.currentLoaded = 0;
		// this.ambientSound1 = new Howl({
		// 	urls: ['dist/audio/trilha.mp3', 'dist/audio/trilha.ogg'],
		// 	volume: 0.1,
		// 	loop: true,
		// });

		// this.alcemar = new Howl({
		// 	urls: ['dist/audio/aves_raras.mp3', 'dist/audio/aves_raras.ogg'],
		// 	volume: 0.8,
		// 	sprite: {
		// 		audio1: [0, 7000]
		// 	}
		// });

		this.playingAudios = [];
		this.ambientLabel = '';
	},
	updateAudioList:function(target){
		if(this.ambientPlaying === target){
			this.playSound(this.ambientLabel);
			// console.log('isAmbient', this.ambientLabel);
			return;
		}
		for (var j = this.playingAudios.length - 1; j >= 0; j--) {
			if(this.playingAudios[j] === target){
				this.playingAudios.splice(j,1);
			}
		}
		// console.log(this.playingAudios);
	},
	playSound:function(id){
		var audioP = null;
		for (var i = this.audios.length - 1; i >= 0; i--) {
			if(this.audios[i].label === id){
				audioP = this.audios[i].audio;
				audioP.play();
				this.playingAudios.push(audioP);
			}
		}
		// alert(audioP);
		// console.log(audioP);
		return audioP;
	},
	stopSound:function(id){
		var audioP = null;
		for (var i = this.audios.length - 1; i >= 0; i--) {
			if(this.audios[i].label === id){
				audioP = this.audios[i].audio;
				audioP.stop();
				for (var j = this.playingAudios.length - 1; j >= 0; j--) {
					if(this.playingAudios[j] === audioP){
						this.playingAudios.splice(j,1);
					}
				}
			}
		}
		return audioP;
	},
	playAmbientSound:function(id){
		if(this.ambientLabel === id){
			return;
		}

		if(this.ambientPlaying){
			// this.ambientPlaying.stop();
			this.stopSound(this.ambientLabel);
		}
		this.ambientLabel = id;
		this.ambientPlaying = this.playSound(id);
	}
});