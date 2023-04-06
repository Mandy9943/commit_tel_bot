export interface Repository {
  name: string;
  owner: string;
  url: string;
}

export interface User {
  id: number;
}

export interface Group {
  id: number;
}
export interface CommitInfo {
  message: string;
  date: string;
}
