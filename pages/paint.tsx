import { useState } from 'react';
import { Box, Button, Divider, Grid, Stack } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { Canvas } from '../components/canvas';
import PromptForm from '../components/prompt-form';
import Dropzone from '../components/dropzone';
import Download from '../components/download';
import { XCircle as StartOverIcon } from 'lucide-react';
// import { Code as CodeIcon } from 'lucide-react';
// import { Rocket as RocketIcon } from 'lucide-react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [userUploadedImage, setUserUploadedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prevPrediction = predictions[predictions.length - 1];
    const prevPredictionOutput = prevPrediction?.output
      ? prevPrediction.output[prevPrediction.output.length - 1]
      : null;

    const body = {
      prompt: e.target.prompt.value,
      init_image: userUploadedImage
        ? await readAsDataURL(userUploadedImage)
        : // only use previous prediction as init image if there's a mask
        maskImage
        ? prevPredictionOutput
        : null,
      mask: maskImage,
    };

    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    // TODO: clean up
    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPredictions(predictions.concat([prediction]));

    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await sleep(1000);
      const response = await fetch('/api/predictions/' + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      setPredictions(predictions.concat([prediction]));

      if (prediction.status === 'succeeded') {
        setUserUploadedImage(null);
      }
    }
  };

  const startOver = async (e) => {
    e.preventDefault();
    setPredictions([]);
    setError(null);
    setMaskImage(null);
    setUserUploadedImage(null);
  };

  return (
    <Box sx={{ width: '1200px' }}>
      <Head>
        <title>Inpainting with Stable Diffusion &amp; Replicate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <main className="container mx-auto p-5"> */}
      <Grid container spacing={2}>
        {error && <div>{error}</div>}
        <Grid item xs={24}>
          <Box
            sx={{
              // display: 'flex',
              // alignItems: 'stretch', // https://tailwindcss.com/docs/align-items
              position: 'relative',
              maxWidth: '512px',
              width: '100%',
              margin: '0 auto',
              backgroundColor: 'silver',
            }}
          >
            <Dropzone
              onImageDropped={setUserUploadedImage}
              predictions={predictions}
              userUploadedImage={userUploadedImage}
            />
            {/* TODO: fix layout and convert divs to Box's */}
            {/* <div
              className="bg-gray-50 relative max-h-[512px] w-full flex items-stretch"
              // style={{ height: 0, paddingBottom: "100%" }}
            > */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'stretch', // https://tailwindcss.com/docs/align-items
                position: 'relative',
                maxHeight: '512px',
                width: '100%',
                margin: '0 auto',
              }}
            >
              <Canvas predictions={predictions} userUploadedImage={userUploadedImage} onDraw={setMaskImage} />
            </Box>
          </Box>
          <PromptForm onSubmit={handleSubmit} />
        </Grid>
        <Grid
          item
          xs={24}
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              minWidth: '512px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            {((predictions.length > 0 && predictions[predictions.length - 1].output) ||
              maskImage ||
              userUploadedImage) && (
              <Button onClick={startOver}>
                <StartOverIcon className="icon" />
                Start over
              </Button>
            )}
            <Stack direction="row" spacing={1}>
              {predictions.length > 0 && (
                <Button variant="outlined">
                  <Download predictions={predictions} />
                </Button>
              )}
              <Divider />
              <Button variant="outlined">
                <Link href="https://replicate.com/stability-ai/stable-diffusion">Run with an API</Link>
              </Button>
              <Divider />
              <Button variant="outlined">
                <Link href="https://github.com/zeke/inpainter">View on GitHub</Link>
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = reject;
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsDataURL(file);
  });
}
