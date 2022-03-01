import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import {
  GetRepositoriesPayload,
  GetRepositoriesSuccessPayload,
  GetRepositoryPayload,
  GetRepositorySuccessPayload,
  RepositoryItem,
} from '../shared';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private clientid = environment.clientid;
  private clientsecret = environment.clientsecret;
  private apiUrl = 'https://api.github.com';

  private _repositories$: Subject<RepositoryItem[]> = new Subject();
  public repositories$: Observable<RepositoryItem[]> =
    this._repositories$.asObservable();

  private _searchFinished$: BehaviorSubject<any> = new BehaviorSubject(false);
  public searchFinished$: Observable<boolean> =
    this._searchFinished$.asObservable();

  private _repositoryDetails$: Subject<GetRepositorySuccessPayload> =
    new Subject();
  public repositoryDetails$: Observable<GetRepositorySuccessPayload> =
    this._repositoryDetails$.asObservable();

  constructor(private http: HttpClient) {}

  getRepositoriesByName(payload: GetRepositoriesPayload): void {
    this.http
      .get<GetRepositoriesSuccessPayload>(
        `${this.apiUrl}/search/repositories?q=${payload.name}&client_id=${this.clientid}&client_secret=${this.clientsecret}`
      )
      .pipe(
        tap(() => this._searchFinished$.next(false)),
        map((response) => response.items)
      )
      .subscribe((response) => {
        this._repositories$.next(response);
        this._searchFinished$.next(true);
      });
  }

  getRepositoryById(payload: GetRepositoryPayload): void {
    this.http
      .get<GetRepositorySuccessPayload>(
        `${this.apiUrl}/repositories/${payload.id}&client_id=${this.clientid}&client_secret=${this.clientsecret}`
      )
      .subscribe((response) => this._repositoryDetails$.next(response));
  }
}
