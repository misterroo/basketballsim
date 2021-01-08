import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {
  playByPlayData = [];
  substitutionPatternData = '';
  private tokenSource = new BehaviorSubject('');
  currentToken = this.tokenSource.asObservable();

  private updatedToken = new BehaviorSubject('');
  changedToken = this.updatedToken.asObservable();

  private modelSource = new BehaviorSubject(false);
  currentModel = this.modelSource.asObservable();

  changeToken(message: string){
    this.tokenSource.next(message);
  }
  changeModel(message: any){
    this.modelSource.next(message);
  }
  updateToken(message: string){
    this.updatedToken.next(message);
  }

  setPlaybyPlayData(data) {
    this.playByPlayData = data;
  }
  getPlayByPlayData() {
    return this.playByPlayData;
  }

  setsubstitutionPatternData(data) {
    this.substitutionPatternData = data;
  }
  getsubstitutionPatternData() {
    return this.substitutionPatternData;
  }
}
