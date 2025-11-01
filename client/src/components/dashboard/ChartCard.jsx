// client/src/components/dashboard/ChartCard.jsx
import React from 'react';
import { Card, CardHeader, CardContent, Typography, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  border: '1px solid',
  borderColor: theme.palette.divider,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const CardSubheader = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const ChartContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '300px', // Default height, can be overridden via props
  marginTop: '16px',
});

const ChartCard = ({
  title,
  subheader,
  children,
  chart: ChartComponent,
  chartHeight = 300,
  action,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <StyledCard {...props}>
        <CardHeader
          title={<CardTitle variant="h6">{title}</CardTitle>}
          subheader={subheader && <CardSubheader>{subheader}</CardSubheader>}
          action={
            action || (
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
            )
          }
          sx={{
            '& .MuiCardHeader-action': {
              alignSelf: 'center',
              margin: 0,
            },
            pb: 1,
          }}
        />
        <CardContent sx={{ pt: 0, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <ChartContainer sx={{ height: chartHeight }}>
            {ChartComponent ? <ChartComponent /> : children}
          </ChartContainer>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default ChartCard;