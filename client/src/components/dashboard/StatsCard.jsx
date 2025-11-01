// client/src/components/dashboard/StatsCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const StatIcon = styled(Box)(({ theme, color }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: color || theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 700,
  background: 'linear-gradient(45deg, #833AB4, #E1306C)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
}));

const StatChange = styled(Box)(({ theme, positive }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: '12px',
  backgroundColor: positive 
    ? 'rgba(76, 175, 80, 0.1)' 
    : 'rgba(244, 67, 54, 0.1)',
  color: positive 
    ? theme.palette.success.main 
    : theme.palette.error.main,
  fontSize: '0.75rem',
  fontWeight: 600,
  marginTop: theme.spacing(1),
}));

const StatsCard = ({ 
  icon, 
  value, 
  label, 
  change, 
  color,
  ...props 
}) => {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <StyledCard {...props}>
        <CardContent sx={{ flexGrow: 1 }}>
          {icon && <StatIcon color={color}>{icon}</StatIcon>}
          
          <StatValue variant="h3">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </StatValue>
          
          <StatLabel variant="body2" color="textSecondary">
            {label}
          </StatLabel>
          
          {change !== undefined && (
            <StatChange positive={isPositive}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}% 
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 0.5,
                  color: 'inherit',
                  fontWeight: 600,
                }}
              >
                vs last period
              </Typography>
            </StatChange>
          )}
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default StatsCard;