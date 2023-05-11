import React from 'react';
import { TeamProps } from './Team.types';
import { Stack, Typography } from '@mui/material';

export const Team: React.FC<TeamProps> = ({ name, score, color }) => {
  return (
    <Stack direction={'row'} sx={{ width: 190 }}>
      <Typography sx={{ color }}>
        {name}
      </Typography>
      {
        score !== undefined && (
          <Typography>
            : {score}
          </Typography>
        )
      }
    </Stack>
  );
};
