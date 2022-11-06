create table if not exists `guilds` (
  `id` text,
  `disabled_modules` json DEFAULT '[]',
  `premium` tinyint(1)
);

create table if not exists `economy-sys` (
  `id` text,
  `wallet` int,
  `card` int,
  `work` text,
  `daily` text,
  `rob` text,
  `crime` text,
  `coins` int
);