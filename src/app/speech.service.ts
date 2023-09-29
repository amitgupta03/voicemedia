import { Injectable } from '@angular/core';
//@ts-ignore
import * as RecordRTC from 'recordrtc';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {
  private recordRTC: any;

  constructor() {
    this.recordRTC = null;
  }

  synthesizeAndDownload(text: string): void {
    const speechUtterance = new SpeechSynthesisUtterance(text);
    const audioContext = new AudioContext();
    const mediaStream = audioContext.createMediaStreamDestination().stream;

    this.recordRTC = RecordRTC(mediaStream, {
      type: 'audio'
    });

    speechUtterance.addEventListener('end', () => {
      this.recordRTC.stopRecording(() => {
        const audioBlob = this.recordRTC.getBlob();
        const audioUrl = URL.createObjectURL(audioBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = 'synthesized-speech.wav';
        downloadLink.textContent = 'Download Synthesized Speech';
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
    });

    this.recordRTC.startRecording();
    window.speechSynthesis.speak(speechUtterance);
  }
}
