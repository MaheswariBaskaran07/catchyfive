import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Switch, Button, FormControlLabel,
  Paper, Divider, useTheme, useMediaQuery, MenuItem, Select,
  InputLabel, FormControl, Avatar, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions
} from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
];

const SettingsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [notifyBySMS, setNotifyBySMS] = useState(false);
  const [language, setLanguage] = useState('en');
  const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
  const [openPwd, setOpenPwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userProfile');
    if (userData) {
      const parsed = JSON.parse(userData);
      setName(parsed.name || '');
      setEmail(parsed.email || '');
      setPhone(parsed.phone || '');
    }
  }, []);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleLogout = () => {
    toast.info('Logged out.');
    setTimeout(() => navigate('/login'), 1500);
  };

  const handlePwdChange = () => {
    if (!currentPwd || newPwd !== confirmPwd) {
      toast.error('Passwords do not match or missing fields');
      return;
    }
    toast.success('Password changed successfully!');
    setOpenPwd(false);
  };

  return (
    <Box
      minHeight="100vh"
      px={2}
      py={4}
      sx={{
        background: 'linear-gradient(to right, #d4fc79, #96e6a1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ToastContainer position="top-center" autoClose={2000} />
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 720,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          bgcolor: 'white'
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          fontWeight={700}
          mb={2}
          textAlign="center"
          sx={{
            background: 'linear-gradient(to right, #56ab2f, #a8e063)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Settings
        </Typography>

        {/* Profile Picture Upload */}
        <Box display="flex" justifyContent="center" mt={2} mb={3}>
          <label htmlFor="icon-button-file">
            <InputLabel htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <Avatar src={profilePic} sx={{ width: 80, height: 80 }} />
                <PhotoCamera sx={{ position: 'absolute', bottom: -4, right: 4 }} />
              </IconButton>
            </InputLabel>
          </label>
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setProfilePic(URL.createObjectURL(file));
            }}
          />
        </Box>

        {/* Profile Info */}
        <Typography variant="h6" fontWeight={600}>Profile Info</Typography>
        <TextField fullWidth label="Full Name" margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Phone Number" margin="normal" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <Divider sx={{ my: 3 }} />

        
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <Typography variant="h6" fontWeight={600} mb={1}>Language</Typography>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}>
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="col-md-6">
            <Typography variant="h6" fontWeight={600} mb={1}>Notifications</Typography>
            <FormControlLabel
              control={<Switch checked={notifyByEmail} onChange={() => setNotifyByEmail(!notifyByEmail)} />}
              label="Email Notifications"
              sx={{ display: 'block' }}
            />
            <FormControlLabel
              control={<Switch checked={notifyBySMS} onChange={() => setNotifyBySMS(!notifyBySMS)} />}
              label="SMS Notifications"
              sx={{ display: 'block' }}
            />
          </div>
        </div>

        
        <div className="d-flex flex-wrap justify-content-between mb-3 gap-2">
          <Button
            variant="contained"
            onClick={() => setOpenPwd(true)}
            sx={{
              flex: '1 1 45%',
              background: 'linear-gradient(to right, #6dd5ed, #2193b0)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
              }
            }}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/delivery-info')}
            sx={{
              flex: '1 1 45%',
              background: 'linear-gradient(to right, #49cc16ff, #73ac09ff)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(to right, #b6ca42ff, #499b07ff)',
              }
            }}
          >
            Manage Delivery Addresses
          </Button>
        </div>

        
        <div className="d-flex justify-content-between flex-wrap align-items-center gap-2 mb-2">
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(to right, #56ab2f, #a8e063)',
              textTransform: 'none',
              fontWeight: 'bold',
              minWidth: 150,
              '&:hover': {
                background: 'linear-gradient(to right, #43e97b, #38f9d7)',
              }
            }}
          >
            Save Changes
          </Button>

          <Button
            variant="text"
            color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              fontWeight: 'bold',
              color: '#d32f2f',
              '&:hover': { color: '#b71c1c' }
            }}
          >
            Logout
          </Button>
        </div>

        {/* Change Password Dialog */}
        <Dialog open={openPwd} onClose={() => setOpenPwd(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField label="Current Password" type="password" fullWidth value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} />
              <TextField label="New Password" type="password" fullWidth value={newPwd} onChange={(e) => setNewPwd(e.target.value)} />
              <TextField label="Confirm Password" type="password" fullWidth value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPwd(false)}>Cancel</Button>
            <Button variant="contained" onClick={handlePwdChange}>Change</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
