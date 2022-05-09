import { sha1 } from 'object-hash';
import { GHResponse, Item } from '../types';

const transformResponse = ({ sha, name, size, html_url: source, download_url: url }: GHResponse, repository: [string, string]): Item => ({
  id: sha1(name + sha),
  name,
  repository,
  size,
  source,
  url
});

export default transformResponse;