import { Dispatch, SetStateAction } from 'react';

export interface Item {
  id: string;
  name: string;
  url: string;
  source: string;
  size: number;
  repository: [string, string];
}

export interface Links {
  self: string;
  git: string;
  html: string;
}

export interface GHResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: Links;
}

export type Dispatcher<T> = Dispatch<SetStateAction<T>>;