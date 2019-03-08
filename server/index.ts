import express from 'express';
import fs from 'fs';
import path from 'path';
import helmet from 'helmet';
import togeojson from '@mapbox/togeojson';
import xmldom from 'xmldom';

const DOMParser = xmldom.DOMParser;

const port = process.env.PORT || 8080;

const app = express();

app.use(helmet());

app.get('/api/geo-json', (_req, res) => {
  const kml = new DOMParser().parseFromString(
    fs.readFileSync(path.resolve(__dirname, 'free-tram-zone.kml'), 'utf8')
  );

  const geoJson = togeojson.kml(kml);

  res.send({ data: geoJson });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, (err: any) => {
  if (err) {
    throw err;
  }

  console.log(`> Ready on http://localhost:${port}`);
});
