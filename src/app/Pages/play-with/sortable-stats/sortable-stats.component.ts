import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { SharedService } from '../../../services/shared.service';
import { AdminService } from '../../../../services/admin.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
@Component({
  selector: 'app-sortable-stats',
  templateUrl: './sortable-stats.component.html',
  styleUrls: ['./sortable-stats.component.scss']
})

export class SortableStatsComponent implements OnInit {
  getSortableStats: any[] = [];
  model: any = { data: '' }

  fieldModel:any = {data:''}
  //fieldModel1:any ={item:''}

  sorty:any ={item:''}  
  sortn:any ={item:''}
  sortyItem:any;
  sortnItem:any;

  fieldModell:any = {data:''}
  fieldModelll:any = {data:''}
  fieldModellll:any = {data:''}

  fieldModel1:any ={item:''}
  fieldModel2:any ={item:''}
  fieldModel3:any ={item:''}
  fieldModel4:any ={item:''}
  fieldModel5:any ={item:''}
  sortPlayerId:any;
  sortTeamId:any;
  currentSortOrder: any;  
  currentSortValue: any;

  playerData;
  selectedName:any =[];
  playerDataSort:any = [];
  playerTeam:any=[];
  selectedName1:any =[];

  sortingItem: any;
  asenItem: any;
  desItem: any;

  result: any;
  teamData: any = [];
  teamValue: any;

  
  limitItem: any;
  selectlisthe:any;
  limitModelMin:any = {min:'',max:''}
  limitModelMax:any = {item:''}

  val1: string = 'Option 1';
  val2: string = 'Option 1';
  val3: string = 'Option 1';
  val4: string = 'Option 1';
  val5: string = 'Option 1';
  selectedValue: any;
  display0: boolean = false;
  display1: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  display4: boolean = false;


