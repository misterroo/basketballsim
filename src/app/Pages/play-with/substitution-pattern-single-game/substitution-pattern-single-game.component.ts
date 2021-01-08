import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../../../../services/admin.service';
import { NotifierService } from 'angular-notifier';
import { Location } from '@angular/common';  //5, 19
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DraftPlayerSingleGameComponent } from '../draft-player-single-game/draft-player-single-game.component';
// import { EventEmitter } from 'protractor';
// import { timeout } from 'rxjs/operators';
// import {DialogModule} from 'primeng/dialog';
// import { unsupported } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-substitution-pattern-single-game',
  templateUrl: './substitution-pattern-single-game.component.html',
  styleUrls: ['./substitution-pattern-single-game.component.scss']
})
export class SubstitutionPatternSingleGameComponent implements OnInit {
  @Input() fromParent;
  checkedValue: boolean = false;
  playersubsData;
  listData = [];
  leag_name = '';
  teamName = '';
  oppTeamName = '';
  leftHandSideSelected: boolean = false;
  selectedPlayer: any;
  selectedPlayer2: any;
  CheckValue: any;
  a: any;
  b: any;
  c: any;
  isLocate = false;
  multiCheckedValue: any = [];
  firstSel: any;
  secSel: any;

  lastSelectedRow: any;
  teamResult: any;
  teamData: any;

