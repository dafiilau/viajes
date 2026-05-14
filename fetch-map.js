const https = require('https');
const fs = require('fs');

https.get('https://raw.githubusercontent.com/Highcharts/map-collection/master/custom/world.svg', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('map.svg', data);
    console.log('done map.svg');
  });
});
