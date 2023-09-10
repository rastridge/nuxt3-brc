# Nuxt 3 + PrimeVue Starter

- https://github.com/sfxcode/nuxt3-primevue-starter

## Before using this app with original buffalorugby database some modifications to the DB are needed

# All Game Dates Times must be changed

# Using

UPDATE `inbrc_stats_games` SET `date` = DATE_SUB(date, INTERVAL 4 HOUR) WHERE 1;

# Some fields must be added but I dont remember which ones

# get latest iamges / docs

~/buffalorugby.org/public > cp -r \_all_imgs /home/rastridge/media.buffalorugby.org/public
~/buffalorugby.org/public > cp -r \_img /home/rastridge/media.buffalorugby.org/public
~/buffalorugby.org/public > cp -r imgs /home/rastridge/media.buffalorugby.org/public
~/buffalorugby.org/public > cp -r xoda /home/rastridge/media.buffalorugby.org/public

# query database to change img url references from https://buffalorugby.org to https://media.buffalorugby.org

// NEEDS RLACEMENT
https://media.my-test-site.net/upload
http://buffalorugby.org/_img
https://buffalorugby.org/_img
https://buffalorugby.org/_img/_mugs
http://buffalorugby.org/_img/_mugs
http://buffalorugby.org/imgs
https://buffalorugby.org/imgs
http://buffalorugby.org/xoda
https://buffalorugby.org/xoda
https://buffalorugby.org/imgs
//imgs
//\_img
//xoda

// USING
UPDATE inbrc_news SET news_article
UPDATE inbrc_newsletters SET newsletter_body_html
UPDATE inbrc_content SET content_body
UPDATE inbrc_sponsors SET ad_image_path =
UPDATE inbrc_clubhouse SET clubhouse_filepath =
UPDATE inbrc_ads SET ad_path =
UPDATE inbrc_archive SET archive_filepath =
UPDATE inbrc_accounts SET member_pic_path =

// NEWSLETTERS

// remaining
SELECT
`newsletter_id`,
`created_dt`,
SUBSTR(
`newsletter_body_html`,
INSTR(`newsletter_body_html`, 'src='),
100
) AS src
FROM
`inbrc_newsletters`
WHERE
INSTR(`newsletter_body_html`, 'src=') AND `newsletter_body_html`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_newsletters
SET
newsletter_body_html =
REPLACE
(
newsletter_body_html,
'http://buffalorugby.org/_img',
'https://media.buffalorugby.org/_img'
)
WHERE
`newsletter_body_html` LIKE '%http://buffalorugby.org/_img%'

// NEWS

// remaining
SELECT
`news_id`,
`news_event_dt`,
SUBSTR(
`news_article`,
INSTR(`news_article`, 'src='),
100
) AS src
FROM
`inbrc_news`
WHERE
INSTR(`news_article`, 'src=') AND `news_article`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_news
SET
`news_article` =
REPLACE
(
`news_article`,
'http://buffalorugby.org/_all_imgs',
'https://media.buffalorugby.org/_img/'
)
WHERE
`news_article` LIKE '%http://buffalorugby.org/_all_imgs%'

// CLUBHOUSE

// remaining
SELECT
clubhouse_id,
SUBSTR(
`clubhouse_filepath`,
INSTR(`clubhouse_filepath`, '/\_all_imgs'),
100
) AS src
FROM
`inbrc_clubhouse`
WHERE
INSTR(`clubhouse_filepath`, '/\_all_imgs') AND `clubhouse_filepath`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_clubhouse
SET
`clubhouse_filepath` =
REPLACE
(
`clubhouse_filepath`,
'/\_all_imgs',
'https://media.buffalorugby.org/_all_imgs'
)
WHERE
`clubhouse_filepath` LIKE '/\_all_imgs%'

//////////////// ADS
// remaining
SELECT
ad_id,
SUBSTR(
`ad_path`,
INSTR(`ad_path`, '/\_img'),
100
) AS src
FROM
`inbrc_ads`
WHERE
INSTR(`ad_path`, '/\_img') AND `ad_path`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_ads
SET
`ad_path` =
REPLACE
(
`ad_path`,
'/\_img',
'https://media.buffalorugby.org/_img'
)
WHERE
`ad_path` LIKE '/\_img%'

//////////////// ARCHIVE
// remaining
SELECT
archive_id,
SUBSTR(
`archive_filepath`,
INSTR(`archive_filepath`, '/xoda/files'),
100
) AS src
FROM
`inbrc_archive`
WHERE
INSTR(`archive_filepath`, '/xoda/files') AND `archive_filepath`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_archive
SET
`archive_filepath` =
REPLACE
(
`archive_filepath`,
'/xoda/files',
'https://media.buffalorugby.org/xoda/files'
)
WHERE
`archive_filepath` LIKE '/xoda/files%'

//////////////// ACCOUNTS (WOF)
// remaining
SELECT
account_id,
SUBSTR(
`member_pic_path`,
INSTR(`member_pic_path`, '/\_img/\_mugs'),
100
) AS src
FROM
`inbrc_accounts`
WHERE
INSTR(`member_pic_path`, '/\_img/\_mugs') AND `member_pic_path` NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY
src;

// fix \_img
UPDATE
inbrc\*accounts
SET
`member_pic_path` =
REPLACE
(
`member_pic_path`,
'/\_img/\_mugs',
'https://media.buffalorugby.org/_img/_mugs'
)
WHERE
`member_pic_path` LIKE '/\_img/\_mugs%'

//////////////// CONTENT
// remaining
SELECT
content_id,
SUBSTR(
`content_body`,
INSTR(`content_body`, 'src='),
100
) AS src
FROM
`inbrc_content`
WHERE
INSTR(`content_body`, 'src=') AND `content_body`
NOT LIKE '%https://media.buffalorugby.org%'
ORDER BY src;

// fix \_img
UPDATE
inbrc_content
SET
`content_body` =
REPLACE
(
`content_body`,
'api.buffalorugby.org',
'media.buffalorugby.org'
)
WHERE
`content_body` LIKE '%api.buffalorugby.org%'

## Project setup and usage

Install node:

**Latest node LTS version required (19)**
Use node manager like **nvm** to install.
nvm use stable

Install dependencies:

```
yarn install
```

Run development server:

```
yarn dev
```

Build:

```
yarn build
```

Use VSCode github commit to send to Netlify for build

```

```

# menus-3.7
