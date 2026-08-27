import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF9839',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h5: {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
        },
    },
    shape: {
        borderRadius: 12,
    },
});

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            let message = (err.response?.data?.message || "An error occurred");
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh', overflow: 'hidden' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url(/logo3.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            opacity: 0.1,
                            animation: 'pulse 4s ease-in-out infinite',
                        },
                        '@keyframes pulse': {
                            '0%': { transform: 'scale(0.95)' },
                            '50%': { transform: 'scale(1.05)' },
                            '100%': { transform: 'scale(0.95)' }
                        }
                    }}
                >
                    <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', p: 5 }}>
                        <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Outfit', mb: 2 }}>
                            ZoomX
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#94a3b8', fontWeight: 400 }}>
                            Experience seamless video connectivity.
                        </Typography>
                    </Box>
                </Grid>
                
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    borderLeft: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <Box
                        sx={{
                            my: 8,
                            mx: { xs: 4, md: 8 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon fontSize="large" sx={{ color: 'white' }} />
                        </Avatar>
                        
                        <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 4 }}>
                            {formState === 0 ? 'Welcome Back' : 'Create Account'}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, width: '100%', mb: 3 }}>
                            <Button 
                                fullWidth
                                variant={formState === 0 ? "contained" : "outlined"} 
                                onClick={() => { setFormState(0); setError(""); }}
                                sx={{ py: 1.5 }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                fullWidth
                                variant={formState === 1 ? "contained" : "outlined"} 
                                onClick={() => { setFormState(1); setError(""); }}
                                sx={{ py: 1.5 }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ '& .MuiOutlinedInput-root': { transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)' } } }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)' } } }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ '& .MuiOutlinedInput-root': { transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.01)' } } }}
                            />

                            {error && (
                                <Typography sx={{ color: '#ef4444', mt: 2, textAlign: 'center', fontSize: '0.9rem' }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ 
                                    mt: 4, 
                                    mb: 2, 
                                    py: 1.5, 
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 8px 20px rgba(255, 152, 57, 0.4)'
                                    }
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                message={message}
            />
        </ThemeProvider>
    );
}