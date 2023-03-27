//Manages input and sends out a event that can be listend to
import { MIDIDataTable } from "./MIDIDataTable";

// var prevTimestamp = 0;
// var bpm = 0;

export class InputManager {
    ch1PrevHoldingKeys: string[];
    ch1HoldingKeys: string[];
    ch1Velocity: number[];
    
    ch2PrevHoldingKeys: string[];
    ch2HoldingKeys: string[];
    ch2Velocity: number[];
    
    ch3PrevHoldingKeys: string[];
    ch3HoldingKeys: string[];
    ch3Velocity: number[];

    ch4PrevHoldingKeys: string[];
    ch4HoldingKeys: string[];
    ch4Velocity: number[];

    oldBPM: number;
    bpm: number;
    prevTimestamp: number;
    clockCount: number;

    
    constructor() {
        this.InitVariables();
        console.log("CREATED InputManager");
    }

    InitVariables() {
        //Arrays that save from X channel the keys that you hold
        this.ch1PrevHoldingKeys = [];
        this.ch1HoldingKeys = [];
        this.ch1Velocity = [];

        this.ch2PrevHoldingKeys = [];
        this.ch2HoldingKeys = [];
        this.ch2Velocity = [];

        this.ch3PrevHoldingKeys = [];
        this.ch3HoldingKeys = [];
        this.ch3Velocity = [];

        this.ch4PrevHoldingKeys = [];
        this.ch4HoldingKeys = [];
        this.ch4Velocity = [];

        // this.prevHoldingKeys = [];
        // this.holdingKeys = []; //if a NoteOn message is sent, add the key here

        this.prevTimestamp = 0;
        this.oldBPM = 0;
        this.bpm = 0;
        this.clockCount = 0;
    }

