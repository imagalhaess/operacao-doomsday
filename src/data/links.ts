import type { TrackItem, VideoLink } from './types';

// Official Disney+ entity URLs, checked on 2026-11-20.
// Sources: https://www.disneyplus.com/brand/marvel
// https://www.disneyplus.com/explore/articles/marvel-movies-in-order
const disneyPlusLinks: Readonly<Partial<Record<string, string>>> = {
  'iron-man': 'https://www.disneyplus.com/browse/entity-0c520152-b81f-4c20-9310-003debd1947e',
  'incredible-hulk': 'https://www.disneyplus.com/browse/entity-30d00f7b-331a-4f43-b9e1-1989d39cb1a3',
  'iron-man-2': 'https://www.disneyplus.com/browse/entity-85c5529d-c053-4fa4-9957-4906eb5aedc6',
  thor: 'https://www.disneyplus.com/browse/entity-479d41e3-8438-4ba4-b93d-8223220e069c',
  'captain-america-first': 'https://www.disneyplus.com/browse/entity-8e68c43a-117c-4f4d-b217-0db106a1a614',
  avengers: 'https://www.disneyplus.com/browse/entity-d2ab699b-67da-4906-a7a4-5bc542c953cf',
  'iron-man-3': 'https://www.disneyplus.com/browse/entity-e8569c2d-85ec-42a4-8811-b2618d494a40',
  'thor-dark-world': 'https://www.disneyplus.com/browse/entity-7c4f4e28-4152-4f64-90ec-8b7f682c33d4',
  'winter-soldier': 'https://www.disneyplus.com/browse/entity-ef333a5c-b855-4d3e-a7d9-d9e142b6dc7d',
  guardians: 'https://www.disneyplus.com/browse/entity-c9ee959b-7249-4a4c-9708-9ffd1ddb00f1',
  'age-of-ultron': 'https://www.disneyplus.com/browse/entity-42329b99-0953-4f1a-9420-a0dbf7733e95',
  'ant-man': 'https://www.disneyplus.com/browse/entity-af42798c-b9db-457f-b748-5e1f029c1ece',
  'civil-war': 'https://www.disneyplus.com/browse/entity-2bd19267-1387-4b51-98e6-5189ff28e9c9',
  'doctor-strange': 'https://www.disneyplus.com/browse/entity-43a741e8-2369-4577-9bec-ef94f4aaae0b',
  'guardians-2': 'https://www.disneyplus.com/browse/entity-9fcd7087-c151-49dc-aeb9-b2f9943fd4e6',
  'spider-homecoming': 'https://www.disneyplus.com/browse/entity-d285316b-e1ea-4b50-933a-bb5fd13549c1',
  'thor-ragnarok': 'https://www.disneyplus.com/browse/entity-766280de-0c00-4781-a388-2c85c5b4e259',
  'black-panther': 'https://www.disneyplus.com/browse/entity-8904b1b5-da2c-4ff1-b389-dc81825559fd',
  'infinity-war': 'https://www.disneyplus.com/browse/entity-9a136e06-852a-41bf-b71d-fa061cb43225',
  'ant-man-wasp': 'https://www.disneyplus.com/browse/entity-3533ca7b-e187-4bf5-a65c-7c903cd2d4ad',
  'captain-marvel': 'https://www.disneyplus.com/browse/entity-1e383a14-1ea6-4345-9ab8-fd37618669af',
  endgame: 'https://www.disneyplus.com/browse/entity-b39aa962-be56-4b09-a536-98617031717f',
  'spider-far-from-home': 'https://www.disneyplus.com/browse/entity-6e497c43-d4da-4e12-b100-d4d38dc2a7ff',
  'black-widow': 'https://www.disneyplus.com/browse/entity-d9cd6bd1-bcf8-4a3b-8f92-0fdd4f79ac08',
  'shang-chi': 'https://www.disneyplus.com/browse/entity-92243dd0-bcfe-4365-ae76-1fa3cf1a2ab9',
  eternals: 'https://www.disneyplus.com/browse/entity-b042efa2-6650-48fd-bf35-ea285a5a5649',
  'no-way-home': 'https://www.disneyplus.com/browse/entity-295fb45a-c8bb-477e-816f-b0706b4d9984',
  'multiverse-madness': 'https://www.disneyplus.com/browse/entity-6fe6062c-2499-4f44-a48a-fc93f59cb504',
  'thor-love-thunder': 'https://www.disneyplus.com/browse/entity-0007d7a0-2515-411e-9294-2de6a7b8d00e',
  'wakanda-forever': 'https://www.disneyplus.com/browse/entity-86e14fdb-3841-4282-ad38-07c8c4aab4b6',
  quantumania: 'https://www.disneyplus.com/browse/entity-eb1453f3-48aa-4af0-85f5-8ca4916c7415',
  'guardians-3': 'https://www.disneyplus.com/browse/entity-820f0ded-3254-42c5-a7e4-7c044ff6dd65',
  marvels: 'https://www.disneyplus.com/browse/entity-75c90eca-8969-4edb-ac1a-7165cff2671c',
  'deadpool-wolverine': 'https://www.disneyplus.com/browse/entity-120ae1e6-2240-4924-a4ce-f8de6e28b0b1',
  'brave-new-world': 'https://www.disneyplus.com/browse/entity-3064ac7f-ef4d-4f89-b92f-b5524da92a72',
  thunderbolts: 'https://www.disneyplus.com/browse/entity-f51dce23-7d8f-490a-9f0c-be1b5432c2a9',
  'fantastic-four': 'https://www.disneyplus.com/browse/entity-2142a7a9-4c49-438d-a492-296c4e08b714',
  'eyes-of-wakanda': 'https://www.disneyplus.com/browse/entity-8d16eb3d-b7e5-4c43-abda-a281be4d284a',
  'punisher-one-last-kill': 'https://www.disneyplus.com/browse/entity-c5b69f75-f159-4749-873d-9a1d1a4eb878',
  'avengers-encore': 'https://www.disneyplus.com/browse/entity-28e07482-7213-4ce6-94ca-bd195963ca81',
  'x-men': 'https://www.disneyplus.com/browse/entity-e9f59c82-de76-4a18-a849-192532ff9b2d',
  x2: 'https://www.disneyplus.com/browse/entity-54748282-5bf7-496c-8db9-a9aa3b7f57ac',
  x3: 'https://www.disneyplus.com/browse/entity-e0f6bbed-cea5-41c1-b787-478f21255898',
  'x-origins-wolverine': 'https://www.disneyplus.com/browse/entity-82480f3f-6f11-4feb-8c4e-b32c0aca2c53',
  'first-class': 'https://www.disneyplus.com/browse/entity-9f9e9ae3-88d8-467b-8969-28d253cc4687',
  'wolverine-immortal': 'https://www.disneyplus.com/browse/entity-0f3b4bfe-aa16-43f2-8a11-d5586c6e6c8f',
  'days-future-past': 'https://www.disneyplus.com/browse/entity-5b3d1005-eb3b-41bb-8ac6-a025263d8106',
  deadpool: 'https://www.disneyplus.com/browse/entity-17854bdb-0121-4327-80a0-699fdecd1aaa',
  apocalypse: 'https://www.disneyplus.com/browse/entity-3ea207ed-b92e-4e71-9ce6-5c0d8afd4265',
  logan: 'https://www.disneyplus.com/browse/entity-7c1743ec-7cd6-4da4-9e8c-b713ad4e634a',
  'deadpool-2': 'https://www.disneyplus.com/browse/entity-27e84e56-31d3-4813-91ba-602cb52890f1',
  'dark-phoenix': 'https://www.disneyplus.com/browse/entity-180356b5-0596-4333-891f-e48c526a0803',
  'new-mutants': 'https://www.disneyplus.com/browse/entity-8799f3bc-ac02-40ec-b7a2-174d51450d31',
  'raimi-spider': 'https://www.disneyplus.com/browse/entity-f82b95f5-13da-4acd-b378-7d3f6864919f',
  'raimi-spider-2': 'https://www.disneyplus.com/browse/entity-939fab6f-224f-43cb-8c38-aa454aa89e2b',
  'raimi-spider-3': 'https://www.disneyplus.com/browse/entity-e64ed3c8-1874-43cd-8ea7-9cf55237aa4b',
  'amazing-spider': 'https://www.disneyplus.com/browse/entity-f43ffe63-2c96-4b6c-8fae-84d0d22d6466',
  'amazing-spider-2': 'https://www.disneyplus.com/browse/entity-c21c733a-18f4-4cdc-b1e8-1ff6b996c0a3',
  'fantastic-four-2005': 'https://www.disneyplus.com/browse/entity-d6592baa-0dc6-4549-a0cb-3b93a3b0e260',
  'fantastic-four-rise': 'https://www.disneyplus.com/browse/entity-06810fd3-a12e-4185-829b-36b3c814ce97',
  'fantastic-four-2015': 'https://www.disneyplus.com/browse/entity-f7f1d27d-6d5a-479d-8a06-fa53689bf61c',
  wandavision: 'https://www.disneyplus.com/browse/entity-90affd1f-0851-48bc-9cab-c142d5c9c20c',
  'falcon-winter': 'https://www.disneyplus.com/browse/entity-3c08a31a-2350-4aaf-90d0-88def4c551bf',
  'loki-1': 'https://www.disneyplus.com/browse/entity-8f8c5cbb-e5ba-4285-9e2c-86abcac9fd50',
  hawkeye: 'https://www.disneyplus.com/browse/entity-128482e8-a9bc-4289-9c0d-83a975d823f3',
  'moon-knight': 'https://www.disneyplus.com/browse/entity-330062c7-20c5-45e1-b6c5-e1e096055d75',
  'ms-marvel': 'https://www.disneyplus.com/browse/entity-7bf8d7e6-9739-4fee-86c0-f4afc48b152c',
  'loki-2': 'https://www.disneyplus.com/browse/entity-8f8c5cbb-e5ba-4285-9e2c-86abcac9fd50',
  'secret-invasion': 'https://www.disneyplus.com/browse/entity-4cfe6313-7f5e-4544-af84-d31bf718f65a',
  echo: 'https://www.disneyplus.com/browse/entity-3c9aa47d-88c2-455b-a63b-4be76b666a55',
  agatha: 'https://www.disneyplus.com/browse/entity-5e474669-a4a2-4b90-a928-5ae7f845090c',
  'daredevil-1': 'https://www.disneyplus.com/browse/entity-85e7a914-c8e6-41db-95df-c740dc2cf1b7',
  ironheart: 'https://www.disneyplus.com/browse/entity-b2b50b9a-a055-4b31-a609-8ec46f3add98',
  'what-if-1-3': 'https://www.disneyplus.com/browse/entity-fc588cfe-ff2b-4a44-abbd-d76359ce778f',
  'wonder-man': 'https://www.disneyplus.com/browse/entity-25ee768f-06e3-491c-ad8f-876b4c87ac42',
  'daredevil-2': 'https://www.disneyplus.com/browse/entity-85e7a914-c8e6-41db-95df-c740dc2cf1b7',
  visionquest: 'https://www.disneyplus.com/browse/entity-8744ec55-8d14-4631-99b4-c889a2d6013f',
};

