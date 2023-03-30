import { CircularProgress, Paper, Typography } from "@mui/material"
import LinearIndeterminate from "./Loading";



const SplashPage = () => {
    return (<>
        <Paper sx={{ height: "100vh", width: "100vw" }} elevation={3} >
            <LinearIndeterminate />
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div>
                    <img src="/atlas.png" alt="Atlas Wealth Logo" style={{ height: '7rem' }}></img>
                    <Typography style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }} variant="h2">
                        ATLAS WEALTH
                    </Typography>
                    <Typography>Loading Assets</Typography>
                    <CircularProgress sx={{ marginTop: "1rem", color: "white" }} />
                </div>
            </div>

        </Paper >
    </>
    );
}

export default SplashPage;