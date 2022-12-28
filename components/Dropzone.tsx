import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function Dropzone(props) {
  const onImageDropped = props.onImageDropped;
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageDropped(acceptedFiles[0]);
    },
    [onImageDropped]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (props.predictions.length) return null;

  if (props.userUploadedImage) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 50,
        cursor: 'pointer',
      }}
      {...getRootProps()}
    >
      <Box
        sx={{
          margin: '0 auto',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the image here ...</p> : <p>Optional: Drag and drop a starting image here</p>}
      </Box>
    </Box>
  );
}
