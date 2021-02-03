import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators"
import { AppSettings } from '../../appSettings';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/services/shared.service';
import { OnInit } from '@angular/core';

@Injectable()
export class AdminService implements OnInit {
	Data: any;
	cookieValue: string;
	sessoinId: string = '';

	constructor(
		private http: HttpClient,
		private cookieService: CookieService,
		public sharedService: SharedService,
	) {
		// this.sharedService.changedToken.subscribe(message => this.sessoinId = message);
		// this.cookieService.set('cookie', 'PHPSESSID=' + this.sessoinId)
		// this.cookieValue = this.cookieService.get('cookie');
		// if (this.sessoinId === undefined || this.sessoinId === null) {
		// 	this.sessoinId = '';
		// }
		
		// this.sessoinId = 'sessionID-'+JSON.parse(localStorage.getItem('userData')).data[0].id
		// this.sessoinId = localStorage.getItem('userToken');

		// let getData = JSON.parse(localStorage.getItem('userData'));		
		// if(getData){
		// 	this.sharedService.changedToken.subscribe(message => this.sessoinId = message);
		// 	this.cookieService.set( 'cookie', 'PHPSESSID='+this.sessoinId )
		// 	this.cookieValue = this.cookieService.get('cookie');
		// 	// this.sessoinId = 'sessionID-'+JSON.parse(localStorage.getItem('userData')).data[0].id
		// 	// this.sessoinId = localStorage.getItem('userToken');
		// 	if (this.sessoinId === undefined || this.sessoinId === null) {
		// 		this.sessoinId = '';
		// 	} 
		// }
	}
	ngOnInit(): void {
		this.sharedService.changedToken.subscribe(message => this.sessoinId = message);
		if (this.sessoinId === '' || this.sessoinId === undefined || this.sessoinId === null) {
			this.sessoinId = localStorage.getItem('userToken');
		}
		// this.sessoinId = localStorage.getItem('userToken');
	}
	login(value) {
		var formData: any = new FormData();
		formData.append("username", value.username);
		formData.append("password", value.password);
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		
		return this.http.post(AppSettings.API_ENDPOINT + 'login.php',formData).pipe(map(res => <any>res));
	}
	guestLogin() {

		var formData: any = new FormData();
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");

		return this.http.post(AppSettings.API_ENDPOINT + 'guest.php', formData).pipe(map(res => <any>res));
	}
	signup(value) {
		let headers = new HttpHeaders({
			//  'Content-Type': 'application/json' 			 
		});

		var formData: any = new FormData();
		formData.append("username", value.username1);
		formData.append("password", value.password1);
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		formData.append("email", value.email1);
		// this.http.post('base-url', formData)
		// let options = { headers: headers, method: 'post' };
		return this.http.post(AppSettings.API_ENDPOINT + 'register.php', formData).pipe(map(res => <any>res));
	}

	get_team(data, token) {
		let headers = new HttpHeaders({
			'Authorization': token, 			 
		});
		let options = { headers: headers };
		var formData: any = new FormData();
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		formData.append("league_name", data);
		return this.http.post(AppSettings.API_ENDPOINT + 'get_teams.php', formData ,options).pipe(map(res => <any>res)
		
		);
	}


	get_season(token) {
		let headers = new HttpHeaders({
			'Authorization': token,
		});	
		let options = { headers: headers };
		var formData: any = new FormData();
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		return this.http.post(AppSettings.API_ENDPOINT + 'get_leagues.php', formData ,options  ).pipe(map(res => <any>res));
	}