  isHigh = false;
  button_single: number
  gameData: any = [];
  gameData1;
  oneononeData;
  team_name;
  opp_name;
  other_Name;
  allTheTeams
  subpatter: any[];
  displayBasic: boolean = false;
  assignedPlayer2: any;
  assignedPlayer: any;
  assignedPlayer1: any;
  model: any = { data: '' }
  one_click: number;
  static_Id: any;
  static_Idd: any;
  show_back: boolean = true;
  button_disable: boolean = true
  locate_disable: boolean = true
  draftTeam:any;
 draftTeamA:any;
 gameStatus: string = '';
 seasonTeamData: any;
 @Output('toggleMenu') toggleMenu: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private _location: Location,       // 19, 5
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private shared: SharedService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) {

    this.subpatter = [
      {
        id: 1,
        // pos: 'C',
        player_name: 'pos1'
      },
      {
        id: 2,
        // pos: 'PF',
        player_name: 'pos2'
      },
      {
        id: 3,
        // pos: 'SF',
        player_name: 'pos3'
      },
      {
        id: 4,
        // pos: 'SG',
        player_name: 'pos4'
      },
      {
        id: 5,
        // pos: 'PG',
        player_name: 'pos5'
      }
    ]


  }


  ngOnInit(): void {
    this.allTheTeams = 'playallteam';
    this.gameStatus = 'playallteam';
    console.log(this.checkedValue)
    if (this.fromParent) {
      this.draftTeam = this.fromParent.teamName;
      this.leag_name = this.fromParent.seasonName;
      this.draftTeamA = this.fromParent.seasonName;
      this.teamName = this.fromParent.teamName;
      this.getPlayersSubs();
    }
    if (!localStorage.getItem('userToken')) {
      this.router.navigateByUrl('/');
    }
    this.team_name = this.gameData[0];
    console.log('dsds')
  }
  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
  openDraftPlayerModal() {
    const modalRef = this.modalService.open(DraftPlayerSingleGameComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        size: 'lg'
        // keyboard: false,
        // backdrop: 'static'
      });

    let data = {
      seasonName: this.fromParent.seasonName,
      teamName: this.fromParent.teamName
    }

    modalRef.componentInstance.fromParentDraft = data;
    modalRef.result.then((result) => {
      console.log(result)
    }, (reason) => {
    });
  }
  async getPlayersSubs() {


    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": this.leag_name,
      "team_name": this.teamName

    }

    const Token: string = localStorage.getItem('userToken');
    this.spinner.show();
    (await this.adminService.getPlayersSubs(data, Token)).subscribe(result => {

      this.playersubsData = result;
    },

      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          localStorage.clear();
          this.router.navigateByUrl('/');
          this.notifierService.notify('info', 'Your session has timed out. Please log in again.');

        }
      },


      () => {
        this.spinner.hide();
        if (this.playersubsData.status === 'true' || this.playersubsData.status === true) {
          for (let item of this.playersubsData.rightdata) {
            let count = 0;
            for (let left of this.playersubsData.data) {
              if (item.player_name === left.pos1) {
                count++
              }
              if (item.player_name === left.pos2) {
                count++
              }
              if (item.player_name === left.pos3) {
                count++
              }
              if (item.player_name === left.pos4) {
                count++
              }
              if (item.player_name === left.pos5) {
                count++
              }
            }
            item.minutes = count * 4;
            count = 0;
          }
          this.getSliceArray();
        } else {
          this.notifierService.notify('error', this.playersubsData.message);
        }
      });
  }
  getSliceArray() {
    var size = 3;
    this.listData = new Array(Math.ceil(this.playersubsData.data.length / size)).fill("")
      .map(function () { return this.splice(0, size) }, this.playersubsData.data.slice());
    // console.log(this.listData);

    for (let data of this.listData) {
      for (let item of data) {
        // console.log(item)
        let myDaya = [];
        if (item.pos1) {
          myDaya.push({ id: 1, player_name: item.pos1, pos: 'C' })
        }
        if (item.pos2) {
          myDaya.push({ id: 2, player_name: item.pos2, pos: 'PF' })
        }
        if (item.pos3) {
          myDaya.push({ id: 3, player_name: item.pos3, pos: 'SF' })
        }
        if (item.pos4) {
          myDaya.push({ id: 4, player_name: item.pos4, pos: 'SG' })
        }
        if (item.pos5) {
          myDaya.push({ id: 5, player_name: item.pos5, pos: 'PG' })
        }
        item.data = myDaya;
      }
    }
    // console.log(this.listData);
  }

  backClicked() {
    this._location.back();
  }



  locatPlayer() {
    this.isLocate = false;
    if (!this.selectedPlayer) {
      this.isLocate = true;
      this.selectedPlayer = Object.assign({}, this.assignedPlayer);
      console.log(this.selectedPlayer)
    } else if (this.selectedPlayer2) {
      this.isLocate = true
      this.selectedPlayer = this.selectedPlayer2
    }
    // else if(this.selectPlayer) {
    //   console.log('P')
    //   this.isLocate = true
    // }
    this.locate_disable = true
  }


  highlightPlayer() {
    this.leftHandSideSelected = false
    this.isLocate = false;
    this.isLocate = true;
    this.playersubsData.rightdata.map(item => {
      item.activeRow = false
    })

    this.locate_disable = true;
  }



  selectPlayer(item) {
    this.playersubsData.rightdata.map(item => {
      item.activeRow = false
    })
    if (this.multiCheckedValue.length > 0) {
      this.selectedPlayer = item;
      item.activeRow = !item.activeRow
    } else if (this.leftHandSideSelected) {
      item.activeRow = !item.activeRow;
      this.selectedPlayer2 = Object.assign({}, item);

    } else {
      if (!this.isLocate) {
        this.button_single = null
        this.one_click = null;
        this.assignedPlayer = item;
        item.activeRow = !item.activeRow
      } else {
        item.activeRow = !item.activeRow;
        this.selectedPlayer2 = Object.assign({}, item);
      }
    }

    this.locate_disable = false
  }

  selectPlayerl(op, pos, j, k, l) {
    if (this.checkedValue) {
      return false;
    }
    this.multiCheckedValue = [];
    let i = 0;
    this.button_disable = false;
    this.button_single = k
    this.static_Id = l
    this.one_click = j
    this.a = op;
    this.b = pos;

    this.isLocate = false;
    this.selectedPlayer = { player_name: this.b, minutes: 0 };

    for (let item of this.listData) {
      for (let op of item) {
        if (op.pos1 == this.selectedPlayer.player_name) { i++ }
        else if (op.pos2 == this.selectedPlayer.player_name) { i++ }
        else if (op.pos3 == this.selectedPlayer.player_name) { i++ }
        else if (op.pos4 == this.selectedPlayer.player_name) { i++ }
        else if (op.pos5 == this.selectedPlayer.player_name) { i++ }
      }

    }
    this.selectedPlayer.minutes = i * 4;
    this.leftHandSideSelected = true;
  }



  ok() {
    this.changePosition()
    this.closeModal('dismiss');
  }

  mdl() {
    if (!this.leftHandSideSelected) {
      this.displayBasic = true;
      this.isLocate = true
    } else {
      this.changePosition()
      this.isLocate = true
    }
  }




  changePosition() {
    this.spinner.show();
    this.displayBasic = false;
    if (this.multiCheckedValue.length > 0 && this.selectedPlayer != undefined) {  // multi wala
      this.spinner.show();
      this.listData.map((f, i) => {
        f.map((obj, j) => {
          for (let play of this.multiCheckedValue) {
            if (play.subpos == j && play.pos == i) {
              if (obj.pos1 == play.selPlayer && play.metaSubPos == 1) { obj.pos1 = this.selectedPlayer.player_name }
              else if (obj.pos2 == play.selPlayer && play.metaSubPos == 2) { obj.pos2 = this.selectedPlayer.player_name }
              else if (obj.pos3 == play.selPlayer && play.metaSubPos == 3) { obj.pos3 = this.selectedPlayer.player_name }
              else if (obj.pos4 == play.selPlayer && play.metaSubPos == 4) { obj.pos4 = this.selectedPlayer.player_name }
              else if (obj.pos5 == play.selPlayer && play.metaSubPos == 5) { obj.pos5 = this.selectedPlayer.player_name }
            }
            this.isLocate = true;
          }
        })

        this.spinner.hide();
        if ((i + 1) == this.listData.length) {
          this.changeRightSideData(this.selectedPlayer, this.multiCheckedValue)
        }
      });
    }
    else if (this.leftHandSideSelected) {   // single wala
      this.isLocate = false;
      if (this.selectedPlayer != undefined && this.selectedPlayer2 != undefined) {
        this.spinner.show();
        this.listData.map((f, i) => {
          f.map((obj, j) => {
            if (this.button_single == j && this.one_click == i) {
              if (obj.pos1 == this.selectedPlayer.player_name) { obj.pos1 = this.selectedPlayer2.player_name }
              else if (obj.pos2 == this.selectedPlayer.player_name) { obj.pos2 = this.selectedPlayer2.player_name }
              else if (obj.pos3 == this.selectedPlayer.player_name) { obj.pos3 = this.selectedPlayer2.player_name }
              else if (obj.pos4 == this.selectedPlayer.player_name) { obj.pos4 = this.selectedPlayer2.player_name }
              else if (obj.pos5 == this.selectedPlayer.player_name) { obj.pos5 = this.selectedPlayer2.player_name }
              this.isLocate = true;
            }
          });
          this.spinner.hide();
          if ((i + 1) == this.listData.length) {

            this.changeRightSideData(this.selectedPlayer, this.selectedPlayer2)
          }
        });
        this.isLocate = true
      }
      this.locatPlayer()
    }
    else {                             // highlight wala
      this.isLocate = false;
      if (this.selectedPlayer != undefined && this.selectedPlayer2 != undefined) {
        this.spinner.show();
        this.listData.map((f, i) => {
          f.map(obj => {
            Object.keys(obj).map(item => {
              if (obj[item] == this.selectedPlayer.player_name) {
                obj[item] = this.selectedPlayer2.player_name
                this.isLocate = true;
              }
            })
          });
          this.spinner.hide();
          if ((i + 1) == this.listData.length) {

            this.changeRightSideData(this.selectedPlayer, this.selectedPlayer2)
          }

        });


      }

      this.locatPlayer()
    }

    this.locate_disable = false

  }



  changeRightSideData(fst, scd) {
    if (this.multiCheckedValue.length > 0) {
      if (this.isLocate == true) {
        this.playersubsData.rightdata.map((data, length) => {
          for (let item of scd) {
            if (data.player_name == item.selPlayer) {
              data['minutes'] -= 4
            }
          }

          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancel();
          }
        })
        this.playersubsData.rightdata.map((data, length) => {

          if (data.player_name == fst.player_name) {
            data.minutes += (scd.length * 4)
          }


          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancel();
          }
        })
      }
      for (let itme of this.multiCheckedValue) {
        itme.selPlayer = fst.player_name
      }

    } else if (this.leftHandSideSelected) {
      if (this.isLocate == true) {
        let playMinute = 0
        this.playersubsData.rightdata.map((data, length) => {
          if (data.player_name == fst.player_name) {
            playMinute = parseInt(fst.minutes)
            data['minutes'] -= 4
          }

          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancelRight();
          }
        })
        this.playersubsData.rightdata.map((data, length) => {
          if (data.player_name == scd.player_name) {
            this.selectedPlayer.player_name = scd.player_name
            data.minutes += 4
          }
          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancelRight();
          }
        })
      }
    } else {
      if (this.isLocate == true) {
        let playMinute = 0
        this.playersubsData.rightdata.map((data, length) => {
          if (data.player_name == fst.player_name) {
            playMinute = parseInt(fst.minutes)
            data['minutes'] = playMinute - parseInt(fst.minutes)
          }

          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancel();
          }
        })
        this.playersubsData.rightdata.map((data, length) => {
          if (data.player_name == scd.player_name) {
            this.selectedPlayer.player_name = scd.player_name
            data.minutes = playMinute + parseInt(data.minutes);

          }
          if (this.playersubsData.rightdata.length == (length + 1)) {
            this.cancel();
          }
        })
      }
    }
  }



  multcheck($event) {
    this.checkedValue = $event
    this.isLocate = false;
  }


  cancel() {
    this.button_single = null;
    this.one_click = null;
    this.selectedPlayer2 = undefined;
    setTimeout(() => {
      this.spinner.hide()
      this.highlightPlayer();
    }, 0)
    this.CheckValue = null
  }
  cancelRight() {
    this.spinner.hide()
    this.selectedPlayer2 = undefined;
    this.isLocate = false;
    this.leftHandSideSelected = false;
  }

  async onSetSubtitution() {
    let gameData = JSON.parse(localStorage.getItem('gameData'))
    let obj = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "league_name": localStorage.getItem('SeasonName'),
      "team_name": gameData[0]['predictaway'],
      "data": this.convertData()
    };

    const Token: string = localStorage.getItem('userToken');
    let resultData;
    this.spinner.show();
    (await this.adminService.setPlayerSub(obj, Token)).subscribe(result => {
      resultData = result;
    }, (err) => console.log(err),
      () => {
        this.spinner.hide();
        if (resultData.status === 'true' || resultData.status === true) {
        } else {
          this.notifierService.notify('error', resultData.message);
        }
      });
    this.notifierService.notify('success', "Update Sucessfully");
    // this.notifierService.notify('success', "Substitution Pattern Update Sucessfully");
    this._location.back();
  }

  convertData() {
    let temp = [];
    this.listData.map(f => {
      f.map(data => {
        temp.push(data);
      })
    });
    return temp
  }


  changeTeam(event) {

    this.teamName = event.target.value  // teamName
    let league_name = localStorage.getItem('SeasonName');


    let data = {
      "apikey": "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
      "keeppbp": "N",
      "league_name": league_name,
      "team_name": this.teamName,
    }
    this.getPlayersSubs();
  }

  multiCheck(e, op, pos, i, j, l) {
    console.log("multicheck", pos)
    this.leftHandSideSelected = false;
    if (this.multiCheckedValue.length > 0) {
      let matched = this.multiCheckedValue.findIndex(item => item.pos == i && item.subpos == j);
      if (matched != -1) {
        this.multiCheckedValue[matched] = {
          pos: i,
          subpos: j,
          metaSubPos: l,
          selPlayer: pos,
        }
      } else {
        this.multiCheckedValue.push({
          pos: i,
          subpos: j,
          metaSubPos: l,
          selPlayer: pos
        })
      }
    } else {
      this.multiCheckedValue.push({
        pos: i,
        subpos: j,
        metaSubPos: l,
        selPlayer: pos
      })
    }
  }



  getTRetrunSelect(pos, i, j, l) {
    // console.log(pos, i, j, l)
    if (this.multiCheckedValue.length > 0) {
      let val = this.multiCheckedValue.filter(item => item.pos == i && item.subpos == j && item.metaSubPos == l && item.selPlayer == pos)
      if (val.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false;
    }
    return false;
  }

  substitute = ['pos1', 'pos2', 'pos3', 'pos4', 'pos5']


  closed(): void{
    this.toggleMenu.emit();
  }


}
