// // // const addBackgroundToPNG = require("lib/add-background-to-png");
// // import addBackgroundToPNG from "lib/add-background-to-png";
// const PNG = require("pngjs").PNG;
// // const dataUriToBuffer = require("lib/data-uri-to-buffer");
// import { dataUriToBuffer } from "lib/add-background-to-png";
// import bufferToDataUrl from "buffer-to-data-url";

const PNG = require('pngjs').PNG;

const API_HOST = process.env.REPLICATE_API_HOST || 'https://api.replicate.com';

function addBackgroundToPNG(dataUrl) {
  const options = {
    colorType: 2,
    bgColor: {
      red: 255,
      green: 255,
      blue: 255,
    },
  };

  const png = PNG.sync.read(dataUriToBuffer(dataUrl));
  const buffer = PNG.sync.write(png, options);

  // save to a file on disk for testing
  // const fs = require("fs");
  // const path = require("path");
  // const filename = dataUrl.substring(dataUrl.length - 10) + ".png";
  // fs.writeFileSync(path.join(__dirname, filename), buffer);
  // console.log(path.join(__dirname, filename));

  return bufferToDataUrl('image/png', buffer);
}

function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }

  // strip newlines
  uri = uri.replace(/\r?\n/g, '');

  // split the URI up into the "metadata" and the "data" portions
  const firstComma = uri.indexOf(',');
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError('malformed data: URI');
  }

  // remove the "data:" scheme and parse the metadata
  const meta = uri.substring(5, firstComma).split(';');

  let charset = '';
  let base64 = false;
  const type = meta[0] || 'text/plain';
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === 'base64') {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf('charset=') === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  // defaults to US-ASCII only if type is not provided
  if (!meta[0] && !charset.length) {
    typeFull += ';charset=US-ASCII';
    charset = 'US-ASCII';
  }

  // get the encoded data portion and decode URI-encoded chars
  const encoding = base64 ? 'base64' : 'ascii';
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);

  // set `.type` and `.typeFull` properties to MIME type
  buffer.type = type;
  buffer.typeFull = typeFull;

  // set the `.charset` property
  buffer.charset = charset;

  return buffer;
}

export default async function handler(req, res) {
  // remnove null and undefined values
  req.body = Object.entries(req.body).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

  if (req.body.mask) {
    req.body.mask = addBackgroundToPNG(req.body.mask);
  }

  const body = JSON.stringify({
    // Pinned to a specific version of Stable Diffusion, fetched from:
    // https://replicate.com/stability-ai/stable-diffusion
    version: 'be04660a5b93ef2aff61e3668dedb4cbeb14941e62a3fd5998364a32d613e35e',
    input: req.body,
  });

  const response = await fetch(`${API_HOST}/v1/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