  // cars1: any[] = dummyData;
  frozenCols: any[];
  scrollableCols: any[];
  leag_name = '';
  allTheTeams;
  oneononeData;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private shared: SharedService,
    private _location: Location,  
  ) {
    this.oneononeData = localStorage.getItem('showStatus');
    this.allTheTeams = localStorage.getItem('showStatus');
    this.leag_name = localStorage.getItem('SeasonName');

      this.scrollableCols = [
        { field: 'games', header: 'G', width: 80 },
        { field: 'minutes', header: 'MIN', width: 80 },
        { field: 'fgm', header: 'FGM', width: 80 },
        { field: 'fga', header: 'FGA', width: 80 },
        { field: 'fg_percent', header: 'FG%', width: 80 },
        { field: 'eff_fg_pct', header: 'EFF FG%', width: 120 },
        { field: 'score_fg_pct', header: 'SCORE FG%', width: 120 },
        { field: 'two_pt_fgm', header: '2PT FGM', width: 120 },
        { field: 'two_pt_fga', header: '2PT FGA', width: 120 },
        { field: 'two_pt_fg_pct', header: '2PT FG%', width: 120 },
        { field: 'three_pt_fgm', header: '3PT FGM', width: 120 },
        { field: 'three_pt_fga', header: '3PT FGA', width: 120 },
        { field: 'three_pt_fg_pct', header: '3PT FG%', width: 120 },
        { field: 'ftm', header: 'FTM', width: 80 }, // 16 --
        { field: 'fta', header: 'FTA', width: 80 },
        { field: 'ft_pct', header: 'FT%', width: 80 },
        { field: 'off_reb', header: 'OFF REB', width: 120 },
        { field: 'def_reb', header: 'DEF REB', width: 120 }, //20
        { field: 'tot_reb', header: 'TOT REB', width: 120 },
        { field: 'assists', header: 'AST', width: 80 },
        { field: 'pf', header: 'PF', width: 80 },
        { field: 'dq', header: 'DQ', width: 80 },
        { field: 'st', header: 'ST', width: 80 },
        { field: 'turnovers', header: 'TO', width: 80 },
        { field: 'bs', header: 'BS', width: 80 },
        { field: 'pts', header: 'PTS', width: 80 },
        { field: 'pts_per_scopp', header: 'PTS /ScOPP', width: 120 }, 
        { field: 'min_per_game', header: 'MIN /G', width: 120 },
        { field: 'fgm_per_game', header: 'FGM /G', width: 120 },
        { field: 'fga_per_game', header: 'FGA /G', width: 120 },
        { field: 'ftm_per_game', header: 'FTM /G', width: 120 },
        { field: 'fta_per_game', header: 'FTA /G', width: 120 },
        { field: 'off_reb_per_game', header: 'OREB /G', width: 120 },
        { field: 'def_reb_per_game', header: 'DREB /G', width: 120 },
        { field: 'tot_reb_per_game', header: 'TREB /G', width: 120 },
        { field: 'ast_per_game', header: 'AST /G', width: 120 },
        { field: 'pf_per_game', header: 'PF /G', width: 120 },
        { field: 'st_per_game', header: 'ST /G', width: 120 },
        { field: 'to_per_game', header: 'TO /G', width: 120 },
        { field: 'bs_per_game', header: 'BS /G', width: 120 },
        { field: 'avg_per_game', header: 'AVG PTS/G', width: 120 },     //AVG PTS/G
        { field: 'lo_min', header: 'low MIN', width: 120 },
        { field: 'hi_min', header: 'high MIN', width: 120 },
        { field: 'hi_lo_fgm', header: 'high FGM', width: 120 },
        { field: 'hi_lo_fga', header: 'high FGA', width: 120 },
        { field: 'hi_lo_3pt_fgm', header: 'high 3PFGM', width: 120 },
        { field: 'hi_lo_3pt_fga', header: 'high 3PFGA', width: 120 },
        { field: 'hi_lo_ftm', header: 'high FTM', width: 120 },
        { field: 'hi_lo_fta', header: 'high FTA', width: 120 },
        { field: 'hi_lo_off_reb', header: 'high OREB', width: 120 },
        { field: 'hi_lo_def_reb', header: 'high DREB', width: 120 },
        { field: 'hi_lo_tot_reb', header: 'high TREB', width: 120 },
        { field: 'hi_lo_ast', header: 'high AST', width: 120 },
        { field: 'hi_lo_st', header: 'high ST', width: 120 },
        { field: 'hi_lo_to', header: 'high TO', width: 120 },
        { field: 'hi_lo_bs', header: 'high BS', width: 120 },
        { field: 'lo_pts', header: 'low PTS', width: 120 },
        { field: 'hi_pts', header: 'high PTS', width: 120 },
        { field: 'poss_fact', header: 'POSS FACT', width: 120 },
        { field: 'pass_poss_fact', header: 'PASSING POSSFACT', width: 170 },
        { field: 'total_poss_ind', header: 'POSS IND', width: 120 },
        { field: 'total_poss_total', header: 'POSS TOTAL', width: 120 },
        { field: 'total_poss_pct', header: 'POSS%', width: 120 },
        { field: 'starts_ind', header: 'STARTS IND', width: 120 },
        { field: 'starts_total', header: 'STARTS TOTAL', width: 150 },
        { field: 'starts_pct', header: 'STARTS %', width: 120 },
        { field: 'out_of_bounds_plays', header: 'OUT OF BOUNDS', width: 170 },
        { field: 'passes_caught_ind', header: 'PASSES CAUGHT-IND', width: 170 },
        { field: 'passes_caught_total', header: 'PASSES CAUGHT-TOTAL', width: 190 },
        { field: 'passes_caught_pct', header: 'PASSES %', width: 120 },
        { field: 'off_reb_ind', header: 'OREB IND', width: 120 },
        { field: 'off_reb_total', header: 'OREB TOTAL', width: 120 },
        { field: 'off_reb_pct', header: 'OREB %', width: 120 },
        { field: 'aosf_fgm', header: 'AOSF FGM', width: 120 },
        { field: 'aosf_fga', header: 'AOSF FGA', width: 120 },
        { field: 'aosf_fg_pct', header: 'AOSF FG%', width: 120 },
        { field: 'total_times_fouled', header: '# TIMES FOULED', width: 170 },
        { field: 'act_of_shoot_fouls', header: 'AOSF', width: 80 },
        { field: 'non_shoot_fouls', header: 'NSF', width: 80 },
        { field: 'rebounds_per_game_off', header: 'OREB /G', width: 120 },
        { field: 'rebounds_per_game_def', header: 'DREB /G', width: 120 },
        { field: 'rebounds_per_game_tot', header: 'TREB /G' , width: 120},
        { field: 'rebounds_per_48_min_off', header: 'OREB /48M', width: 120 },
        { field: 'rebounds_per_48_min_def', header: 'DREB /48M', width: 120 },
        { field: 'rebounds_per_48_min_tot', header: 'TREB /48M', width: 120 },
        { field: 'rebounding_rating_off', header: 'OREB RAT', width: 120 },
        { field: 'rebounding_rating_def', header: 'DREB RAT', width: 120 },
        { field: 'off_reb2', header: 'OFF REB', width: 120 },
        { field: 'scored_after_off_reb', header: 'SAOR', width: 80 },
        { field: 'ast_2', header: 'AST', width: 80 },
        { field: 'total_passes_thrown', header: 'PASSES THROWN', width: 170 },
        { field: 'total_passes_caught', header: 'PASSES CAUGHT', width: 170 },
        { field: 'perform_points', header: 'PERFORM PTS', width: 170 },
        { field: 'perform_points_per_min', header: 'PERFORM PTS/MIN', width: 170 },
        { field: 'perform_points_per_game', header: 'PERFORM PTS/G', width: 170 },
        { field: 'off_team_poss', header: 'OFF %SHOOT', width: 120 },
        { field: 'off_opp_pts', header: 'OFF %PASS', width: 120 },
        { field: 'off_offense_pts_poss', header: 'OFF %FOUL', width: 120 },
        { field: 'off_defense_pts_poss', header: 'OFF %TO', width: 120 },
        { field: 'def_pct_pf', header: 'DEF &PF', width: 120 },
        { field: 'def_pct_st', header: 'DEF %ST', width: 120 },
        { field: 'def_pct_bs', header: 'DEF %BS', width: 120 },
        { field: 'def_fgm', header: 'DEF FGM', width: 120 },
        { field: 'def_fga', header: 'DEF FGA', width: 120 },
        { field: 'def_fg_pct', header: 'DEF FG%', width: 120 },
        { field: 'plus_minus_in_per_game', header: '+/-', width: 80 },
      ];

    this.frozenCols = [
        { field: 'team_name', header: 'Team', width: 200 },
        { field: 'player_name', header: 'Player Name', width: 200 },
    ];
  }  

  selectDropdown: any = [
    // { label: 'SELECT/SORT OPTIONS', value: '', },
    { label: 'LIMIT', value: '' },
    { label: 'SELECT PLAYERS', value: '' },
    { label: 'SORT', value: '' },
    { label: 'SELECT TEAM', value: '' }
  ];
  sortdropdown: any = [
    { label: 'NONE', value: '' },
    { label: 'Team', value: '' },
    { label: 'Player Name', value: '' },
    { label: 'G', value: '' },
    { label: 'MIN', value: '' },
    { label: 'FGM', value: '' },
    { label: 'FGA', value: '' },
    { label: 'FG%', value: '' },
    { label: 'EFF FG%', value: '' },
    { label: 'SCORE FG%', value: '' },
    { label: '2PT FGM', value: '' },
    { label: '2PT FGA', value: '' },
    { label: '2PT FG%', value: '' },
    { label: '3PT FGM', value: '' },
    { label: '3PT FGA', value: '' },
    { label: '3PT FG%', value: '' },
    { label: 'FTM', value: '' },
    { label: 'FTA', value: '' },
    { label: 'FT%', value: '' },
    { label: 'OFF REB', value: '' },
    { label: 'DEF REB', value: '' },
    { label: 'TOT REB', value: '' },
    { label: 'AST', value: '' },
    { label: 'PF', value: '' },
    { label: 'DQ', value: '' },
    { label: 'ST', value: '' },
    { label: 'TO', value: '' },
    { label: 'BS', value: '' },
    { label: 'PTS', value: '' },
    { label: 'PTS /ScOPP', value: '' },
    { label: 'MIN /G', value: '' },
    { label: 'FGM /G', value: '' },
    { label: 'FGA /G', value: '' },
    { label: 'FTM /G', value: '' },
    { label: 'FTA /G', value: '' },
    { label: 'OREB /G', value: '' },
    { label: 'DREB /G', value: '' },
    { label: 'TREB /G', value: '' },
    { label: 'AST /G', value: '' },
    { label: 'PF /G', value: '' },
    { label: 'ST /G', value: '' },
    { label: 'TO /G', value: '' },
    { label: 'BS /G', value: '' },
    { label: 'AVG PTS/G', value: '' },
    { label: 'low MIN', value: '' },
    { label: 'high MIN', value: '' },
    { label: 'high FGM', value: '' },
    { label: 'high FGA', value: '' },
    { label: 'high 3PFGM', value: '' },
    { label: 'high 3PFGA', value: '' },
    { label: 'high FTM', value: '' },
    { label: 'high FTA', value: '' },
    { label: 'high OREB', value: '' },
    { label: 'high DREB', value: '' },
    { label: 'high TREB', value: '' },
    { label: 'high AST', value: '' },
    { label: 'high ST', value: '' },
    { label: 'high TO', value: '' },
    { label: 'high BS', value: '' },
    { label: 'low PTS', value: '' },
    { label: 'high PTS', value: '' },
    { label: 'POSS FACT', value: '' },
    { label: 'PASSING POSSFACT', value: '' },
    { label: 'POSS IND', value: '' },
    { label: 'POSS TOTAL', value: '' },
    { label: 'POSS%', value: '' },
    { label: 'STARTS IND', value: '' },
    { label: 'STARTS TOTAL', value: '' },
    { label: 'STARTS %', value: '' },
    { label: 'OUT OF BOUNDS', value: '' },
    { label: 'PASSES CAUGHT-IND', value: '' },
    { label: 'PASSES CAUGHT-TOTAL', value: '' },
    { label: 'PASSES %', value: '' },
    { label: 'OREB IND', value: '' },
    { label: 'OREB TOTAL', value: '' },
    { label: 'OREB %', value: '' },
    { label: 'AOSF FGM', value: '' },
    { label: 'AOSF FGA', value: '' },
    { label: 'AOSF FG%', value: '' },
    { label: '# TIMES FOULED', value: '' },
    { label: 'AOSF', value: '' },
    { label: 'NSF', value: '' },
    { label: 'OREB /G', value: '' },
    { label: 'DREB /G', value: '' },
    { label: 'TREB /G', value: '' },
    { label: 'OREB /48M', value: '' },
    { label: 'DREB /48M', value: '' },
    { label: 'TREB /48M', value: '' },
    { label: 'OREB RAT', value: '' },
    { label: 'DREB RAT', value: '' },
    { label: 'OFF REB', value: '' },
    { label: 'SAOR', value: '' },
    { label: 'AST', value: '' },
    { label: 'PASSES THROWN', value: '' },
    { label: 'PASSES CAUGHT', value: '' },
    { label: 'PERFORM PTS', value: '' },
    { label: 'PERFORM PTS/MIN', value: '' },
    { label: 'PERFORM PTS/G', value: '' },
    { label: 'OFF %SHOOT', value: '' },
    { label: 'OFF %PASS', value: '' },
    { label: 'OFF %FOUL', value: '' },
    { label: 'OFF %TO', value: '' },
    { label: 'DEF &PF', value: '' },
    { label: 'DEF %ST', value: '' },
    { label: 'DEF %BS', value: '' },
    { label: 'DEF FGM', value: '' },
    { label: 'DEF FGA', value: '' },
    { label: 'DEF FG%', value: '' },
    { label: '+/-', value: '' },
 

  ]


  selectlist: any = [
        { value: 'games', label: 'G' },
        { value: 'minutes', label: 'MIN' },
        { value: 'fgm', label: 'FGM' },
        { value: 'fga', label: 'FGA' },
        { value: 'fg_percent', label: 'FG%' },
        { value: 'eff_fg_pct', label: 'EFF FG%' },
        { value: 'score_fg_pct', label: 'SCORE FG%' },
        { value: 'two_pt_fgm', label: '2PT FGM' },
        { value: 'two_pt_fga', label: '2PT FGA' },
        { value: 'two_pt_fg_pct', label: '2PT FG%' },
        { value: 'three_pt_fgm', label: '3PT FGM' },
        { value: 'three_pt_fga', label: '3PT FGA' },
        { value: 'three_pt_fg_pct', label: '3PT FG%' },
        { value: 'ftm', label: 'FTM' }, // 16 --
        { value: 'fta', label: 'FTA' },
        { value: 'ft_pct', label: 'FT%' },
        { value: 'off_reb', label: 'OFF REB' },
        { value: 'def_reb', label: 'DEF REB' }, //20
        { value: 'tot_reb', label: 'TOT REB' },
        { value: 'assists', label: 'AST' },
        { value: 'pf', label: 'PF' },
        { value: 'dq', label: 'DQ' },
        { value: 'st', label: 'ST' },
        { value: 'turnovers', label: 'TO' },
        { value: 'bs', label: 'BS' },
        { value: 'pts', label: 'PTS' },
        { value: 'pts_per_scopp', label: 'PTS /ScOPP' }, 
        { value: 'min_per_game', label: 'MIN /G' },
        { value: 'fgm_per_game', label: 'FGM /G' },
        { value: 'fga_per_game', label: 'FGA /G' },
        { value: 'ftm_per_game', label: 'FTM /G' },
        { value: 'fta_per_game', label: 'FTA /G' },
        { value: 'off_reb_per_game', label: 'OREB /G' },
        { value: 'def_reb_per_game', label: 'DREB /G' },
        { value: 'tot_reb_per_game', label: 'TREB /G' },
        { value: 'ast_per_game', label: 'AST /G' },
        { value: 'pf_per_game', label: 'PF /G' },
        { value: 'st_per_game', label: 'ST /G' },
        { value: 'to_per_game', label: 'TO /G' },
        { value: 'bs_per_game', label: 'BS /G' },
        { value: 'avg_per_game', label: 'AVG PTS/G' },     //AVG PTS/G
        { value: 'lo_min', label: 'low MIN' },
        { value: 'hi_min', label: 'high MIN' },
        { value: 'hi_lo_fgm', label: 'high FGM' },
        { value: 'hi_lo_fga', label: 'high FGA' },
        { value: 'hi_lo_3pt_fgm', label: 'high 3PFGM' },
        { value: 'hi_lo_3pt_fga', label: 'high 3PFGA' },
        { value: 'hi_lo_ftm', label: 'high FTM' },
        { value: 'hi_lo_fta', label: 'high FTA' },
        { value: 'hi_lo_off_reb', label: 'high OREB' },
        { value: 'hi_lo_def_reb', label: 'high DREB' },
        { value: 'hi_lo_tot_reb', label: 'high TREB' },
        { value: 'hi_lo_ast', label: 'high AST' },
        { value: 'hi_lo_st', label: 'high ST' },
        { value: 'hi_lo_to', label: 'high TO' },
        { value: 'hi_lo_bs', label: 'high BS' },
        { value: 'lo_pts', label: 'low PTS' },
        { value: 'hi_pts', label: 'high PTS' },
        { value: 'poss_fact', label: 'POSS FACT' },
        { value: 'pass_poss_fact', label: 'PASSING POSSFACT' },
        { value: 'total_poss_ind', label: 'POSS IND' },
        { value: 'total_poss_total', label: 'POSS TOTAL' },
        { value: 'total_poss_pct', label: 'POSS%' },
        { value: 'starts_ind', label: 'STARTS IND' },
        { value: 'starts_total', label: 'STARTS TOTAL' },
        { value: 'starts_pct', label: 'STARTS %' },
        { value: 'out_of_bounds_plays', label: 'OUT OF BOUNDS' },
        { value: 'passes_caught_ind', label: 'PASSES CAUGHT-IND' },
        { value: 'passes_caught_total', label: 'PASSES CAUGHT-TOTAL' },
        { value: 'passes_caught_pct', label: 'PASSES %' },
        { value: 'off_reb_ind', label: 'OREB IND' },
        { value: 'off_reb_total', label: 'OREB TOTAL' },
        { value: 'off_reb_pct', label: 'OREB %' },
        { value: 'aosf_fgm', label: 'AOSF FGM' },
        { value: 'aosf_fga', label: 'AOSF FGA' },
        { value: 'aosf_fg_pct', label: 'AOSF FG%' },
        { value: 'total_times_fouled', label: '# TIMES FOULED' },
        { value: 'act_of_shoot_fouls', label: 'AOSF' },
        { value: 'non_shoot_fouls', label: 'NSF' },
        { value: 'rebounds_per_game_off', label: 'OREB /G' },
        { value: 'rebounds_per_game_def', label: 'DREB /G' },
        { value: 'rebounds_per_game_tot', label: 'TREB /G' },
        { value: 'rebounds_per_48_min_off', label: 'OREB /48M' },
        { value: 'rebounds_per_48_min_def', label: 'DREB /48M' },
        { value: 'rebounds_per_48_min_tot', label: 'TREB /48M' },
        { value: 'rebounding_rating_off', label: 'OREB RAT' },
        { value: 'rebounding_rating_def', label: 'DREB RAT' },
        { value: 'off_reb2', label: 'OFF REB' },
        { value: 'scored_after_off_reb', label: 'SAOR' },
        { value: 'ast_2', label: 'AST' },
        { value: 'total_passes_thrown', label: 'PASSES THROWN' },
        { value: 'total_passes_caught', label: 'PASSES CAUGHT' },
        { value: 'perform_points', label: 'PERFORM PTS' },
        { value: 'perform_points_per_min', label: 'PERFORM PTS/MIN' },
        { value: 'perform_points_per_game', label: 'PERFORM PTS/G' },
        { value: 'off_team_poss', label: 'OFF %SHOOT' },
        { value: 'off_opp_pts', label: 'OFF %PASS' },
        { value: 'off_offense_pts_poss', label: 'OFF %FOUL' },
        { value: 'off_defense_pts_poss', label: 'OFF %TO' },
        { value: 'def_pct_pf', label: 'DEF &PF' },
        { value: 'def_pct_st', label: 'DEF %ST' },
        { value: 'def_pct_bs', label: 'DEF %BS' },
        { value: 'def_fgm', label: 'DEF FGM' },
        { value: 'def_fga', label: 'DEF FGA' },
        { value: 'def_fg_pct', label: 'DEF FG%' },
        { value: 'plus_minus_in_per_game', label: '+/-' },
      ];












  showDialog0() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog1() {
    this.display0 = false;
    this.display1 = true;
    this.display2 = false;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog2() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = true;
    this.display3 = false;
    this.display4 = false;
  }
  showDialog3() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = true;
    this.display4 = false;
    this.val1 = 'Option 1';
    this.val2 = 'Option 1';
    this.val3 = 'Option 1';
    this.val4 = 'Option 1';
    this.val5 = 'Option 1';
  }
  showDialog4() {
    this.display0 = false;
    this.display1 = false;
    this.display2 = false;
    this.display3 = false;
    this.display4 = true;
  }


  ngOnInit(): void {
    if(!localStorage.getItem('userToken')){
      this.router.navigateByUrl('/');
    }
    this.getRawBoxState();
    this.team();
   
  }


  getData(event) {
    this.selectedValue = event.label
    // if (this.selectedValue == 'SELECT/SORT OPTIONS') {
    //   this.showDialog0();
    // }
    if (this.selectedValue == 'LIMIT') {
      this.showDialog1();
    }
    if (this.selectedValue == 'SELECT PLAYERS') {
      this.showDialog2();
    }
    if (this.selectedValue == 'SORT') {
      this.showDialog3();
    }
    if (this.selectedValue == 'SELECT TEAM') {
      this.showDialog4();
    }
  }


  cancelMulti() {
    this.showDialog0();
    // this.playerDataSort= [];
    this.selectedName = []
    this.selectedName1=[];
    
  }
  

  async team() {
    let Token: string = localStorage.getItem('userToken');
    // const formData = new FormData();
    // this.spinner.show();
    let league_name :string = localStorage.getItem('SeasonName');
    (await this.adminService.get_team(league_name, Token)).subscribe(result => {
      this.result = result;
    },

    (err) =>{ 
      // this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },


      () => {
      

        if (this.result.status == "true") {
          // this.spinner.hide();
          this.teamData = this.result.data
          let objectName = {
            teams: 'CHOOSE A TEAM',
            _id: ''
          }
          this.teamData.splice(0, 0, objectName);
        } else {
          // this.spinner.hide();
        }
      })
  }

  getTeamValue(event){
    this.teamValue = event.teams;
    localStorage.setItem('PredictData1', this.teamValue);
    
 }









  async getRawBoxState() {

    let data = {"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A"
                }
    
    const Token: string = localStorage.getItem('userToken');
  
    this.spinner.show();
    let resultdata;
    (await this.adminService.getSortableStats(data ,Token)).subscribe(result => {
      resultdata = result;
      
    }, 

    (err) =>{ this.spinner.hide();
      if(err.status == 401){
        localStorage.clear();
        this.router.navigateByUrl('/');
        this.notifierService.notify('info', 'Your session has timed out. Please log in again.');
      }
    },

      () => {
        this.spinner.hide();
        if (resultdata.status === 'true' || resultdata.status === true) {
          this.getSortableStats = resultdata.data;
           


          let count = 1;
          
          this.getSortableStats.map((item,index) =>{
            if(index > 0){

          
              this.playerDataSort.push(item.player_name)
            
              this.playerDataSort.sort((a, b) => a < b ? -1 : 1);
              this.playerDataSort = [...new Set(this.playerDataSort)]
            
              

              this.playerTeam.push(item.playerTeam)
              if(this.getSortableStats[index - 1] != this.getSortableStats[index]){
                count++;
              }
            }
            item.count = count;
          })


          this.playerTeam = [...new Set(this.playerTeam)]
          
          
        } else {
          this.notifierService.notify('error', resultdata.message);
        }
      });
  }


  selectedNameclick(value,i){

    this.sortPlayerId = i
    if(this.selectedName.length > 0){
      let val = this.selectedName.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedName.splice(val,1)
      }else{
        this.selectedName.push(value)

      }
    }else{
      this.selectedName.push(value)
    }
   }


   selectedTeamclick(value,i){
    //  console.log("sassada",this.selectedName1)
    this.sortTeamId = i
    if(this.selectedName1.length > 0){
      let val = this.selectedName1.findIndex(element => element == value)
      if(val >= 0 ){
        this.selectedName1.splice(val,1)
      }else{
        this.selectedName1.push(value)
      }
    }else{
      this.selectedName1.push(value) 
    }      
  }





