import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EditIcon from "@mui/icons-material/Edit";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const PrizeImage = styled(CardMedia)({
  height: 200,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "active"
      ? theme.palette.success.main
      : theme.palette.warning.main,
  color: "white",
}));

const DetailDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 8,
    padding: theme.spacing(2),
  },
}));

function PrizeManagement() {
  const [prizes, setPrizes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [newPrize, setNewPrize] = useState({
    title: "",
    retailPrice: "",
    bulkCost: "",
    image: "",
  });
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
    } catch (error) {
      console.error("Error fetching prizes:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePrizeClick = (prize) => {
    setSelectedPrize(prize);
  };

  const handleCloseDetail = () => {
    setSelectedPrize(null);
  };

  const handleInputChange = (e) => {
    setNewPrize({
      ...newPrize,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://thetop-36-backend.onrender.com/api/prizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPrize),
      });
      const data = await response.json();
      setPrizes([...prizes, data]);
      handleClose();
      setNewPrize({
        title: "",
        retailPrice: "",
        bulkCost: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding prize:", error);
    }
  };

  const calculateMargin = (retail, bulk) => {
    return (((retail - bulk) / retail) * 100).toFixed(1);
  };

  const handleEditClick = (prize) => {
    setEditingPrize(prize);
    setEditMode(true);
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
      console.error("Error updating prize:", error);
    }
  };

  const handleStatusChange = async (prize, newStatus) => {
    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/prizes/${prize.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...prize, status: newStatus }),
        }
      );
      const data = await response.json();
      setPrizes(prizes.map((p) => (p.id === data.id ? data : p)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleShippingUpdate = async (prize) => {
    try {
      const response = await fetch(
        `https://thetop-36-backend.onrender.com/api/prizes/${prize.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...prize, shipped: !prize.shipped }),
        }
      );
      const data = await response.json();
      setPrizes(prizes.map((p) => (p.id === data.id ? data : p)));
    } catch (error) {
      console.error("Error updating shipping status:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Prize Management
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          Add New Prize
        </Button>
      </Box>

      <Grid container spacing={4}>
        {prizes.map((prize) => (
          <Grid item key={prize.id} xs={12} sm={6} md={4}>
            <StyledCard onClick={() => handlePrizeClick(prize)}>
              <PrizeImage image={prize.image} title={prize.title} />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {prize.title}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(prize);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Retail Price: ${prize.retailPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Bulk Cost: ${prize.bulkCost}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Margin: {calculateMargin(prize.retailPrice, prize.bulkCost)}%
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <StatusChip
                    label={prize.status}
                    status={prize.status}
                    size="small"
                  />
                  {prize.winner && (
                    <Chip
                      icon={<LocalShippingIcon />}
                      label={prize.shipped ? "Shipped" : "Pending"}
                      color={prize.shipped ? "success" : "default"}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShippingUpdate(prize);
                      }}
                    />
                  )}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Add New Prize Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Prize</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Prize Title"
            type="text"
            fullWidth
            value={newPrize.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="retailPrice"
            label="Retail Price"
            type="number"
            fullWidth
            value={newPrize.retailPrice}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="bulkCost"
            label="Bulk Cost"
            type="number"
            fullWidth
            value={newPrize.bulkCost}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={newPrize.image}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="secondary">
            Add Prize
          </Button>
        </DialogActions>
      </Dialog>

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

      {/* Prize Detail Dialog */}
      <DetailDialog
        open={Boolean(selectedPrize)}
        onClose={handleCloseDetail}
        maxWidth="md"
        fullWidth
      >
        {selectedPrize && (
          <>
            <DialogTitle>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">{selectedPrize.title}</Typography>
                <IconButton onClick={handleCloseDetail}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedPrize.image}
                    alt={selectedPrize.title}
                    style={{ width: "100%", borderRadius: 8 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Prize Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Retail Price: ${selectedPrize.retailPrice}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Bulk Cost: ${selectedPrize.bulkCost}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Margin:{" "}
                      {calculateMargin(
                        selectedPrize.retailPrice,
                        selectedPrize.bulkCost
                      )}
                      %
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Status Information
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <StatusChip
                        label={selectedPrize.status}
                        status={selectedPrize.status}
                        sx={{ mr: 1 }}
                      />
                      {selectedPrize.winner && (
                        <Chip
                          icon={<EmojiEventsIcon />}
                          label="Winner Selected"
                          color="secondary"
                          sx={{ mr: 1 }}
                        />
                      )}
                      <Chip
                        icon={<LocalShippingIcon />}
                        label={selectedPrize.shipped ? "Shipped" : "Pending"}
                        color={selectedPrize.shipped ? "success" : "default"}
                      />
                    </Box>
                  </Box>
                  {selectedPrize.winner && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Winner Information
                        </Typography>
                        <Typography variant="body1">
                          Winner: {selectedPrize.winner}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetail} color="secondary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </DetailDialog>
    </Container>
  );
}

export default PrizeManagement;
