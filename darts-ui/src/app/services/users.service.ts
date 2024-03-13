import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import { Team } from '../models/team.model';
import { HttpService } from './http.service';
import  UserResponse  from '../models/user/user-response.model';
import { MessageResponse } from '../models/message-response.model';
import UsersResponse from '../models/user/users-response.model.';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private httpService: HttpService) { 
    }

  private api = 'http://localhost:8080';
  private getUsersPath = '/user/all';
  private addUsersPath = '/user/add';
  private addUserByIdPath = '/user';
  private deleteUserByIdPath = '/user/delete';
 
  // users: User[] = [
  //   {userId: 1, firstName: 'Gabe', lastName: 'Altenhofen', email: 'heyitsgabe@hotmail.com'},
  //   {userId: 2, firstName: 'Shezza', lastName: 'Altenhofen', email: 'shezzafromnz@yahoo.co.uk'},
  //   {userId: 3, firstName: 'Luke', lastName: 'Lorenz', email: 'luke.jlorenz@gmail.com'},
  //   {userId: 4, firstName: 'Craig', lastName: 'Freyman', email: 'craigfreyman@gmail.com'},
  //   {userId: 5,  firstName: 'Paul', lastName: 'Loftis', email: 'ploftis2000@yahoo.com'},
  //   {userId: 6, firstName: 'Bryan', lastName: 'Swalley', email: 'bryanswalley@yahoo.com'},
  //   {userId: 7,  firstName: 'Lee', lastName: 'McKitrick', email: 'dleewv@yahoo.com'},
  //   {userId: 8,  firstName: 'Corey', lastName: 'McKitrick', email: 'cory.mckitrick@gmail.com'},
  //   {userId: 9, firstName: 'Lance', lastName: 'McElhinney', email: 'linneymc@yahoo.com'},
  //   {userId: 10,  firstName: 'Erik', lastName: 'Bechtold', email: 'erkbechtold@hotmail.com'} ,
  //   {userId: 11,  firstName: 'RJ', lastName: 'Miller', email: 'arejaymils@gmail.com'},
  //   {userId: 12,  firstName: 'Walter', lastName: 'Olsen', email: 'walteraolsen45@gmail.com'},
  //   {userId: 13,  firstName: 'Eric', lastName: 'Mikolitch', email: 'mikolitche@gmail.com'},
  //   {userId: 14,  firstName: 'Kirk', lastName: 'Schoch', email: 'kirkwschoch@gmail.com'},
  //   {userId: 9995, firstName: 'Player 1', lastName: '', email: ''},
  //   {userId: 9996, firstName: 'Player 2', lastName: '', email: ''},
  //   {userId: 9997, firstName: 'Player 3', lastName: '', email: ''},
  //   {userId: 9998, firstName: 'Player 4', lastName: '', email: ''}, 
  //   {userId: 9999, firstName: 'CPU', lastName: '', email: ''}  ];

  teams: Team[] = [
    {teamId: 1, teamName: 'The Donnybrooks', users: [{userId: 1, firstName: 'Gabe', lastName: 'Altenhofen', email: 'heyitsgabe@hotmail.com'},
    {userId: 3, firstName: 'Luke', lastName: 'Lorenz', email: 'luke.jlorenz@gmail.com'}]},
    {teamId: 2, teamName: 'Merica', users: [{userId: 5,  firstName: 'Paul', lastName: 'Loftis', email: 'ploftis2000@yahoo.com'},
    {userId: 6, firstName: 'Bryan', lastName: 'Swalley', email: 'bryanswalley@yahoo.com'}]},
    {teamId: 3, teamName: 'Mounties', users: [{userId: 7,  firstName: 'Lee', lastName: 'McKitrick', email: 'dleewv@yahoo.com'},
    {userId: 8,  firstName: 'Corey', lastName: 'McKitrick', email: 'cory.mckitrick@gmail.com'}]},
    {teamId: 5, teamName: 'Bumblebees', users: [    {userId: 11,  firstName: 'RJ', lastName: 'Miller', email: 'arejaymils@gmail.com'},
    {userId: 12,  firstName: 'Walter', lastName: 'Olsen', email: 'walteraolsen45@gmail.com'}]},
    {teamId: 4, teamName: 'Alan Evans', users: [    {userId: 9, firstName: 'Lance', lastName: 'McElhinney', email: 'linneymc@yahoo.com'},
    {userId: 10,  firstName: 'Erik', lastName: 'Bechtold', email: 'erkbechtold@hotmail.com'}]},
    {teamId: 6, teamName: 'Needle Nose', users: [ {userId: 13,  firstName: 'Eric', lastName: 'Mikolitch', email: 'mikolitche@gmail.com'},
    {userId: 14,  firstName: 'Kirk', lastName: 'Schoch', email: 'kirkwschoch@gmail.com'}]},
    {teamId: 998, teamName: 'Default One', users: [ {userId: 9995,  firstName: 'Player 1', lastName: '', email: ''},
    {userId: 9996,  firstName: 'Player 2', lastName: '', email: ''}]},
    {teamId: 999, teamName: 'Default Two', users: [ {userId: 9997,  firstName: 'Player 3', lastName: '', email: ''},
    {userId: 9998,  firstName: 'Player 4', lastName: '', email: ''}]}
  ];


   getUsers(): Observable<UsersResponse>{
     return this.httpService.getWithToken(this.getURL(this.api, this.getUsersPath));
   }

  getUserById(userId:number): Observable<UserResponse>{
    return this.httpService.getWithToken(this.getURL(this.api, `${this.addUserByIdPath}/${userId}`));
  }

  addUser(firstName: string, lastName: string, email: string):Observable<MessageResponse>{
    const user: User = { userId: 0 ,firstName, lastName, email };
    return this.httpService.postWithToken(this.getURL(this.api, this.addUsersPath),user)
  }

  deleteUser(userId: number):Observable<MessageResponse> {
   return  this.httpService.deleteWithToken(this.getURL(this.api, `${this.deleteUserByIdPath}/${userId}`));
  }

  getTeams(): Team[] {
    return this.teams;
  }

  createTeam(newTeam: Team): void {
    this.teams.push(newTeam);
    console.log('service   teams: ', this.teams);
  }




  //TODO move to shared Util maybe
   getURL(api: string, route: string) {
    return `${api}${route}`;
  }

}