selectLi(item){       
  for(let item of this.selectlist){
    item.activeRow = false
  }
  this.selectlisthe = item.value
  item.activeRow = true 
}


getlimitData(element){        

  this.limitItem = element
}

getlimitData1(element){      
  this.limitItem = element
}

//  filterLimit(){           // limit ka
//    let arr = [];
//    for(let item of this.playerData){
//      if(item[this.selectlisthe] >= this.limitModelMin.min && item[this.selectlisthe] <= this.limitModelMin.max){
//        arr.push(item)
//      }
//    }
//    this.playerData = arr;
//  }

filterLimit(){           // limit ka
  let arr = [];
  for(let item of this.getSortableStats){
    if(item[this.selectlisthe] >= this.limitModelMin.min && item[this.selectlisthe] <= this.limitModelMin.max){
      arr.push(item)
    }
  }
  this.getSortableStats = arr;
  this.display1 = false; 
  this.model.data=""
}

 






getfieldData(element){          
  this.sortingItem = element.label

}
getfieldDataa1(element){           
  this.sortingItem = element.label

}
getfieldDataa2(element){            
  this.sortingItem = element.label

}
getfieldDataa3(element){         
  this.sortingItem = element.label

}






getfieldData1(element){    
 this.asenItem = element
}

getfieldData2(element){      
this.asenItem = element
}

