import { Component, OnInit } from "@angular/core";
import { TNSPlayer } from 'nativescript-audio-player';

@Component({
    selector: "topos_tag",
    moduleId: module.id,
    templateUrl: "topos.component.html",
    styleUrls: ["topos.component.css"]
})

export class TopoComponent implements OnInit{
    puntos = 0;

    estadoJuego = true

    vidas = Array(5);

    id = null;

    forats = [];

    forat = "forat";

    topo = "topo";

    tiempo = 0;

    altura = 0;

    private audioPlayer: TNSPlayer;

    ngOnInit(){
        
    }

    iniciarJuego(){
        this.estadoJuego = false;
        this.vidas = Array(5);
        this.puntos = 0
        this.forats = Array(3).fill(this.forat);
        this.tiempo = 650;
        this.altura = 200;
        this.inciarTimer();

        this.audioPlayer = new TNSPlayer();
    }


    inciarTimer(){
        this.id = setInterval(() => {
            if(this.vidas.length==0){
                for(var i=0;i<this.forats.length;i++){
                    this.forats[i] = this.forat;
                }
                clearInterval(this.id);
                this.estadoJuego = true
                this.audioPlayer.initFromFile({
                    audioFile: '~/audio/perder.mp3',
                    loop: false
                })
                this.audioPlayer.play();
            }else{
                let filas = Math.floor(this.puntos / 100);
                if(this.puntos > 100 && this.puntos <= 700 && filas == this.forats.length/3){
                    this.forats.splice(this.forats.length-1,0,this.forat,this.forat,this.forat);
                    this.altura += 200;
                    this.tiempo -= 50;
                    clearInterval(this.id);
                    this.inciarTimer();
                }
                let pos = Math.floor(Math.random() * this.forats.length);
                this.cambiarEstadoAgujero(pos);
            }
        },this.tiempo);
    }

    cambiarEstadoAgujero(pos) {
        //this.forats[pos] = this.forats[pos]=="forat"?"topo":"forat";
        if(this.forats[pos] == this.topo){
            this.forats[pos] = this.forat;
            if(this.vidas.length>0){
                this.vidas.length--;
            }
        }else{
            this.forats[pos] = this.topo; 
        }
    }

    aplastarTopo(pos){
        if(!this.estadoJuego){
            if(this.forats[pos] == this.topo){
                this.audioPlayer.initFromFile({
                    audioFile: '~/audio/aplastar.mp3',
                    loop: false
                })
                this.audioPlayer.play();
                this.puntos +=15;
                this.forats[pos] = this.forat;
            }else{
                this.audioPlayer.initFromFile({
                    audioFile: '~/audio/fail.mp3',
                    loop: false
                })
                this.audioPlayer.play();
                this.puntos -=5;
            }
        }
    }
}