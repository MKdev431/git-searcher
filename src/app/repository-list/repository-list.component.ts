import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GithubService } from 'src/app/services/github.service';
import { GetRepositoriesSuccessPayload, RepositoryItem } from '../shared';

@Component({
  selector: 'gs-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrls: ['./repository-list.component.css'],
})
export class RepositoryListComponent implements OnInit {
  repositories: RepositoryItem[] = [];
  name: string = '';
  displayedColumns: string[] = ['name'];
  searchFinished$: Observable<boolean> = this.githubService.searchFinished$;

  constructor(private githubService: GithubService, private router: Router) {}

  getRepositoriesByName() {
    this.githubService.getRepositoriesByName({ name: this.name });
  }

  ngOnInit(): void {
    this.githubService.repositories$.subscribe((response) => {
      this.repositories = response;
    });
  }

  goToDetails(id: number): void {
    this.router.navigateByUrl(`details/${id}`);
  }
}
