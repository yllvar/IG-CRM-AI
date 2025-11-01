// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Button
} from '@mui/material';
import { 
  BarChart as BarChartIcon,
  Group as GroupIcon,
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import StatsCard from '../components/dashboard/StatsCard';
import ChartCard from '../components/dashboard/ChartCard';
import ContentIdeas from '../components/dashboard/ContentIdeas';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sample data for charts
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(131, 58, 180, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const audienceData = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [25, 40, 20, 10, 5],
        backgroundColor: [
          'rgba(131, 58, 180, 0.8)',
          'rgba(193, 53, 132, 0.8)',
          'rgba(225, 48, 108, 0.8)',
          'rgba(253, 29, 29, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  // Stats data
  const stats = [
    {
      title: 'Total Followers',
      value: '24.5K',
      change: 12.5,
      icon: <GroupIcon />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: 2.3,
      icon: <FavoriteIcon />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Impressions',
      value: '156.2K',
      change: -1.2,
      icon: <VisibilityIcon />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Content Ideas',
      value: '12',
      change: 5,
      icon: <BarChartIcon />,
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Welcome back! Here's what's happening with your Instagram account.
          </Typography>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              background: 'linear-gradient(45deg, #833AB4, #E1306C)',
              boxShadow: '0 4px 12px rgba(131, 58, 180, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(131, 58, 180, 0.4)',
              },
            }}
          >
            New Post
          </Button>
        </motion.div>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard
                icon={stat.icon}
                value={stat.value}
                label={stat.title}
                change={stat.change}
                color={stat.color}
                sx={{ height: '100%' }}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ChartCard
              title="Engagement Overview"
              subheader="Last 7 months"
              chart={() => (
                <Line 
                  data={engagementData} 
                  options={chartOptions} 
                />
              )}
              chartHeight={350}
              sx={{ height: '100%' }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ChartCard
              title="Audience Demographics"
              subheader="By age group"
              chart={() => (
                <Bar 
                  data={audienceData} 
                  options={barChartOptions} 
                />
              )}
              chartHeight={350}
              sx={{ height: '100%' }}
            />
          </motion.div>
        </Grid>
      </Grid>

      {/* Content Ideas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ContentIdeas
          onLike={(id) => console.log('Like idea:', id)}
          onComment={(id) => console.log('Comment on idea:', id)}
          onShare={(id) => console.log('Share idea:', id)}
          onSave={(id) => console.log('Save idea:', id)}
          onAnalyze={(id) => console.log('Analyze idea:', id)}
          sx={{ mb: 4 }}
        />
      </motion.div>
    </Box>
  );
};

export default Dashboard;