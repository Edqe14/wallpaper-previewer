import { createStore, select, setProp, withProps } from '@ngneat/elf';
import { selectAllEntities, setEntities, withEntities } from '@ngneat/elf-entities';
import { switchMap } from 'rxjs/operators';
import { GHResponse, Item } from '@/lib/types';
import transformResponse from '@/lib/utils/transformResponse';
import shuffle from '@/lib/utils/shuffle';

export interface StoreProps {
  theme: 'light' | 'dark';
  isLoading: boolean;
  sources: string[][];
  scrollTop: number;
}

const store = createStore(
  { name: 'store' },
  withProps<StoreProps>({
    theme: 'dark',
    isLoading: true,
    sources: [
      //   owner           repo      ...path
      ['kitsunebishi', 'Wallpapers', 'images'],
      ['Edqe14', 'wallpapers', 'genshin'],
      ['Edqe14', 'wallpapers', 'hololive'],
      ['Edqe14', 'wallpapers', 'misc'],
    ],
    scrollTop: 0
  }),
  withEntities<Item>()
);

export const items$ = store.pipe(selectAllEntities());
export const theme$ = store.pipe(select(({ theme }) => theme));
export const scrollTop$ = store.pipe(select(({ scrollTop }) => scrollTop));
export const sourceLinks$ = store
  .pipe(select(({ sources }) => sources))
  .pipe(switchMap((value) => [value.map(([owner, repo, ...path]) => `https://api.github.com/repos/${owner}/${repo}/contents/${path.join('/')}`)]));

sourceLinks$.subscribe(async (value) => {
  store.update(setProp('isLoading', true));

  const res = await Promise.all(value.map((url) => fetch(url).then<GHResponse[]>((resp) => resp.json())));
  const items = shuffle(res
    .map((v, i) => v.map((resp) => transformResponse(resp, store.getValue().sources[i].slice(0, 2) as [string, string])))
    .flat());

  store.update(setProp('isLoading', false), setEntities(items));
});

export const setScrollTop = (value: number) => store.update(setProp('scrollTop', value));

export const setTheme = (theme: 'light' | 'dark') => {
  window.localStorage.setItem('theme', theme);
  store.update(setProp('theme', theme));

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
export const toggleTheme = () => setTheme(store.getValue().theme === 'dark' ? 'light' : 'dark');

export default store;