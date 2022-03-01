export interface GetRepositoriesSuccessPayload {
  incomplete_results: boolean;

  items: RepositoryItem[];
  total_count: number;
}

export interface RepositoryItem {
  id: number;
  name: string;
}
