import { Component } from '@angular/core';
import { countryCodes } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  texttospeech: string | undefined;
  synth = window.speechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: SpeechSynthesisVoice | any;
  speed: any = 1;
  pitch: any = 1;
  selectedCountry: any;
  filteredVoices: SpeechSynthesisVoice[] | any = [];
  countries: any[] = [];

  constructor() {

  }

  ngOnInit() {
    this.texttospeech =
      'Welcome to the Free Voice Media AI tool, where you can seamlessly convert text to speech at absolutely no cost, and with no imposed character limits.';
    setTimeout(() => this.loadVoices(), 1000);
  }

  removeDuplicatesByKey(arr: any[], key: string) {
    const uniqueValues = new Set();
    return arr.filter((obj: { [x: string]: unknown; }) => !uniqueValues.has(obj[key]) && uniqueValues.add(obj[key]));
  }
  
   

  loadVoices() {
    this.voices = this.synth.getVoices();
    console.table(this.voices)
    this.countries = countryCodes //this.removeDuplicatesByKey(this.voices, 'lang');
  }

  changeSpeakers(selectedCountry: any) {
    this.stop();
    this.filteredVoices = this.voices.filter(
      (voice: any) => voice.lang.includes(selectedCountry)
    );
  }

  speak() {
    this.stop();
    const utterThis = new SpeechSynthesisUtterance(this.texttospeech);
    utterThis.rate = this.speed;
    utterThis.pitch = this.pitch;
    utterThis.voice = this.selectedVoice;
    this.synth.speak(utterThis);
  }

  reset() {
    this.texttospeech = '';
    this.stop();
  }

  // I stop any current speech synthesis.
  public stop(): void {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }

  public onValueChange(event: Event): void {
    console.log(event.target);
    const value = (event.target as any).value;
    this.texttospeech = value;
  }

  
}
