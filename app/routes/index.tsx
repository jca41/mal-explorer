import { useFetcher } from '@remix-run/react';

import { SearchList, SearchListItem } from '~/components/search-list';
import { NodeList } from '~/contracts/mal';

// TODO: remove me
const MOCK_DATA = {
  data: [
    {
      node: {
        id: 8247,
        title: 'Bleach Movie 4: Jigoku-hen',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/9/26792.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/9/26792l.jpg',
        },
        alternative_titles: { synonyms: ['Bleach: The Hell Chapter'], en: 'Bleach the Movie: Hell Verse', ja: '劇場版 BLEACH 地獄篇' },
        mean: 7.6,
        rank: 1338,
        popularity: 1024,
        media_type: 'movie',
        status: 'finished_airing',
        start_season: { year: 2010, season: 'fall' },
      },
    },
    {
      node: {
        id: 4835,
        title: 'Bleach Movie 3: Fade to Black - Kimi no Na wo Yobu',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/3/64689.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/3/64689l.jpg',
        },
        alternative_titles: {
          synonyms: ['Fade to Black: Call Out Your Name'],
          en: 'Bleach the Movie: Fade to Black',
          ja: '劇場版 BLEACH Fade to Black 君の名を呼ぶ',
        },
        mean: 7.5,
        rank: 1647,
        popularity: 928,
        media_type: 'movie',
        status: 'finished_airing',
        start_season: { year: 2008, season: 'fall' },
      },
    },
    {
      node: {
        id: 1686,
        title: 'Bleach Movie 1: Memories of Nobody',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/1649/121185.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/1649/121185l.jpg',
        },
        alternative_titles: { synonyms: [], en: 'Bleach the Movie: Memories of Nobody', ja: '劇場版 BLEACH MEMORIES OF NOBODY' },
        mean: 7.43,
        rank: 1911,
        popularity: 780,
        media_type: 'movie',
        status: 'finished_airing',
        start_season: { year: 2006, season: 'fall' },
      },
    },
    {
      node: {
        id: 2889,
        title: 'Bleach Movie 2: The DiamondDust Rebellion - Mou Hitotsu no Hyourinmaru',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/12/7499.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/12/7499l.jpg',
        },
        alternative_titles: {
          synonyms: [],
          en: 'Bleach the Movie: The DiamondDust Rebellion',
          ja: '劇場版 BLEACH The DiamondDust Rebellion もう一つの氷輪丸',
        },
        mean: 7.43,
        rank: 1912,
        popularity: 879,
        media_type: 'movie',
        status: 'finished_airing',
        start_season: { year: 2007, season: 'fall' },
      },
    },
    {
      node: {
        id: 269,
        title: 'Bleach',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/3/40451.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/3/40451l.jpg',
        },
        alternative_titles: { synonyms: [], en: 'Bleach', ja: 'BLEACH - ブリーチ -' },
        mean: 7.85,
        rank: 793,
        popularity: 40,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2004, season: 'fall' },
      },
    },
    {
      node: {
        id: 41467,
        title: 'Bleach: Sennen Kessen-hen',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/1256/120125.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/1256/120125l.jpg',
        },
        alternative_titles: { synonyms: ['Bleach: Thousand-Year Blood War Arc'], en: '', ja: 'BLEACH 千年血戦篇' },
        popularity: 1586,
        media_type: 'tv',
        status: 'not_yet_aired',
        start_season: { year: 2022, season: 'fall' },
      },
    },
    {
      node: {
        id: 762,
        title: 'Bleach: Memories in the Rain',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/5/21947.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/5/21947l.jpg',
        },
        alternative_titles: {
          synonyms: ['Bleach: Jump Festa 2004', 'ブリーチ Memories in the Rain'],
          en: 'Bleach: Memories in the Rain',
          ja: 'BLEACH Memories in the Rain',
        },
        mean: 7.16,
        rank: 3140,
        popularity: 1528,
        media_type: 'special',
        status: 'finished_airing',
        start_season: { year: 2004, season: 'fall' },
      },
    },
    {
      node: {
        id: 834,
        title: 'Bleach: The Sealed Sword Frenzy',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/1/834.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/1/834l.jpg',
        },
        alternative_titles: { synonyms: ['Bleach: Jump Festa 2005'], en: '', ja: 'BLEACH The Sealed Sword Frenzy' },
        mean: 6.97,
        rank: 4013,
        popularity: 1635,
        media_type: 'special',
        status: 'finished_airing',
        start_season: { year: 2006, season: 'winter' },
      },
    },
    {
      node: {
        id: 35118,
        title: 'Bleach KaraBuri!: Gotei Juusan Yatai Daisakusen!',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/3/84864.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/3/84864l.jpg',
        },
        alternative_titles: {
          synonyms: ['Bleach Jump Festa Anime Tour 2008', 'Bleach Colorful!: Gotei Juusan Yatai Daisakusen!'],
          en: '',
          ja: 'BLEACH カラブリ！護廷十三屋台大作戦！',
        },
        mean: 6.56,
        rank: 5955,
        popularity: 4641,
        media_type: 'ova',
        status: 'finished_airing',
        start_season: { year: 2008, season: 'summer' },
      },
    },
    {
      node: {
        id: 38810,
        title: 'Bleach: Gotei 13 Omake',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/1260/97246.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/1260/97246l.jpg',
        },
        alternative_titles: { synonyms: ['Bleach: Jump Festa 2004'], en: 'Bleach: 13 Court Guard Squads Omake', ja: '' },
        mean: 6.5,
        rank: 6289,
        popularity: 5423,
        media_type: 'special',
        status: 'finished_airing',
        start_season: { year: 2005, season: 'spring' },
      },
    },
    {
      node: {
        id: 195,
        title: 'Onegai☆Teacher',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/13/5241.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/13/5241l.jpg',
        },
        alternative_titles: { synonyms: ['Onegai Sensei'], en: 'Please Teacher!', ja: 'おねがい☆ティーチャー' },
        mean: 7.13,
        rank: 3299,
        popularity: 1174,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2002, season: 'winter' },
      },
    },
    {
      node: {
        id: 1533,
        title: 'Ai Tenshi Densetsu Wedding Peach',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/7/20446.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/7/20446l.jpg',
        },
        alternative_titles: { synonyms: ['Legend of the Angel of Love - Wedding Peach'], en: 'Wedding Peach', ja: '愛天使伝説 ウェディングピーチ' },
        mean: 6.71,
        rank: 5197,
        popularity: 4106,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 1995, season: 'spring' },
      },
    },
    {
      node: {
        id: 1957,
        title: 'Ai Tenshi Densetsu Wedding Peach DX',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/13/28128.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/13/28128l.jpg',
        },
        alternative_titles: { synonyms: ['Wedding Peach Deluxe'], en: 'Wedding Peach DX', ja: '愛天使伝説ウェディング・ピーチDX' },
        mean: 6.67,
        rank: 5388,
        popularity: 7009,
        media_type: 'ova',
        status: 'finished_airing',
        start_season: { year: 1996, season: 'fall' },
      },
    },
    {
      node: {
        id: 38814,
        title: 'Nobunaga-sensei no Osanazuma',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/1524/97286.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/1524/97286l.jpg',
        },
        alternative_titles: { synonyms: ["Mr. Nobunaga's Young Bride"], en: "Nobunaga teacher's young bride", ja: 'ノブナガ先生の幼な妻' },
        mean: 5.3,
        rank: 11334,
        popularity: 2132,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2019, season: 'spring' },
      },
    },
    {
      node: {
        id: 34052,
        title: '100% Pascal-sensei (TV)',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/10/86858.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/10/86858l.jpg',
        },
        alternative_titles: { synonyms: [], en: '100% Teacher Pascal', ja: '100%パスカル先生 (TV)' },
        mean: 5.61,
        rank: 10400,
        popularity: 9094,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2017, season: 'spring' },
      },
    },
    {
      node: {
        id: 17247,
        title: 'Machine-Doll wa Kizutsukanai',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/4/56141.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/4/56141l.jpg',
        },
        alternative_titles: {
          synonyms: ['Machine Girl wa Kizutsukanai', 'Kikou Shoujo wa Kizutsukanai'],
          en: 'Unbreakable Machine-Doll',
          ja: '機巧少女〈マシンドール〉は傷つかない',
        },
        mean: 7.08,
        rank: 3537,
        popularity: 637,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2013, season: 'fall' },
      },
    },
    {
      node: {
        id: 325,
        title: 'Peach Girl',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/13/75579.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/13/75579l.jpg',
        },
        alternative_titles: { synonyms: [], en: 'Peach Girl: Super Pop Love Hurricane', ja: 'ピーチガール' },
        mean: 6.96,
        rank: 4058,
        popularity: 1817,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2005, season: 'winter' },
      },
    },
    {
      node: {
        id: 34618,
        title: 'Blend S',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/6/88286.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/6/88286l.jpg',
        },
        alternative_titles: { synonyms: [], en: 'BLEND-S', ja: 'ブレンド・S' },
        mean: 7.3,
        rank: 2433,
        popularity: 290,
        media_type: 'tv',
        status: 'finished_airing',
        start_season: { year: 2017, season: 'fall' },
      },
    },
    {
      node: {
        id: 23895,
        title: 'REACH x Thermae Romae: Pietrada no Kekkon',
        main_picture: {
          medium: 'https://api-cdn.myanimelist.net/images/anime/6/61879.jpg',
          large: 'https://api-cdn.myanimelist.net/images/anime/6/61879l.jpg',
        },
        alternative_titles: {
          synonyms: ['Thermae Romae x REACH', "Thermae Romae: Pietrada's Wedding", "REACH x Thermae Romae: Pietrada's Marriage"],
          en: '',
          ja: 'REACH x テルマエ・ロマエ「ピエトラーダの結婚」',
        },
        mean: 5.67,
        rank: 10185,
        popularity: 12245,
        media_type: 'special',
        status: 'finished_airing',
        start_season: { year: 2014, season: 'spring' },
      },
    },
  ],
  paging: {
    next: 'https://api.myanimelist.net/v2/anime?offset=20&fields=id%2Ctitle%2Cmain_picture%2Calternative_titles%2Cmean%2Crank%2Cpopularity%2Cmedia_type%2Cstatus%2Cstart_season&q=bleach&limit=20',
  },
};

export default function Index() {
  const fetcher = useFetcher<NodeList>();

  return (
    <div className="flex flex-col space-y-10">
      <fetcher.Form method="get" action="/api/search" className="flex flex-row justify-center space-x-2">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          required
          minLength={3} // min query is 3 chars
          autoComplete="off"
          className="rounded-lg h-12 w-full max-w-xs"
        ></input>
      </fetcher.Form>
      <SearchList>
        {/* fetcher?.data */}
        {(MOCK_DATA.data ?? []).map(({ node }) => (
          <SearchListItem key={node.id} {...node} />
        ))}
      </SearchList>

      <div>{JSON.stringify(fetcher.data)}</div>
    </div>
  );
}
