import React, { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Divider, Stack, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { Random } from '../../utils/random';
import { v4 as uuidv4 } from 'uuid';
import { Team } from '../Team';
import { colors, STAGE_NAME, teams } from '../../utils/consts';

const firstStage = Object.keys(teams);

export const App: React.FC = () => {
  const [stages, setStages] = useState<string[][]>([firstStage]);
  const [scores, setScores] = useState<number[][]>([]);

  const reset = () => {
    setStages([firstStage]);
    setScores([]);
  };

  useEffect(() => {

    let interval: number;
    const play = () => {
      const prevStage = stages.length - 1;
      const prevStageLength = stages[prevStage].length;

      if (prevStage >= 4) {
        return clearInterval(interval);
      }

      const nextStage: string[] = [];
      const nextScores: number[] = [];

      for (let i = 0; i < prevStageLength; i += 2) {
        let firstTeamGoals, secondTeamGoals;

        const firstTeam = stages[prevStage][i];
        const secondTeam = stages[prevStage][i + 1];

        do {
          firstTeamGoals = Random.poissonDistribution(teams[firstTeam]);
          secondTeamGoals = Random.poissonDistribution(teams[secondTeam]);
        } while (firstTeamGoals === secondTeamGoals);

        nextStage.push(firstTeamGoals > secondTeamGoals ? firstTeam : secondTeam);
        nextScores.push(firstTeamGoals, secondTeamGoals);
      }

      setStages(prevState => [...prevState, nextStage]);
      setScores(prevState => [...prevState, nextScores]);
    };

    interval = setInterval(play, 1000);

    return () => clearInterval(interval);
  }, [stages, scores]);

  return (
    <Container maxWidth={'xl'}>
      <CssBaseline />
      <Box
        sx={{
          width: 1250,
          margin: '0 auto',
          px: 10,
          minHeight: '100vh',
          background: lightBlue[50],
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            pt: 4,
            justifyContent: 'flex-start',
          }}
          divider={<Divider orientation='vertical' flexItem />}
          spacing={1}
        >
          {stages.map((teams, stageIndex) => (
            <Box>
              <Typography
                gutterBottom
                sx={{ mb: 'auto' }}
                color={'primary'}
              >
                {STAGE_NAME[stageIndex]}
              </Typography>
              <Stack
                key={uuidv4()}
                sx={{
                  height: 420,
                  justifyContent: 'center',
                }}
              >
                {teams.map((team, teamIndex) => (
                  <Team
                    key={uuidv4()}
                    name={team}
                    score={stageIndex === stages.length - 1 ? undefined : scores[stageIndex][teamIndex]}
                    color={colors[teamIndex]}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
        <Button
          onClick={reset}
          variant={'contained'}
          sx={{ width: '100%', mt: 4 }}
        >
          Reset
        </Button>
      </Box>
    </Container>
  );
};
