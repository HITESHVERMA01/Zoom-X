import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {


    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");


    const {addToUserHistory} = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar glass">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>ZoomX</h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "var(--text-muted)", transition: "color 0.2s" }} onClick={() => navigate("/history")}>
                        <IconButton color="inherit">
                            <RestoreIcon />
                        </IconButton>
                        <p style={{ margin: 0, fontWeight: 500 }}>History</p>
                    </div>

                    <Button onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }} sx={{ color: "white", borderColor: "rgba(255,255,255,0.2)", "&:hover": { borderColor: "white" } }} variant="outlined">
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Premium Video Meetings.<br/>Now Free for Everyone.</h2>

                        <div style={{ display: 'flex', gap: "15px", marginTop: "2rem" }}>
                            <TextField 
                                onChange={e => setMeetingCode(e.target.value)} 
                                id="outlined-basic" 
                                label="Enter Meeting Code" 
                                variant="outlined"
                                sx={{ flex: 1 }}
                            />
                            <Button onClick={handleJoinVideoCall} variant='contained' size="large">Join Meeting</Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img srcSet='/logo3.png' alt="Video Meeting Illustration" />
                </div>
            </div>
        </>
    )
}


export default withAuth(HomeComponent)