getfieldData3(element){     
this.asenItem = element
}

getfieldData4(element){  
this.asenItem = element
}




getErase(element){
  this.sorty = element
  
}



  

  filterPlayer(){
  
    let tempData = [];
    let tempPlayerData = [];
    let tempTeamData = []
    for(let item of this.getSortableStats){
      for(let sub of this.selectedName){
       
        if(item.player_name.trim() == sub.trim()){
          
          tempData.push(item)
          tempPlayerData.push(item.player_name)
          tempTeamData.push(item.team_name)
        }
      }
    }
    this.getSortableStats = tempData
    this.playerDataSort = [...new Set(tempPlayerData)]
    this.playerTeam = [...new Set(tempTeamData)]
    this.display2 = false;   
    this.model.data=""
  }


  filterTeam(){
  
    let tempData = [];
    let tempPlayerData = [];
    let tempTeamData = []
    for(let item of this.getSortableStats){
      // console.log(item)
      for(let sub of this.selectedName1){
        if(item.team_name.trim() == sub.trim()){
          
          tempData.push(item)
          tempPlayerData.push(item.player_name)
          tempTeamData.push(item.team_name)
        }
      }
    }
    
    // console.log("ddndnf",tempTeamData)
    this.getSortableStats = tempData
    this.playerDataSort = [...new Set(tempPlayerData)]
    this.playerTeam = [...new Set(tempTeamData)]
    this.display4 = false;
    this.model.data=""

  }


  // filterTeam(){
  //   let tempData = [];
  //   let tempPlayerData = [];
  //   let tempTeamData = []
  //   for(let item of this.teamData){
  //     for(let sub of this.selectedName1){
  //       if(item.teams.trim() == sub.trim()){
          
  //         tempData.push(item)
  //      //  tempPlayerData.push(item.player_name)

  //         tempTeamData.push(item.teams)
  //       }
  //     }
  //   }
  //   this.playerData = tempData
  //   this.playerDataSort = [...new Set(tempPlayerData)]
  //   this.playerTeam = [...new Set(tempTeamData)]
  //   this.display4 = false;
  //   this.model.data=""
  // }

  



  backClicked() {                  
    this._location.back();
  }





  reset(){

    let data={"apikey":"Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A",
              }
  this.getRawBoxState();
   this.selectedName1 = []
   this.selectedName = []

  
  }




