import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/lib/types';

export const BLUR_DATA = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAK5QTFRFXGVuW11nVlBcUEZRTUBMUUBNWUdVYFZjZWlzaniAXGBqWlJeU0NPSjlERjVATDRCWTtLZU1db2h1dn+JXVllWUdWTzZFRC86QC03SC06WTNEa0VZeWZ3goORXFRhVkBPSi89PSk0OiszRSs4Wi9CckBWg2J3i4SVW1NfUz1MRCw5NycwNSoxQSs3WC5BdD9WiGF3kISWUD1LPys3MSYvLygwOyo1VS0/imJ4kYWYi/j0FgAAAElJREFUeJwFwQMCwDAQALCb0dm21Rn//9gSAIKkaIbleAFEJMmKqumGCZbtuJ4fhFEMSZrlRVnVTQtdP4zTvOB1A7Qf53U/+P1+lXoGsCAeJSEAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJ9QTFRFhoSKjIqOlJGUm5eZoZydpqChp6GioJuclpKUj4uOcG5zdXJ2end6fXh8gHp8g31/hX+AgHt9eXV4dHF1VFJVV1VYWldaWlZZWlVXXFZZXlhaW1daV1RYU1JVODU3Ojg6PDk7Ozc6OTU3OjY4Ojc5ODY5NjU4JiQkJyUmKSYnKCUmJSIkJSEjJSMlGxkZHRsaHxwcHhsbGRcYGhkZHBoa8h1JowAAAElJREFUeJwFwQcCQDAMAMDYe+9NbZWi/P9t7gAEUZIVVdMNMC3bcT0/CCOIkzTLi7KqG2i7fiBknOYF1m0/6EkREdh1P4xz/n4/lKwGnPHjYiIAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALRQTFRFyr+00LKt2qin5Kam6amo6a2q6LKu5ry25c3D5drOn6ihqaOgvKOiz6en2a2r27Gv2raz2L6518nB1dDIboeGfIqLlJKVrJ2fu6Wnv6msvq6wvLS0urq4t727R2NqVWtyand+gYSMj42YlJGflJajlJylkqOoj6epOExZQlJgUV1rYGl5a3GGb3aQb3yUcIaWb5GZbZmaNj5QPENVRUtfTlRsU1x6VmKFV2uJWHmLV4mOVZORMl5dzwAAAEhJREFUeJwFwYMBwAAMALDOtm3b+v+vJQAIiuEESdEMsBwviJKsqBrohmnZjuv5AYRRnKRZXpQV1E3b9cM4zQus236c1/283w+XSwbru0thhAAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALFQTFRF5NS+5tjC5dfD2Mu9vbCtopScnYuYspmhzq+t4L215tbB5tfC5NPA2MW3wK6oqJeaoY2VspOZzJ+g3qak5dLA5NLA4cu617uvwqehrZWVo4yQroyRxpCU2pKW3Mm62sC00q+nw5yZr42Oo4WJqoSKv4eO1IqSzcC1z8G2z7qxy6mkwJaVr4eKo3+Ep4CIuoeQzo6Zvby0wL61xLixw6mmu5aXr4aJpX2DqH+IuIqWyJajj2HZiwAAAElJREFUeJwFwYMBwEAQALCrbetr29h/sCYAGE6QFM2wHPCCKMmKqukGmJbtuJ4fhBEgFCdplhdlBXXTdv0wTvMC67Yf53U/7/cDlXwGzqT/R7wAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHVQTFRFsKqwsKqvr6iuraWnrqOesaObs6afsqmosaqurqetqqKlqZ2bq52Wr6KbsaemsKquraetp6ClopiaopaUp52araWmp6CmnpecnJSYo5ueq6SorqiuqKKooJqhnZaeo52iq6Wqr6mvqqSqo56loZyjpZ+mrKas8E9w2QAAADxJREFUeJxjYGBkYmZhZWPnYAACTi5uHl4+fhBTQFBIWEQUwhQTl5CUYgQxpWVk5eQVwExFJWUVVTUGBgBJuwMHGDdrTwAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALFQTFRFXE1NalZVemBefGJgbllbW05STEZLQT5EOzk/Ozg+VkpLZ1RUeWBefmNhc11dYlNWUkpPRkJIPjxCOzo/TkZIXlBQb1pZdV5dbllZYVJVVEtQSERKPz5EOTlARUBEUEdKXU9QY1FSX05QV0pNTkZLREFHOzpCNDU9PjxAT0VJVEdJUURHS0FFRD5DPTtCNTY9LzE5OTg8Pzs/SD9DTkJFTEBCRTs/Pjg9NzU8MTE5LS821mcnvQAAAElJREFUeJwFwYMBwEAQALCrbetr29h/sCYAGE6QFM2wHPCCKMmKqukGmJbtuJ4fhBGgOEmzvCirGhrUdv0wTvMC67Yf53U/7/cDlbwGzs+ZjzIAAAAASUVORK5CYII=',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALRQTFRFkavImK/MnbDMmKnDjZ+4iJy1iJy4gJazb4ajX3eUhpuzkKK6lqW9kZ61hZKofouhfIqhdIGaYm6GUF51cYGVe4qfgo+lf4qfdH6Sa3WIZ3GFYGd7UFRoQUVXU2V3XW2BZXOIZHCFW2Z5Ul5vT1hqSk9hPkBRMjNCQVZqSV1yT2J4TV50RlVnP05fPUpbOkNUMjhIKS08O1NqQlpyRFtyQFNpOElbM0NUMkJTMD5PKTRFISs6BmIqPgAAAEhJREFUeJwFwYMBwAAMALDOtm3b+v+vJQAIiuEESdEMsBwviJKsqBrohmnZjuv5AYRRnKRZXpQV1E3b9cM4zQus236c1/283w+XSwbru0thhAAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAMAAADNLv/0AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALFQTFRFXE1NalZVemBefGJgbllbW05STEZLQT5EOzk/Ozg+VkpLZ1RUeWBefmNhc11dYlNWUkpPRkJIPjxCOzo/TkZIXlBQb1pZdV5dbllZYVJVVEtQSERKPz5EOTlARUBEUEdKXU9QY1FSX05QV0pNTkZLREFHOzpCNDU9PjxAT0VJVEdJUURHS0FFRD5DPTtCNTY9LzE5OTg8Pzs/SD9DTkJFTEBCRTs/Pjg9NzU8MTE5LS821mcnvQAAAElJREFUeJwFwYMBwEAQALCrbetr29h/sCYAGE6QFM2wHPCCKMmKqukGmJbtuJ4fhBGgOEmzvCirGhrUdv0wTvMC67Yf53U/7/cDlbwGzs+ZjzIAAAAASUVORK5CYII=',
];

const Preview = ({ id, url, onClick }: Item) => (
  <Link href={`/wallpaper/${id}`}>
    <span className="flex rounded-none hover:rounded-lg hover:drop-shadow-lg overflow-hidden transition-all duration-300 ease-in-out" onClick={onClick}>
      <Image
        className="cursor-pointer hover:scale-110 transition-transform duration-500 ease-in-out"
        key={id}
        src={url}
        objectFit="cover"
        width={640}
        height={360}
        blurDataURL={BLUR_DATA[Math.floor(Math.random() * BLUR_DATA.length)]}
        placeholder="blur"
      />
    </span>
  </Link>
);

export default Preview;