    GetMIDIInput(message) {
        let [command, note, velocity] = message.data;
        this.CalcBPM(message);
        
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        //console.log("Raw command:" + stringCommand);
        if(stringCommand.includes("NoteOn")) {
            let ch = Number(stringCommand.replace(/\D+/g, "")); 
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            switch(ch) {
                case 1:
                    this.UpdateHoldingKeys(stringCommand, 1, stringNote, velocity);
                    break;
                case 2:
                    this.UpdateHoldingKeys(stringCommand, 2, stringNote, velocity);
                    break;
                case 3:
                    this.UpdateHoldingKeys(stringCommand, 3, stringNote, velocity);
                    break;
                case 4:
                    this.UpdateHoldingKeys(stringCommand, 4, stringNote, velocity);
                    break;
            }
            
            // if(stringCommand.includes("CH: 1")) {
            //     this.UpdateHoldingKeys(stringCommand, 1, stringNote);
            // }
            // if(stringCommand.includes("CH: 2")) {
            //     this.UpdateHoldingKeys(stringCommand, 2, stringNote);
            // }


        } else if(stringCommand.includes("NoteOff")) {
            let ch = Number(stringCommand.replace(/\D+/g, "")); 
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            
            switch(ch) {
                case 1:
                    this.UpdateHoldingKeys(stringCommand, 1, stringNote, velocity);
                    break;
                case 2:
                    this.UpdateHoldingKeys(stringCommand, 2, stringNote, velocity);
                    break;
                case 3:
                    this.UpdateHoldingKeys(stringCommand, 3, stringNote, velocity);
                    break;
                case 4:
                    this.UpdateHoldingKeys(stringCommand, 4, stringNote, velocity);
                    break;

            }
        }
    }
    GetInputKeyboard(command, note, velocity) {
        console.log("KEYBOARD detected");
        let stringCommand = MIDIDataTable.MIDICommandToString(command);
        // console.log("command:" + command);
        // console.log("note:" + note);
        // console.log("velocity:" + velocity);

        if(stringCommand.includes("NoteOn")) {
            let ch = Number(stringCommand.replace(/\D+/g, "")); 
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            switch(ch) {
                case 1:
                    this.UpdateHoldingKeys(stringCommand, 1, stringNote, velocity);
                    break;
                case 2:
                    this.UpdateHoldingKeys(stringCommand, 2, stringNote, velocity);
                    break;
                case 3:
                    this.UpdateHoldingKeys(stringCommand, 3, stringNote, velocity);
                    break;
                case 4:
                    this.UpdateHoldingKeys(stringCommand, 4, stringNote, velocity);
                    break;
            }
        } else if(stringCommand.includes("NoteOff")) {
            let ch = Number(stringCommand.replace(/\D+/g, "")); 
            let stringNote = MIDIDataTable.MIDINoteToString(note);
            
            switch(ch) {
                case 1:
                    this.UpdateHoldingKeys(stringCommand, 1, stringNote, velocity);
                    break;
                case 2:
                    this.UpdateHoldingKeys(stringCommand, 2, stringNote, velocity);
                    break;
                case 3:
                    this.UpdateHoldingKeys(stringCommand, 3, stringNote, velocity);
                    break;
                case 4:
                    this.UpdateHoldingKeys(stringCommand, 4, stringNote, velocity);
                    break;

            }
        }
    }
    UpdateHoldingKeys(stringCommand, channel, stringNote, velocity) {
        //If command includes NoteOn
        if(stringCommand.includes("NoteOn")) {
            switch(channel) {
                case 1:
                    if(!this.ch1HoldingKeys.includes(stringNote)) {
                        this.ch1HoldingKeys.push(stringNote);
                        this.ch1Velocity.push(velocity);
                    }
                    break;
                case 2:
                    if(!this.ch2HoldingKeys.includes(stringNote)) {
                        this.ch2HoldingKeys.push(stringNote);
                        this.ch2Velocity.push(velocity);
                    }
                    break;
                case 3:
                    if(!this.ch3HoldingKeys.includes(stringNote)) {
                        this.ch3HoldingKeys.push(stringNote);
                        this.ch3Velocity.push(velocity);
                    }
                    break;
                case 4:
                    if(!this.ch4HoldingKeys.includes(stringNote)) {
                        this.ch4HoldingKeys.push(stringNote);
                        this.ch4Velocity.push(velocity);
                    }
                    break;
            }
            // console.log("Turn on Note " + stringNote + " on channel CH: " + channel);
        } 
        //If command includes NoteOff
        else if(stringCommand.includes("NoteOff")) {
            // console.log("Turn off Note " + stringNote + " on channel CH: " + channel);
            switch(channel) {
                case 1:
                    if(this.ch1HoldingKeys.includes(stringNote)) {
                        //console.log("Remove " + stringNote + " from array");
                        let rmIndex = this.ch1HoldingKeys.indexOf(stringNote);
                        this.ch1HoldingKeys.splice(rmIndex, 1);
                        this.ch1Velocity.splice(rmIndex, 1);
                        // this.ch1HoldingKeys.pop(stringNote);
                    }
                    break;
                case 2:
                    if(this.ch2HoldingKeys.includes(stringNote)) {
                        let rmIndex = this.ch2HoldingKeys.indexOf(stringNote);
                        this.ch2HoldingKeys.splice(rmIndex, 1);
                        this.ch2Velocity.splice(rmIndex, 1);
                    }
                    break;
                case 3:
                    if(this.ch3HoldingKeys.includes(stringNote)) {
                        let rmIndex = this.ch3HoldingKeys.indexOf(stringNote);
                        this.ch3HoldingKeys.splice(rmIndex, 1);
                        this.ch3Velocity.splice(rmIndex, 1);
                        //this.ch3HoldingKeys.pop(stringNote);
                    }
                    break;
                case 4:
                    if(this.ch4HoldingKeys.includes(stringNote)) {
                        let rmIndex = this.ch4HoldingKeys.indexOf(stringNote);
                        this.ch4HoldingKeys.splice(rmIndex, 1);
                        this.ch4Velocity.splice(rmIndex, 1);
                        //this.ch4HoldingKeys.pop(stringNote);
                    }
                    break;
            }
        }

        //Debugging Code
        // if(this.ch1HoldingKeys.length != this.ch1PrevHoldingKeys.length) {
        //     console.log("CH: 1 Keys: " + this.ch1HoldingKeys);
        // }
        // else if(this.ch2HoldingKeys.length != this.ch2PrevHoldingKeys.length) {
        //     console.log("CH: 2 Keys: " + this.ch2HoldingKeys);
        // }
        // else if(this.ch3HoldingKeys.length != this.ch3PrevHoldingKeys.length) {
        //     console.log("CH: 3 Keys: " + this.ch3HoldingKeys);
        // }
        // else if(this.ch4HoldingKeys.length != this.ch4PrevHoldingKeys.length) {
        //     console.log("CH: 4 Keys: " + this.ch4HoldingKeys);
        // }

        // this.ch1PrevHoldingKeys = Array.from(this.ch1HoldingKeys);
        // this.ch2PrevHoldingKeys = Array.from(this.ch2HoldingKeys);
        // this.ch3PrevHoldingKeys = Array.from(this.ch3HoldingKeys);
        // this.ch4PrevHoldingKeys = Array.from(this.ch4HoldingKeys);

    }
    GetHoldingKeys(channel) {
        switch(channel) {
            case 1: return this.ch1HoldingKeys;
            case 2: return this.ch2HoldingKeys;
            case 3: return this.ch3HoldingKeys;
            case 4: return this.ch4HoldingKeys;
        }
    }
    GetVelocityHoldingKeys(channel) {
        switch(channel) {
            case 1: return this.ch1Velocity;
            case 2: return this.ch2Velocity;
            case 3: return this.ch3Velocity;
            case 4: return this.ch4Velocity;
        }
    }
    CalcBPM(message) {
        if (message.data[0] == 248) { // MIDI Clock message
            this.clockCount++;
            if (this.clockCount == 96) {
                //Calculate deltaTime
                let deltaTime = message.timeStamp - this.prevTimestamp;
                
                //Update values
                this.oldBPM = this.bpm; //Store current BPM
                this.bpm = Math.round(60 / (deltaTime / 1000) * 4);
                this.prevTimestamp = message.timeStamp;
              
                //If bpm changed, put it into console
                if(this.oldBPM != this.bpm) console.log("BPM:" + this.bpm);
              
                this.clockCount = 0;
            }
        }
    }
    GetBPM() {
        // console.log("GETTING BPM for website");
        return this.bpm;
    }
}