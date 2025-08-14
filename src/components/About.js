import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          About TheTop36
        </Typography>

        <Typography variant="body1" paragraph>
          TheTop36 is a digital product vault combined with a branded raffle
          engine. Users pay $7 for high-value public domain knowledge bundles
          and receive a chance to win premium lifestyle prizes in a 1-in-100
          micro-lottery.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Key Features:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Prize Management"
                secondary="Upload and manage premium lifestyle prizes with detailed tracking"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Raffle Engine"
                secondary="Automated winner selection with eligibility tracking"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Partner Platform Integration"
                secondary="Seamless enrollment in partner platforms with 45-day eligibility period"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Opt-out Management"
                secondary="Easy opt-out process while maintaining raffle eligibility"
              />
            </ListItem>
          </List>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            How It Works:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="1. Purchase Knowledge Bundle"
                secondary="Get access to high-value public domain content for $7"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="2. Partner Platform Enrollment"
                secondary="Automatic enrollment in partner platforms"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="3. 45-Day Eligibility Period"
                secondary="Become eligible for raffles after 45 days of enrollment"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="4. Win Premium Prizes"
                secondary="Participate in raffles for luxury lifestyle prizes"
              />
            </ListItem>
          </List>
        </Box>
      </StyledPaper>
    </Container>
  );
}

export default About;
