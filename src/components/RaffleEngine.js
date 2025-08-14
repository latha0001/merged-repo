import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tooltip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Confetti from "react-confetti";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: 8,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const WinnerDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 8,
    padding: theme.spacing(2),
    maxWidth: 600,
  },
}));

const EligibilityChip = styled(Chip)(({ theme, eligible }) => ({
  backgroundColor: eligible
    ? theme.palette.success.main
    : theme.palette.error.main,
  color: "white",
}));

const steps = [
  {
    label: "Check Eligibility",
    description: "Verifying user eligibility and prize status",
  },
  {
    label: "Select Winner",
    description: "Randomly selecting a winner from eligible users",
  },
  {
    label: "Update Prize Status",
    description: "Updating prize status and winner information",
  },
];

const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: "120px",
}));

const PrizeImage = styled("img")({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
  marginRight: 16,
});

const PrizeCell = styled(TableCell)({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
});

function RaffleEngine() {
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [winner, setWinner] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showEligibilityInfo, setShowEligibilityInfo] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [drawingWinner, setDrawingWinner] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPrizeForMenu, setSelectedPrizeForMenu] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const response = await fetch("https://thetop-36-backend.onrender.com/api/prizes");
      const data = await response.json();
      setPrizes(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch prizes");
      setLoading(false);
    }
  };

  const handleDrawWinner = async (prize) => {
    setSelectedPrize(prize);
    setDrawingWinner(true);
    setActiveStep(0);
    setError(null);

    try {
      // Step 1: Check Eligibility
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActiveStep(1);

      // Step 2: Select Winner
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/raffle/draw/${prize.id}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();

      if (data.message === "No eligible users for raffle") {
        setError("No eligible users found for this raffle");
        setDrawingWinner(false);
        setActiveStep(-1);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setActiveStep(2);

      // Step 3: Update Status
      setWinner(data.winner);
      setShowConfetti(true);
      setOpenDialog(true);
      setTimeout(() => setShowConfetti(false), 5000);
      fetchPrizes(); // Refresh prize list
    } catch (error) {
      setError("Failed to draw winner");
    }

    setDrawingWinner(false);
    setActiveStep(-1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setWinner(null);
  };

  const getEligibilityStatus = (prize) => {
    if (prize.winner)
      return { eligible: false, reason: "Winner already drawn" };
    if (prize.status !== "active")
      return { eligible: false, reason: "Prize not active" };
    return { eligible: true, reason: "Eligible for raffle" };
  };

  const handleMenuClick = (event, prize) => {
    setAnchorEl(event.currentTarget);
    setSelectedPrizeForMenu(prize);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPrizeForMenu(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/prizes/${selectedPrizeForMenu.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...selectedPrizeForMenu, status: newStatus }),
        }
      );
      const data = await response.json();
      setPrizes(prizes.map((p) => (p.id === data.id ? data : p)));
      handleMenuClose();
    } catch (error) {
      setError("Failed to update prize status");
    }
  };

  const handleShippingUpdate = async () => {
    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/prizes/${selectedPrizeForMenu.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...selectedPrizeForMenu,
            shipped: !selectedPrizeForMenu.shipped,
          }),
        }
      );
      const data = await response.json();
      setPrizes(prizes.map((p) => (p.id === data.id ? data : p)));
      handleMenuClose();
    } catch (error) {
      setError("Failed to update shipping status");
    }
  };

  const handleEditClick = (prize) => {
    setEditingPrize(prize);
    setEditMode(true);
    handleMenuClose();
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/prizes/${editingPrize.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPrize),
        }
      );
      const data = await response.json();
      setPrizes(prizes.map((p) => (p.id === data.id ? data : p)));
      setEditMode(false);
      setEditingPrize(null);
    } catch (error) {
      setError("Failed to update prize");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showConfetti && <Confetti />}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Raffle Engine
        </Typography>
        <Tooltip title="Eligibility Requirements">
          <IconButton onClick={() => setShowEligibilityInfo(true)}>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Alert severity="info" sx={{ mb: 4 }}>
        To be eligible for raffles, users must:
        <ul>
          <li>Be enrolled in partner platforms for at least 45 days</li>
          <li>Not have opted out of partner platforms</li>
          <li>Have an active enrollment status</li>
        </ul>
      </Alert>

      <StyledPaper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Prize</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Winner</TableCell>
                <TableCell>Fulfillment</TableCell>
                <TableCell>Eligibility</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prizes.map((prize) => {
                const eligibility = getEligibilityStatus(prize);
                return (
                  <TableRow key={prize.id}>
                    <PrizeCell>
                      <PrizeImage src={prize.image} alt={prize.title} />
                      <Box>
                        <Typography variant="subtitle2">
                          {prize.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${prize.retailPrice} Retail
                        </Typography>
                      </Box>
                    </PrizeCell>
                    <TableCell>
                      <Chip
                        label={prize.status}
                        color={
                          prize.status === "active"
                            ? "success"
                            : prize.status === "upcoming"
                            ? "warning"
                            : "default"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {prize.winner ? (
                        <Chip
                          icon={<EmojiEventsIcon />}
                          label={prize.winner}
                          color="secondary"
                          size="small"
                        />
                      ) : (
                        "Pending"
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={
                          prize.shipped ? <CheckCircleIcon /> : <CancelIcon />
                        }
                        label={prize.shipped ? "Shipped" : "Pending"}
                        color={prize.shipped ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <EligibilityChip
                        label={eligibility.reason}
                        eligible={eligibility.eligible}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <ActionButton
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDrawWinner(prize)}
                          disabled={!eligibility.eligible || drawingWinner}
                          startIcon={
                            drawingWinner && selectedPrize?.id === prize.id ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : null
                          }
                        >
                          {drawingWinner && selectedPrize?.id === prize.id
                            ? "Drawing..."
                            : "Draw Winner"}
                        </ActionButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, prize)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      {/* Prize Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEditClick(selectedPrizeForMenu)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Prize</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("active")}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set Active</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("upcoming")}>
          <ListItemIcon>
            <AccessTimeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set Upcoming</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("completed")}>
          <ListItemIcon>
            <EmojiEventsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set Completed</ListItemText>
        </MenuItem>
        {selectedPrizeForMenu?.winner && (
          <MenuItem onClick={handleShippingUpdate}>
            <ListItemIcon>
              <LocalShippingIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {selectedPrizeForMenu.shipped
                ? "Mark as Pending"
                : "Mark as Shipped"}
            </ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Edit Prize Dialog */}
      <Dialog open={editMode} onClose={() => setEditMode(false)}>
        <DialogTitle>Edit Prize</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Prize Title"
            type="text"
            fullWidth
            value={editingPrize?.title || ""}
            onChange={(e) =>
              setEditingPrize({ ...editingPrize, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Retail Price"
            type="number"
            fullWidth
            value={editingPrize?.retailPrice || ""}
            onChange={(e) =>
              setEditingPrize({ ...editingPrize, retailPrice: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Bulk Cost"
            type="number"
            fullWidth
            value={editingPrize?.bulkCost || ""}
            onChange={(e) =>
              setEditingPrize({ ...editingPrize, bulkCost: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Image URL"
            type="text"
            fullWidth
            value={editingPrize?.image || ""}
            onChange={(e) =>
              setEditingPrize({ ...editingPrize, image: e.target.value })
            }
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Status
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant={
                  editingPrize?.status === "active" ? "contained" : "outlined"
                }
                size="small"
                onClick={() =>
                  setEditingPrize({ ...editingPrize, status: "active" })
                }
              >
                Active
              </Button>
              <Button
                variant={
                  editingPrize?.status === "upcoming" ? "contained" : "outlined"
                }
                size="small"
                onClick={() =>
                  setEditingPrize({ ...editingPrize, status: "upcoming" })
                }
              >
                Upcoming
              </Button>
              <Button
                variant={
                  editingPrize?.status === "completed"
                    ? "contained"
                    : "outlined"
                }
                size="small"
                onClick={() =>
                  setEditingPrize({ ...editingPrize, status: "completed" })
                }
              >
                Completed
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditMode(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} color="secondary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <WinnerDialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <EmojiEventsIcon color="secondary" />
            <Typography variant="h5">Winner Drawn!</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prize Details
            </Typography>
            <Typography variant="body1" gutterBottom>
              {selectedPrize?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Retail Value: ${selectedPrize?.retailPrice}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Winner Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              {winner?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enrolled on: {new Date(winner?.enrolledOn).toLocaleDateString()}
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            The winner will be notified via email. Please ensure the prize is
            shipped within 7 business days.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </WinnerDialog>

      <Dialog
        open={showEligibilityInfo}
        onClose={() => setShowEligibilityInfo(false)}
      >
        <DialogTitle>Raffle Eligibility Requirements</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            To participate in raffles, users must meet the following criteria:
          </Typography>
          <ul>
            <li>Must be enrolled in partner platforms for at least 45 days</li>
            <li>Must not have opted out of partner platforms</li>
            <li>Must have an active enrollment status</li>
            <li>Prize must be in "active" status</li>
            <li>No previous winner for the prize</li>
          </ul>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: The system automatically checks eligibility before drawing
            winners.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowEligibilityInfo(false)}
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {drawingWinner && (
        <Dialog open={drawingWinner} maxWidth="sm" fullWidth>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom align="center">
                Drawing Winner
              </Typography>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      <Typography>{step.description}</Typography>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
}

export default RaffleEngine;
