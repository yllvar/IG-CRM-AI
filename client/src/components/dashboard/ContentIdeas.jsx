// client/src/components/dashboard/ContentIdeas.jsx
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BarChart as AnalyticsIcon
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: theme.palette.background.paper,
  borderRadius: '12px',
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

const IdeaItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
  },
  '& + &': {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const EngagementMetric = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
  '& > *:not(:last-child)': {
    marginRight: theme.spacing(2),
  },
}));

const ContentIdeas = ({ 
  ideas = [], 
  onLike, 
  onComment, 
  onShare, 
  onSave,
  onAnalyze,
  ...props 
}) => {
  // Sample data - in a real app, this would come from props
  const sampleIdeas = [
    {
      id: 1,
      title: 'Behind the Scenes: Office Life',
      description: 'Show your team at work with a fun, candid look at your company culture',
      engagement: { likes: 124, comments: 28 },
      tags: ['lifestyle', 'workplace'],
      posted: '2 hours ago'
    },
    {
      id: 2,
      title: 'Product Tutorial Series',
      description: 'Create a step-by-step guide showing different ways to use your product',
      engagement: { likes: 89, comments: 15 },
      tags: ['tutorial', 'education'],
      posted: '1 day ago'
    },
    {
      id: 3,
      title: 'Customer Success Story',
      description: 'Feature a testimonial from a happy customer with before/after results',
      engagement: { likes: 156, comments: 42 },
      tags: ['testimonial', 'results'],
      posted: '2 days ago'
    }
  ];

  const displayedIdeas = ideas.length > 0 ? ideas : sampleIdeas;

  return (
    <StyledCard {...props}>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Content Ideas
            <Typography 
              variant="caption" 
              color="textSecondary" 
              sx={{ ml: 1, fontWeight: 'normal' }}
            >
              {displayedIdeas.length} suggestions
            </Typography>
          </Typography>
        }
        action={
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ p: 0, flexGrow: 1 }}>
        <List disablePadding>
          <AnimatePresence>
            {displayedIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <IdeaItem>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography 
                          variant="subtitle1" 
                          component="div" 
                          sx={{ fontWeight: 500, mb: 0.5 }}
                        >
                          {idea.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="textSecondary" 
                          sx={{ mb: 1 }}
                        >
                          {idea.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {idea.tags?.map((tag) => (
                            <Chip 
                              key={tag} 
                              label={`#${tag}`} 
                              size="small" 
                              sx={{ 
                                height: 20,
                                '& .MuiChip-label': { px: 1 },
                                fontSize: '0.65rem',
                                bgcolor: 'action.selected',
                              }} 
                            />
                          ))}
                        </Box>
                        <EngagementMetric>
                          <span>{idea.engagement?.likes || 0} likes</span>
                          <span>{idea.engagement?.comments || 0} comments</span>
                          <span>{idea.posted}</span>
                        </EngagementMetric>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Tooltip title="Like" placement="left">
                        <IconButton 
                          size="small" 
                          onClick={() => onLike?.(idea.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <ThumbUpIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Comment" placement="left">
                        <IconButton 
                          size="small" 
                          onClick={() => onComment?.(idea.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <CommentIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share" placement="left">
                        <IconButton 
                          size="small" 
                          onClick={() => onShare?.(idea.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <ShareIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Save" placement="left">
                        <IconButton 
                          size="small" 
                          onClick={() => onSave?.(idea.id)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <BookmarkIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Analyze" placement="left">
                        <IconButton 
                          size="small" 
                          onClick={() => onAnalyze?.(idea.id)}
                          sx={{ 
                            color: 'primary.main',
                            bgcolor: 'primary.light',
                            '&:hover': {
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                            }
                          }}
                        >
                          <AnalyticsIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </ListItemSecondaryAction>
                </IdeaItem>
                {index < displayedIdeas.length - 1 && <Divider component="li" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </List>
      </CardContent>
    </StyledCard>
  );
};

export default ContentIdeas;