customSort(event: SortEvent) {
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
}





//   customSort(event: SortEvent) {
//     event.data.sort((data1, data2) => {
//       let o = data1[this.asenItem];         //data1[event.field];
//       let v = data2[this.sortingItem];         //data2[event.field];
//         let result = null;

//         if (o == null && v != null)
//             result = -1;
//         else if (o != null && v == null)
//             result = 1;
//         else if (o == null && v == null)
//             result = 0;
//         else if (typeof o === 'string' && typeof v === 'string')
//             result = o.localeCompare(v);
//         else
//             result = (o < v) ? -1 : (o > v) ? 1 : 0;

//         return (event.order * result);
//     });
// }






  sort(){ 
    let o = this.asenItem;      
    let v = this.sortingItem;   
    
    let neg = 1;
    let pos = -1;
    if(o == 'Ascending'){
      neg = -1;
      pos = 1;
    }else if(o == 'Descending'){
      neg = 1;                      
      pos = -1;
    }
    
    
    
    this.currentSortOrder = o;
    this.currentSortValue =  v;
      

    if(v == 'Team'){
      this.getSortableStats.sort(function(a, b){
        if(a['team_name'] < b['team_name']) { return neg; }
        if(a['team_name'] > b['team_name']) { return pos; }
        return 0;
      })
    }
    if(v == 'Player Name'){
      this.getSortableStats.sort(function(a, b){
        if(a['player_name'] < b['player_name']) { return neg; }
        if(a['player_name'] > b['player_name']) { return pos; }
        return 0;
      })
    }
   
    if(v == 'G'){
    
      this.getSortableStats.sort(function(a, b){
        //Number(a.game_number) < Number(b.game_number)
        if(Number(a.games) < Number(b.games)) { return neg; }
        if(Number(a.games) > Number(b.games)) { return pos; }
        
        return 0;
      })
    }
    if(v == 'MIN'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.minutes) < Number(b.minutes)) { return neg; }
        if(Number(a.minutes) > Number(b.minutes)) { return pos; }
        return 0;
      })
    }
    if(v == 'FGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fgm) < Number(b.fgm)) { return neg; }
        if(Number(a.fgm) > Number(b.fgm)) { return pos; }
        
        return 0;
      })
    }


    if(v == 'FGA'){
      
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fga) < Number(b.fga)) { return neg; }
        if(Number(a.fga) > Number(b.fga)) { return pos; }
        return 0;
      })
    }
    if(v == 'FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fg_percent) < Number(b.fg_percent)) { return neg; }
        if(Number(a.fg_percent) > Number(b.fg_percent)) { return pos; }
        return 0;
      })
    }
    if(v == 'EFF FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.eff_fg_pct) < Number(b.eff_fg_pct)) { return neg; }
        if(Number(a.eff_fg_pct) > Number(b.eff_fg_pct)) { return pos; }

        return 0;
      })
    }
    if(v == 'SCORE FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.score_fg_pct) < Number(b.score_fg_pct)) { return neg; }
        if(Number(a.score_fg_pct) > Number(b.score_fg_pct)) { return pos; }

        return 0;
      })
    }
    if(v == '2PT FGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.two_pt_fgm) < Number(b.two_pt_fgm)) { return neg; }
        if(Number(a.two_pt_fgm) > Number(b.two_pt_fgm)) { return pos; }

        return 0;
      })
    }
    if(v == '2PT FGA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.two_pt_fga) < Number(b.two_pt_fga)) { return neg; }
        if(Number(a.two_pt_fga) > Number(b.two_pt_fga)) { return pos; }

        return 0;
      })
    }
    if(v == '2PT FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.two_pt_fg_pct) < Number(b.two_pt_fg_pct)) { return neg; }
        if(Number(a.two_pt_fg_pct) > Number(b.two_pt_fg_pct)) { return pos; }

        return 0;
      })
    }
    if(v == '3PT FGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.three_pt_fgm) < Number(b.three_pt_fgm)) { return neg; }
        if(Number(a.three_pt_fgm) > Number(b.three_pt_fgm)) { return pos; }

        return 0;
      })
    }
    if(v == '3PT FGA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.three_pt_fga) < Number(b.three_pt_fga)) { return neg; }
        if(Number(a.three_pt_fga) > Number(b.three_pt_fga)) { return pos; }

        return 0;
      })
    }
    if(v == '3PT FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.three_pt_fg_pct) < Number(b.three_pt_fg_pct)) { return neg; }
        if(Number(a.three_pt_fg_pct) > Number(b.three_pt_fg_pct)) { return pos; }

        return 0;
      })
    }
    if(v == 'FTM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.ftm) < Number(b.ftm)) { return neg; }
        if(Number(a.ftm) > Number(b.ftm)) { return pos; }

        return 0;
      })
    }
    if(v == 'FTA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fta) < Number(b.fta)) { return neg; }
        if(Number(a.fta) > Number(b.fta)) { return pos; }

        return 0;
      })
    }
    if(v == 'FT%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.ft_pct) < Number(b.ft_pct)) { return neg; }
        if(Number(a.ft_pct) > Number(b.ft_pct)) { return pos; }

        return 0;
      })
    }
    if(v == 'OFF REB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb) < Number(b.off_reb)) { return neg; }
        if(Number(a.off_reb) > Number(b.off_reb)) { return pos; }

        return 0;
      })
    }
    if(v == 'DEF REB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_reb) < Number(b.def_reb)) { return neg; }
        if(Number(a.def_reb) > Number(b.def_reb)) { return pos; }

        return 0;
      })
    }
    if(v == 'TOT REB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.tot_reb) < Number(b.tot_reb)) { return neg; }
        if(Number(a.tot_reb) > Number(b.tot_reb)) { return pos; }

        return 0;
      })
    }
    if(v == 'AST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.assists) < Number(b.assists)) { return neg; }
        if(Number(a.assists) > Number(b.assists)) { return pos; }

        return 0;
      })
    }
    if(v == 'PF'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pf) < Number(b.pf)) { return neg; }
        if(Number(a.pf) > Number(b.pf)) { return pos; }

        return 0;
      })
    }
    if(v == 'DQ'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pf) < Number(b.pf)) { return neg; }
        if(Number(a.pf) > Number(b.pf)) { return pos; }


        if(a.dq < b.dq) { return neg; }
        if(a.dq > b.dq) { return pos; }
        return 0;
      })
    }
    if(v == 'ST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.st) < Number(b.st)) { return neg; }
        if(Number(a.st) > Number(b.st)) { return pos; }

        
        return 0;
      })
    }
    if(v == 'TO'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.turnovers) < Number(b.turnovers)) { return neg; }
        if(Number(a.turnovers) > Number(b.turnovers)) { return pos; }

       
        return 0;
      })
    }
    if(v == 'BS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.bs) < Number(b.bs)) { return neg; }
        if(Number(a.bs) > Number(b.bs)) { return pos; }

       
        return 0;
      })
    }
    if(v == 'PTS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pts) < Number(b.pts)) { return neg; }
        if(Number(a.pts) > Number(b.pts)) { return pos; }

        
        return 0;
      })
      
    }
    
    if(v == 'PTS /ScOPP'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pts_per_scopp) < Number(b.pts_per_scopp)) { return neg; }
        if(Number(a.pts_per_scopp) > Number(b.pts_per_scopp)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'MIN /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.min_per_game) < Number(b.min_per_game)) { return neg; }
        if(Number(a.min_per_game) > Number(b.min_per_game)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'FGM /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fgm_per_game) < Number(b.fgm_per_game)) { return neg; }
        if(Number(a.fgm_per_game) > Number(b.fgm_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'FGA /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fga_per_game) < Number(b.fga_per_game)) { return neg; }
        if(Number(a.fga_per_game) > Number(b.fga_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'FTM /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.ftm_per_game) < Number(b.ftm_per_game)) { return neg; }
        if(Number(a.ftm_per_game) > Number(b.ftm_per_game)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'FTA /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.fta_per_game) < Number(b.fta_per_game)) { return neg; }
        if(Number(a.fta_per_game) > Number(b.fta_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'OREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb_per_game) < Number(b.off_reb_per_game)) { return neg; }
        if(Number(a.off_reb_per_game) > Number(b.off_reb_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'DREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_reb_per_game) < Number(b.def_reb_per_game)) { return neg; }
        if(Number(a.def_reb_per_game) > Number(b.def_reb_per_game)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'TREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.tot_reb_per_game) < Number(b.tot_reb_per_game)) { return neg; }
        if(Number(a.tot_reb_per_game) > Number(b.tot_reb_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'AST /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.ast_per_game) < Number(b.ast_per_game)) { return neg; }
        if(Number(a.ast_per_game) > Number(b.ast_per_game)) { return pos; }

  
        return 0;
      })
      
    }
    if(v == 'PF /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pf_per_game) < Number(b.pf_per_game)) { return neg; }
        if(Number(a.pf_per_game) > Number(b.pf_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'ST /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.st_per_game) < Number(b.st_per_game)) { return neg; }
        if(Number(a.st_per_game) > Number(b.st_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'TO /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.to_per_game) < Number(b.to_per_game)) { return neg; }
        if(Number(a.to_per_game) > Number(b.to_per_game)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'BS /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.bs_per_game) < Number(b.bs_per_game)) { return neg; }
        if(Number(a.bs_per_game) > Number(b.bs_per_game)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'AVG PTS/G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.avg_per_game) < Number(b.avg_per_game)) { return neg; }
        if(Number(a.avg_per_game) > Number(b.avg_per_game)) { return pos; }

      
        return 0;
      })
      
    }
    if(v == 'low MIN'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.lo_min) < Number(b.lo_min)) { return neg; }
        if(Number(a.lo_min) > Number(b.lo_min)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high MIN'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_min) < Number(b.hi_min)) { return neg; }
        if(Number(a.hi_min) > Number(b.hi_min)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'high FGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_fgm) < Number(b.hi_lo_fgm)) { return neg; }
        if(Number(a.hi_lo_fgm) > Number(b.hi_lo_fgm)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high FGA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_fga) < Number(b.hi_lo_fga)) { return neg; }
        if(Number(a.hi_lo_fga) > Number(b.hi_lo_fga)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high 3PFGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_3pt_fgm) < Number(b.hi_lo_3pt_fgm)) { return neg; }
        if(Number(a.hi_lo_3pt_fgm) > Number(b.hi_lo_3pt_fgm)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high 3PFGA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_3pt_fga) < Number(b.hi_lo_3pt_fga)) { return neg; }
        if(Number(a.hi_lo_3pt_fga) > Number(b.hi_lo_3pt_fga)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high FTM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_ftm) < Number(b.hi_lo_ftm)) { return neg; }
        if(Number(a.hi_lo_ftm) > Number(b.hi_lo_ftm)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high FTA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_fta) < Number(b.hi_lo_fta)) { return neg; }
        if(Number(a.hi_lo_fta) > Number(b.hi_lo_fta)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high OREB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_off_reb) < Number(b.hi_lo_off_reb)) { return neg; }
        if(Number(a.hi_lo_off_reb) > Number(b.hi_lo_off_reb)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high DREB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_def_reb) < Number(b.hi_lo_def_reb)) { return neg; }
        if(Number(a.hi_lo_def_reb) > Number(b.hi_lo_def_reb)) { return pos; }

      
        return 0;
      })
      
    }
    if(v == 'high TREB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_tot_reb) < Number(b.hi_lo_tot_reb)) { return neg; }
        if(Number(a.hi_lo_tot_reb) > Number(b.hi_lo_tot_reb)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'high AST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_ast) < Number(b.hi_lo_ast)) { return neg; }
        if(Number(a.hi_lo_ast) > Number(b.hi_lo_ast)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high ST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_st) < Number(b.hi_lo_st)) { return neg; }
        if(Number(a.hi_lo_st) > Number(b.hi_lo_st)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high TO'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_to) < Number(b.hi_lo_to)) { return neg; }
        if(Number(a.hi_lo_to) > Number(b.hi_lo_to)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'high BS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_lo_bs) < Number(b.hi_lo_bs)) { return neg; }
        if(Number(a.hi_lo_bs) > Number(b.hi_lo_bs)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'low PTS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.lo_pts) < Number(b.lo_pts)) { return neg; }
        if(Number(a.lo_pts) > Number(b.lo_pts)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'high PTS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.hi_pts) < Number(b.hi_pts)) { return neg; }
        if(Number(a.hi_pts) > Number(b.hi_pts)) { return pos; }

       
        return 0;
      })
      
    }
    if(v == 'POSS FACT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.poss_fact) < Number(b.poss_fact)) { return neg; }
        if(Number(a.poss_fact) > Number(b.poss_fact)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'PASSING POSSFACT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.pass_poss_fact) < Number(b.pass_poss_fact)) { return neg; }
        if(Number(a.pass_poss_fact) > Number(b.pass_poss_fact)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'POSS IND'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_poss_ind) < Number(b.total_poss_ind)) { return neg; }
        if(Number(a.total_poss_ind) > Number(b.total_poss_ind)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'POSS TOTAL'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_poss_total) < Number(b.total_poss_total)) { return neg; }
        if(Number(a.total_poss_total) > Number(b.total_poss_total)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'POSS%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_poss_pct) < Number(b.total_poss_pct)) { return neg; }
        if(Number(a.total_poss_pct) > Number(b.total_poss_pct)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'STARTS IND'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.starts_ind) < Number(b.starts_ind)) { return neg; }
        if(Number(a.starts_ind) > Number(b.starts_ind)) { return pos; }
        
        
        return 0;
      })
      
    }
    if(v == 'STARTS TOTAL'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.starts_total) < Number(b.starts_total)) { return neg; }
        if(Number(a.starts_total) > Number(b.starts_total)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'STARTS %'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.starts_pct) < Number(b.starts_pct)) { return neg; }
        if(Number(a.starts_pct) > Number(b.starts_pct)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'OUT OF BOUNDS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.out_of_bounds_plays) < Number(b.out_of_bounds_plays)) { return neg; }
        if(Number(a.out_of_bounds_plays) > Number(b.out_of_bounds_plays)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'PASSES CAUGHT-IND'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.passes_caught_ind) < Number(b.passes_caught_ind)) { return neg; }
        if(Number(a.passes_caught_ind) > Number(b.passes_caught_ind)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'PASSES CAUGHT-TOTAL'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.passes_caught_total) < Number(b.passes_caught_total)) { return neg; }
        if(Number(a.passes_caught_total) > Number(b.passes_caught_total)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'PASSES %'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.passes_caught_pct) < Number(b.passes_caught_pct)) { return neg; }
        if(Number(a.passes_caught_pct) > Number(b.passes_caught_pct)) { return pos; }

         
        return 0;
      })
      
    }


    if(v == 'OREB IND'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb_ind) < Number(b.off_reb_ind)) { return neg; }
        if(Number(a.off_reb_ind) > Number(b.off_reb_ind)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OREB TOTAL'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb_total) < Number(b.off_reb_total)) { return neg; }
        if(Number(a.off_reb_total) > Number(b.off_reb_total)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OREB %'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb_pct) < Number(b.off_reb_pct)) { return neg; }
        if(Number(a.off_reb_pct) > Number(b.off_reb_pct)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'AOSF FGM'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.aosf_fgm) < Number(b.aosf_fgm)) { return neg; }
        if(Number(a.aosf_fgm) > Number(b.aosf_fgm)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'AOSF FGA'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.aosf_fga) < Number(b.aosf_fga)) { return neg; }
        if(Number(a.aosf_fga) > Number(b.aosf_fga)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'AOSF FG%'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.aosf_fg_pct) < Number(b.aosf_fg_pct)) { return neg; }
        if(Number(a.aosf_fg_pct) > Number(b.aosf_fg_pct)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == '# TIMES FOULED'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_times_fouled) < Number(b.total_times_fouled)) { return neg; }
        if(Number(a.total_times_fouled) > Number(b.total_times_fouled)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'AOSF'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.act_of_shoot_fouls) < Number(b.act_of_shoot_fouls)) { return neg; }
        if(Number(a.act_of_shoot_fouls) > Number(b.act_of_shoot_fouls)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'NSF'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.non_shoot_fouls) < Number(b.non_shoot_fouls)) { return neg; }
        if(Number(a.non_shoot_fouls) > Number(b.non_shoot_fouls)) { return pos; }
        
         
        return 0;
      })
      
    }
    if(v == 'OREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_game_off) < Number(b.rebounds_per_game_off)) { return neg; }
        if(Number(a.rebounds_per_game_off) > Number(b.rebounds_per_game_off)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'DREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_game_def) < Number(b.rebounds_per_game_def)) { return neg; }
        if(Number(a.rebounds_per_game_def) > Number(b.rebounds_per_game_def)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'TREB /G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_game_tot) < Number(b.rebounds_per_game_tot)) { return neg; }
        if(Number(a.rebounds_per_game_tot) > Number(b.rebounds_per_game_tot)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OREB /48M'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_48_min_off) < Number(b.rebounds_per_48_min_off)) { return neg; }
        if(Number(a.rebounds_per_48_min_off) > Number(b.rebounds_per_48_min_off)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'DREB /48M'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_48_min_def) < Number(b.rebounds_per_48_min_def)) { return neg; }
        if(Number(a.rebounds_per_48_min_def) > Number(b.pfrebounds_per_48_min_def)) { return pos; }

         
      })
      
    }
    if(v == 'TREB /48M'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounds_per_48_min_tot) < Number(b.rebounds_per_48_min_tot)) { return neg; }
        if(Number(a.rebounds_per_48_min_tot) > Number(b.rebounds_per_48_min_tot)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OREB RAT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounding_rating_off) < Number(b.rebounding_rating_off)) { return neg; }
        if(Number(a.rebounding_rating_off) > Number(b.rebounding_rating_off)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'DREB RAT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.rebounding_rating_def) < Number(b.rebounding_rating_def)) { return neg; }
        if(Number(a.rebounding_rating_def) > Number(b.rebounding_rating_def)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OFF REB'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_reb2) < Number(b.off_reb2)) { return neg; }
        if(Number(a.off_reb2) > Number(b.off_reb2)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'SAOR'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.scored_after_off_reb) < Number(b.scored_after_off_reb)) { return neg; }
        if(Number(a.scored_after_off_reb) > Number(b.scored_after_off_reb)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'AST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.ast_2) < Number(b.ast_2)) { return neg; }
        if(Number(a.ast_2) > Number(b.ast_2)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'PASSES THROWN'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_passes_thrown) < Number(b.total_passes_thrown)) { return neg; }
        if(Number(a.total_passes_thrown) > Number(b.total_passes_thrown)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'PASSES CAUGHT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.total_passes_caught) < Number(b.total_passes_caught)) { return neg; }
        if(Number(a.total_passes_caught) > Number(b.total_passes_caught)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'PERFORM PTS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.perform_points) < Number(b.perform_points)) { return neg; }
        if(Number(a.perform_points) > Number(b.perform_points)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'PERFORM PTS/MIN'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.perform_points_per_min) < Number(b.perform_points_per_min)) { return neg; }
        if(Number(a.perform_points_per_min) > Number(b.perform_points_per_min)) { return pos; }
         
        
        return 0;
      })
      
    }
    if(v == 'PERFORM PTS/G'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.perform_points_per_game) < Number(b.perform_points_per_game)) { return neg; }
        if(Number(a.perform_points_per_game) > Number(b.perform_points_per_game)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OFF %SHOOT'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_team_poss) < Number(b.off_team_poss)) { return neg; }
        if(Number(a.off_team_poss) > Number(b.off_team_poss)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OFF %PASS'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_team_poss) < Number(b.off_team_poss)) { return neg; }
        if(Number(a.off_team_poss) > Number(b.off_team_poss)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OFF %FOUL'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_offense_pts_poss) < Number(b.off_offense_pts_poss)) { return neg; }
        if(Number(a.off_offense_pts_poss) > Number(b.off_offense_pts_poss)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'OFF %TO'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.off_defense_pts_poss) < Number(b.off_defense_pts_poss)) { return neg; }
        if(Number(a.off_defense_pts_poss) > Number(b.off_defense_pts_poss)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'DEF &PF'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_pct_pf) < Number(b.def_pct_pf)) { return neg; }
        if(Number(a.def_pct_pf) > Number(b.def_pct_pf)) { return pos; }

        
        return 0;
      })
      
    }
    if(v == 'DEF %ST'){
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_pct_st) < Number(b.def_pct_st)) { return neg; }
        if(Number(a.def_pct_st) > Number(b.def_pct_st)) { return pos; }

         
        return 0;
      })
      
    }
    if(v == 'DEF %BS'){
      
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_pct_bs) < Number(b.def_pct_bs)) { return neg; }
        if(Number(a.def_pct_bs) > Number(b.def_pct_bs)) { return pos; }
        return 0;
      })
      
    }
    if(v == 'DEF FGM'){
      
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_fgm) < Number(b.def_fgm)) { return neg; }
        if(Number(a.def_fgm) > Number(b.def_fgm)) { return pos; }
      
         
        return 0;
      })
      
    }
    if(v == 'DEF FGA'){
     
      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_fga) < Number(b.def_fga)) { return neg; }
        if(Number(a.def_fga) > Number(b.def_fga)) { return pos; }

        return 0;
      })
      
    }  
    if(v == 'DEF FG%'){
      

      this.getSortableStats.sort(function(a, b){
        if(Number(a.def_fg_pct) < Number(b.def_fg_pct)) { return neg; }
        if(Number(a.def_fg_pct) > Number(b.def_fg_pct)) { return pos; }
        return 0;
      })
      
    } 
    if(v == '+/-'){
      

      this.getSortableStats.sort(function(a, b){
        if(Number(a.plus_minus_in_per_game) < Number(b.plus_minus_in_per_game)) { return neg; }
      if(Number(a.plus_minus_in_per_game) > Number(b.plus_minus_in_per_game)) { return pos; }
        return 0;
      })
      
    }  
  
    this.display3 = false;  // ok click => close

    if(this.fieldModel5.item == 'no'){

      this.fieldModel.data = ''
      this.fieldModell.data = ''
      this.fieldModelll.data = ''
      this.fieldModellll.data = ''
    
    
    }

    this.model.data=""
  
    }
}
