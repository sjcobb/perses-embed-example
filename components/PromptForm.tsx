import { useState } from 'react';
import { Box, Button } from '@mui/material';

const samplePrompts = [
  'a gentleman otter in a 19th century portrait',
  'bowl of ramen in the style of a comic book',
  'flower field drawn by Jean-Jacques Sempé',
  'illustration of a taxi cab in the style of r crumb',
  // 'multicolor hyperspace',
  'painting of fruit on a table in the style of Raimonds Staprans',
  'pencil sketch of robots playing poker',
  'photo of an astronaut riding a horse',
];
import sample from 'lodash/sample';

export default function PromptForm(props) {
  const [prompt] = useState(sample(samplePrompts));
  const [image, setImage] = useState(null);

  return (
    <form onSubmit={props.onSubmit} className="py-5 animate-in fade-in duration-700">
      <Box
        sx={{
          display: 'flex',
          maxWidth: '512px',
          margin: '0 auto',
        }}
      >
        <input
          type="text"
          defaultValue={prompt}
          name="prompt"
          placeholder="Enter a prompt..."
          className="block w-full flex-grow rounded-l-md"
        />
        <Button type="submit" variant="outlined">
          Generate
        </Button>
      </Box>
    </form>
  );
}
