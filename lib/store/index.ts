import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { switchMap } from 'rxjs/operators';
import { GHResponse, Item } from '@/lib/types';
import transformResponse from '../utils/transformResponse';

export interface StoreProps {
  theme: 'light' | 'dark';
  isLoading: boolean;
  sources: string[][];
}

const store = createStore(
  { name: 'store' },
  withProps<StoreProps>({
    theme: 'dark',
    isLoading: true,
    sources: [
      //   owner           repo      ...path
      ['kitsunebishi', 'Wallpapers', 'images'],
    ]
  }),
  withEntities<Item>()
);

export const items$ = store.pipe(selectAllEntities());
export const theme$ = store.pipe(select(({ theme }) => theme));
export const sourceLinks$ = store
  .pipe(select(({ sources }) => sources))
  .pipe(switchMap((value) => [value.map(([owner, repo, ...path]) => `https://api.github.com/repos/${owner}/${repo}/contents/${path.join('/')}`)]));

sourceLinks$.subscribe(async (value) => {
  store.update(setProp('isLoading', true));

  const res = await Promise.all(value.map((url) => fetch(url).then<GHResponse[]>((resp) => resp.json())));
  const items = res
    .map((v, i) => v.map((resp) => transformResponse(resp, store.getValue().sources[i].slice(0, 2) as [string, string])))
    .flat();

  store.update(setProp('isLoading', false), setEntities(items));
});

export const setTheme = (theme: 'light' | 'dark') => store.update(setProp('theme', theme));
export const toggleTheme = () => setTheme(store.getValue().theme === 'dark' ? 'light' : 'dark');

export default store;