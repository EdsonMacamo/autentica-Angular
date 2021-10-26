import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';
  private subJectUser$:BehaviorSubject<User> = new BehaviorSubject(null);
  private subJetLogedIn$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) { }

  register(user:User): Observable<User>{

    return this.http.post<User>(`${this.url}/register`, user)
  }
  login(credentials:{email:string,password:string}):Observable<User>{
    return this.http.post<User>(`${this.url}/login`, credentials)
    .pipe(
      tap((u:User) => {
       localStorage.setItem('token', u.token);
        this.subJetLogedIn$.next(true);
        this.subJectUser$.next(u);
      })
    )
  }
  isAuthenticated():Observable<boolean>{
    const token = localStorage.getItem('token');
    if(token && !this.subJetLogedIn$.value){
      return this.checkTokenValidation();
    }
    return this.subJetLogedIn$.asObservable();
  }
  checkTokenValidation():Observable<boolean>{
    return this.http.get<User>(`${this.url}/user`)
    .pipe(
      tap((u:User) => {
        if(u){
          this.subJetLogedIn$.next(true);
          this.subJectUser$.next(u)
        }
      }),
      map((u:User) => (u)?true:false),
      catchError((err) => {
        this.logout();
        return of(false);
      })
    );
  }
  getuser():Observable<User>{
    return this.subJectUser$.asObservable();
  }

  logout(){
    localStorage.removeItem('token');
    this.subJetLogedIn$.next(false);
    this.subJectUser$.next(null);
  }
}
