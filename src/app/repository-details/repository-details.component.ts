import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from '../services/github.service';
import { GetRepositorySuccessPayload } from '../shared';

@Component({
  selector: 'gs-repository-details',
  templateUrl: './repository-details.component.html',
  styleUrls: ['./repository-details.component.css'],
})
export class RepositoryDetailsComponent implements OnInit {
  repositoryDetails$: Observable<GetRepositorySuccessPayload> =
    this.githubService.repositoryDetails$;

  constructor(
    private githubService: GithubService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRepository();
  }

  backToList(): void {
    this.router.navigateByUrl('list');
  }

  getRepository(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.githubService.getRepositoryById({ id });
  }
}
