import { Backdrop, Box, CircularProgress, Typography, Grid } from "@mui/material";
import { useLoadingScreen } from "../hooks/useLoadingScreen";

export function LoadingBackdrop() {
  const { isLoading } = useLoadingScreen();
  return (
    <Backdrop open={isLoading} hidden={!isLoading} style={{ zIndex: 10000 }}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
      <CircularProgress style={{ zIndex: 10001, color: "white", margin: "8px" }} />
      <Box width="100%"/>
      <Box>
        <Typography style={{color: "white", fontWeight: "bold", margin: "8px"}}>
          Loading...
        </Typography>
      </Box>
      </Grid>
    </Backdrop>
  );
}
