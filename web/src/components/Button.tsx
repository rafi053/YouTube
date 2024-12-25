import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function IconLabelButtons() {
  return (
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
  );
}
