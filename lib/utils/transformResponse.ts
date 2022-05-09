import { GHResponse, Item } from '../types';

const transformResponse = ({ sha: id, name, size, html_url: source, download_url: url }: GHResponse, repository: [string, string]): Item => ({
  id,
  name,
  repository,
  size,
  source,
  url
});

export default transformResponse;