	get_opponent(data, token) {
		let headers = new HttpHeaders({
			'Authorization': token,			 
		});
		let options = { headers: headers };
		var formData: any = new FormData();
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		formData.append("league_name", data);
		return this.http.post(AppSettings.API_ENDPOINT + 'get_teams.php', formData ,options).pipe(map(res => <any>res));
	}
	gameListFullSeason(request, token) {
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'play_fsv.php', request ,options).pipe(map(res => <any>res));
	}
	gameListSeasonTeam(request, token) {
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'play_82.php', request ,options).pipe(map(res => <any>res));
	}
	withoutQtrTable(token) {
		let headers = new HttpHeaders({
			'Authorization': token,		 
		});
		let options = { headers: headers };
		var formData: any = new FormData();
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		return this.http.post(AppSettings.API_ENDPOINT + 'get_played_game_list.php', formData ,options).pipe(map(res => <any>res));
	}

	QtrTable(data, token) {
		let headers = new HttpHeaders({
			'Authorization': token,		 
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'play_predict.php', data ,options).pipe(map(res => <any>res));
	}
	actualPlayerList(request, token) {
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_actual_player_stats.php', request ,options).pipe(map(res => <any>res));
	}

	getPlayersSubs(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_players_subs.php',  
		request, options).pipe(map(res => <any>res));

	}
	setPlayerSub(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'set_players_subs.php',  
		request, options).pipe(map(res => <any>res));

	}

	rawSate(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_raw_stats.php',  
		request, options).pipe(map(res => <any>res));

	}

	rawBoxScore(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_raw_box_scores.php',  
		request, options).pipe(map(res => <any>res));

	}

	getCharacteristics(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'get_players_chars.php',  
		request, options).pipe(map(res => {
			return res
		}
			));

	}

	getDatabase(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'db_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getTeam_Database(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'team_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getPlayer_Database(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'player_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getyear_Database(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'year_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getleague_Database(request){		
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'league_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getTeamDatabase(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'teams_db_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getTeam_Team(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'team_team_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getTeam_League(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'team_league_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	getTeam_Year(request){
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'team_year_fetch.php',  
			request).pipe(map(res => {
			return res
			}
		));
	}

	playGame_Single(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'get_singlegame_stats.php',  
		request, options).pipe(map(res => {
			return res
		}
		));
	}

	getPlay_Single_Step(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post<any>(AppSettings.API_ENDPOINT + 'playsinglegame_step.php',  
		request, options).pipe(map(res => <any>res));
	}

	playGame_Single_One(request, token){             
		let headers = new HttpHeaders({
			'Authorization': token,           
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'playsinglegame_initial.php',          //'set_players_subs.php',  
		// request, options).pipe(map(res => {
		// 	return res
		// }			
		// ));
		request, options).pipe(map(res => <any>res));
	}

	setCharacteristics(request, token){                
		let headers = new HttpHeaders({
			'Authorization': token,           
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'set_players_chars.php',          //'set_players_subs.php',  
		request, options).pipe(map(res => <any>res));
	}
	

	getComments(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_play_by_play.php',  
		request, options).pipe(map(res => <any>res));
	}
	
    getDraft(request, token){                //228   15 July
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_players.php',  
		request, options).pipe(map(res => <any>res));
	}


    


    setDraft(request, token){                       // 242   15 July
		let headers = new HttpHeaders({
			'Authorization': token,            
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'set_players_drafts.php',  
		request, options).pipe(map(res => <any>res));
	}


	getSortable(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_box_scores.php',  
		request, options).pipe(map(res => <any>res));
	}

    getSortableStats(request, token){
		let headers = new HttpHeaders({
			'Authorization': token,
		});
		let options = { headers: headers };
		return this.http.post(AppSettings.API_ENDPOINT + 'get_player_results.php',  
		request, options).pipe(map(res => <any>res));
	}

	socialLogin(request) {
		var formData: any = new FormData();
		formData.append("username", request.username);
		formData.append("authtoken", request.authtoken);
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		return this.http.post(AppSettings.API_ENDPOINT + 'auth_login.php',formData).pipe(map(res => <any>res));
	}
	socialRegister(request) {
		var formData: any = new FormData();
		formData.append("username", request.username);
		formData.append("authtoken", request.authtoken);
		formData.append("apikey", "Xz9hhJ0fEbhtRVfLfadkjHBHnrlUaC3A");
		formData.append("email", request.email);
		return this.http.post(AppSettings.API_ENDPOINT + 'auth_register.php',formData).pipe(map(res => <any>res));
	}

}
