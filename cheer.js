const cheerio = require('cheerio');
const axios = require('axios');
const pangu = require('pangu');
const fs = require('fs');

const url = 'https://www.bilibili.com/blackboard/activity-BPU2018.html';

(async () => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const imgs = $('.act-button-a').parent().parent().parent().map((index, el) => {
    return 'https:' + $(el).attr('data-src');
  }).toArray()
  const spaces = $('.act-button-a').map(function() {
    const url = $(this).attr('href').split('?')[0]
    if (url.startsWith('https')) return url
    else return 'https:' + url
  }).toArray()
  const names = $('.act-rich-render-content').filter(index => {
    return index % 4 === 0 || index % 4 === 3;
  }).map(function () { return $(this).text().trim() }).toArray();
  const infos = $('.act-rich-render-content').filter(index => {
    return index % 4 !== 0 && index % 4 !== 3;
  }).map(function () { return pangu.spacing($(this).text().trim()) }).toArray();

  const ups = [];
  for (let i = 0; i< 100; ++i) {
    ups.push({
      name: names[i],
      space: spaces[i],
      info: infos[i],
      img: imgs[i]
    })
  }

  fs.writeFileSync('bilibili-top-100.json', JSON.stringify(ups), 'utf8');

})();
