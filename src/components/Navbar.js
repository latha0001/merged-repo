import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: '"DM Serif Display", serif',
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  letterSpacing: "0.5px",
  cursor: "pointer",
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: active ? theme.palette.secondary.main : theme.palette.common.white,
  marginLeft: theme.spacing(2),
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Logo variant="h5" component="div" onClick={() => navigate("/")}>
            thetop36
          </Logo>
          <Box sx={{ flexGrow: 1 }} />
          <NavButton active={isActive("/")} onClick={() => navigate("/")}>
            Prize Management
          </NavButton>
          <NavButton
            active={isActive("/raffle")}
            onClick={() => navigate("/raffle")}
          >
            Raffle Engine
          </NavButton>
          <NavButton
            active={isActive("/confirmation")}
            onClick={() => navigate("/confirmation")}
          >
            Enrollment
          </NavButton>
          <Tooltip title="About TheTop36">
            <IconButton
              color="secondary"
              sx={{ ml: 2 }}
              onClick={() => navigate("/about")}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;
