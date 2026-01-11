import React, { useState } from 'react';
import { Button, Container, Typography, Grid, Paper } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Subject from './Subject';  
import Timetable from './Timetable';  
import Teacher from './Teacher';  
import Fee from './Fee';  
import Library from './Library';  

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('subjects');

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#e0f2f1' }}>
        <Typography variant="h2" component="h1" gutterBottom style={{ textAlign: 'center', color: '#00796b' }}>
          College Management System
        </Typography>
      </Paper>
      
      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            style={{ minWidth: '150px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onClick={() => setActiveSection('subjects')}
          >
            <SubjectIcon style={{ marginRight: '10px' }} />
            Manage Subjects
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            style={{ minWidth: '150px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onClick={() => setActiveSection('timetables')}
          >
            <ScheduleIcon style={{ marginRight: '10px' }} />
            Manage Timetables
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="success" 
            size="large"
            style={{ minWidth: '150px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onClick={() => setActiveSection('teachers')}
          >
            <SchoolIcon style={{ marginRight: '10px' }} />
            Manage Teachers
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="warning" 
            size="large"
            style={{ minWidth: '150px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onClick={() => setActiveSection('fees')}
          >
            <AttachMoneyIcon style={{ marginRight: '10px' }} />
            Manage Fees
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="info" 
            size="large"
            style={{ minWidth: '150px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
            onClick={() => setActiveSection('libraries')}
          >
            <LocalLibraryIcon style={{ marginRight: '10px' }} />
            Manage Libraries
          </Button>
        </Grid>
      </Grid>

      <div className="content">
        {activeSection === 'subjects' && <Subject />}
        {activeSection === 'timetables' && <Timetable />}
        {activeSection === 'teachers' && <Teacher />}
        {activeSection === 'fees' && <Fee />}
        {activeSection === 'libraries' && <Library />}
      </div>

      <Paper elevation={3} style={{ padding: '10px', marginTop: '20px', backgroundColor: '#e0f2f1' }}>
        <Typography variant="subtitle1" component="p" align="center" style={{ color: '#004d40' }}>
          &copy; 2024 College Management System
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