export function getDisneyPlusLink(item: Pick<TrackItem, 'id'>): string | null {
  return Object.hasOwn(disneyPlusLinks, item.id) ? disneyPlusLinks[item.id] ?? null : null;
}

export const officialLinks: Record<string, string> = {
  doomsday: 'https://www.marvel.com/articles/movies/avengers-doomsday-teaser-trailer',
  'avengers-encore': 'https://www.marvel.com/articles/movies/avengers-doomsday-what-to-watch-guide-movies-shows-disney-plus',
  'wonder-man': 'https://www.marvel.com/tv-shows/wonder-man/1',
  'daredevil-2': 'https://www.marvel.com/tv-shows/daredevil-born-again/2',
  timeline: 'https://www.marvel.com/articles/movies/mcu-timeline-order-disney-plus'
};

export const officialChannel = 'https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA';

export const videoLinks: Record<string, VideoLink[]> = {
  doomsday: [
    {
      label: 'Trailer oficial de Avengers: Doomsday',
      url: 'https://www.youtube.com/watch?v=irVNGjRFZGk',
      why: 'Primeiro contato visual com o conflito e os personagens anunciados.'
    },
    {
      label: 'Special Look oficial',
      url: 'https://www.youtube.com/watch?v=X1aFkAkFASk',
      why: 'Complementa o trailer com novas imagens sem recorrer a canais não verificados.'
    }
  ]
};

