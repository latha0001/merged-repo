import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const CountdownBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.black,
  borderRadius: 8,
  marginTop: theme.spacing(2),
}));

const CountdownGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: "100%",
}));

const CountdownItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: theme.spacing(2),
  borderRadius: 8,
}));

const OptOutDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 8,
    padding: theme.spacing(2),
  },
}));

function EnrollmentConfirmation() {
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [openOptOut, setOpenOptOut] = useState(false);
  const [email, setEmail] = useState("");
  const [optOutError, setOptOutError] = useState("");

  useEffect(() => {
    // Simulate fetching enrollment data
    const fetchEnrollment = async () => {
      try {
        const response = await fetch("https://thetop-36-backend.onrender.com/api/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "user@example.com", // This would come from the actual user data
          }),
        });
        const data = await response.json();
        setEnrollment(data.enrollment);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch enrollment data");
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, []);

  useEffect(() => {
    if (enrollment) {
      const calculateTimeLeft = () => {
        const enrollmentDate = new Date(enrollment.enrolledOn);
        const targetDate = new Date(
          enrollmentDate.getTime() + 45 * 24 * 60 * 60 * 1000
        );
        const difference = targetDate - new Date();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setCountdown({ days, hours, minutes, seconds });
        } else {
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }
  }, [enrollment]);

  const handleOptOutClick = () => {
    setOpenOptOut(true);
  };

  const handleOptOutClose = () => {
    setOpenOptOut(false);
    setEmail("");
    setOptOutError("");
  };

  const handleOptOut = async () => {
    if (!email) {
      setOptOutError("Please enter your email address");
      return;
    }

    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/opt-out/${Buffer.from(email).toString(
          "base64"
        )}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      setEnrollment({
        ...enrollment,
        platforms: [],
        eligibleForRaffle: data.eligibleForRaffle,
      });
      handleOptOutClose();
    } catch (error) {
      setOptOutError("Failed to opt out. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <StyledPaper>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to TheTop36!
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            You've been successfully enrolled in our partner platforms:
          </Typography>
          <List>
            {enrollment?.platforms.map((platform) => (
              <ListItem key={platform}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary={platform} />
              </ListItem>
            ))}
          </List>
        </Box>

        <CountdownBox>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Raffle Eligibility Countdown</Typography>
          </Box>
          <CountdownGrid>
            <CountdownItem>
              <Typography variant="h4" component="div">
                {countdown.days}
              </Typography>
              <Typography variant="body2">Days</Typography>
            </CountdownItem>
            <CountdownItem>
              <Typography variant="h4" component="div">
                {countdown.hours}
              </Typography>
              <Typography variant="body2">Hours</Typography>
            </CountdownItem>
            <CountdownItem>
              <Typography variant="h4" component="div">
                {countdown.minutes}
              </Typography>
              <Typography variant="body2">Minutes</Typography>
            </CountdownItem>
            <CountdownItem>
              <Typography variant="h4" component="div">
                {countdown.seconds}
              </Typography>
              <Typography variant="body2">Seconds</Typography>
            </CountdownItem>
          </CountdownGrid>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            {countdown.days === 0 &&
            countdown.hours === 0 &&
            countdown.minutes === 0 &&
            countdown.seconds === 0
              ? "You are now eligible for raffles!"
              : "Time remaining until raffle eligibility"}
          </Typography>
        </CountdownBox>

        <Box sx={{ mt: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            You may opt out of our partner platforms at any time, but raffle
            eligibility begins only after 45 days of continuous enrollment.
          </Alert>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleOptOutClick}
            fullWidth
            disabled={!enrollment?.platforms.length}
          >
            Opt Out of Partner Platforms
          </Button>
        </Box>
      </StyledPaper>

      <OptOutDialog open={openOptOut} onClose={handleOptOutClose}>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Opt Out Confirmation</Typography>
            <IconButton onClick={handleOptOutClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Please enter your email address to confirm opt-out:
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(optOutError)}
            helperText={optOutError}
          />
          <Alert severity="warning" sx={{ mt: 2 }}>
            Note: Opting out will remove you from partner platforms but maintain
            your raffle eligibility if you've been enrolled for 45+ days.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOptOutClose}>Cancel</Button>
          <Button onClick={handleOptOut} color="secondary">
            Confirm Opt Out
          </Button>
        </DialogActions>
      </OptOutDialog>
    </Container>
  );
}

export default EnrollmentConfirmation;
