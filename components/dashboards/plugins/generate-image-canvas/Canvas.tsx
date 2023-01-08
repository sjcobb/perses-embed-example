import React, { useRef } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';
import { Spinner } from './Spinner';

interface CanvasProps {
  predictions: any;
  userUploadedImage: any;
  onDraw: any;
}

export function Canvas(props: CanvasProps) {
  const canvasRef = useRef<ReactSketchCanvasRef>();

  const onChange = async () => {
    if (canvasRef.current === undefined) {
      return;
    }

    const paths = await canvasRef.current.exportPaths();

    // only respond if there are paths to draw (don't want to send a blank canvas)
    if (paths.length) {
      const data = await canvasRef.current.exportImage('png');
      props.onDraw(data);
    }
  };

  const predictions = props.predictions.map((prediction) => {
    prediction.lastImage = prediction.output ? prediction.output[prediction.output.length - 1] : null;
    return prediction;
  });

  const predicting = predictions.some((prediction) => !prediction.output);
  const lastPrediction = predictions[predictions.length - 1];

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        maxHeight: '512px',
        margin: '0 auto',
        aspectRatio: '1 / 1',
      }}
    >
      {/* PREDICTION IMAGES */}
      {!props.userUploadedImage &&
        predictions
          .filter((prediction) => prediction.output)
          .map((prediction, index) => (
            <Image
              alt={'prediction' + index}
              key={'prediction' + index}
              layout="fill"
              style={{
                position: 'absolute',
                margin: '0 auto',
                zIndex: index,
              }}
              src={prediction.lastImage}
            />
          ))}

      {/* USER UPLOADED IMAGE */}
      {props.userUploadedImage && (
        <Image src={URL.createObjectURL(props.userUploadedImage)} alt="preview image" layout="fill" />
      )}

      {/* SPINNER */}
      {predicting && (
        <Box
          style={{ zIndex: predictions.length + 100 }}
          sx={{
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%',
              margin: '10px auto 0 auto',
              textAlign: 'center',
            }}
          >
            <Spinner />
            <p>{lastPrediction.status}</p>
          </Box>
        </Box>
      )}

      {(predictions.length > 0 || props.userUploadedImage) && !predicting && (
        <Box
          style={{ zIndex: predictions.length + 100 }}
          sx={{
            margin: '0 auto',
            width: '100%',
          }}
        >
          <ReactSketchCanvas
            ref={canvasRef}
            strokeWidth={80}
            strokeColor="black"
            canvasColor="transparent"
            onChange={onChange}
          />
        </Box>
      )}
    </Box>
  );
}
