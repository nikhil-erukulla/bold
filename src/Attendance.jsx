
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Drawer from '@mui/material/Drawer';
import AddBranch from './AddBranch';
import axios from 'axios';
import Dashboard from './Dashboard';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SchemaTwoToneIcon from '@mui/icons-material/SchemaTwoTone';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'whitesmoke',
  '&:hover': {
    backgroundColor: 'whitesmoke',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#d32f2f',
  color: 'white',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
}));

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [noResultsFound, setNoResultsFound] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterRows(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9999/all');
      const sortedData = response.data.sort((a, b) => b.branch_Id - a.branch_Id); 
      setRows(sortedData);
      setAllRows(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterRows = (query) => {
    if (!query) {
      setRows(allRows);
      setNoResultsFound(false);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filteredRows = allRows.filter((row) =>
        Object.values(row).some(value =>
          value.toString().toLowerCase().includes(lowercasedQuery)
        )
      );
      setRows(filteredRows);
      setNoResultsFound(filteredRows.length === 0);
    }
  };

  const toggleDrawer = (open, branch = null) => () => {
    setCurrentBranch(branch);
    setDrawerOpen(open);
  };

  const handlePreviousButtonClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextButtonClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const getStatusColor = (status) => {
    if (status === null) return 'black'; 
    return status.toLowerCase() === 'active' ? 'green' : 'red';
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%', backgroundColor: '#F8F8F8'}}>
      <Box sx={{ display: 'flex', flex: 1, marginTop: '33px' }}>
        <Dashboard sx={{ display: 'flex', flex: 1, marginTop: '33px' }} />
        <Box sx={{ flex: 1, padding: '10px 20px 20px 20px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
              <Box sx={{ flexGrow: 1, width: '100%' }}>
                <AppBar position="static" sx={{ bgcolor: 'white', marginRight:'10px' , color: 'grey', borderRadius: '5px', marginLeft:'0.5px' }}>
                  <Toolbar>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#2f4f85',fontWeight: 'bold' }}
                    >
                      Attendence
                    </Typography>
                    <Search>
                    <StyledInputBase
                       placeholder="Search"
                       inputProps={{ 'aria-label': 'search' }}
                       value={searchQuery}
                       onChange={handleSearchChange}
                       sx={{ color: '#F4F4F4', backgroundColor: 'white', '&::placeholder': { color: 'blue' } }} // Adjust placeholder color here
                    />
                    </Search>

                  </Toolbar>
                </AppBar>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '27px', marginBottom: '27px', marginLeft:'10px', marginRight:'10px' }}>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{
                      margin: -2,
                      marginLeft: 0,
                      backgroundColor: '#ED4040',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                      width: '155px', 
                      height: '50px' 
                    }}
                    onClick={toggleDrawer(true)}
                  >
                  Attendence
                  </Button>

                  <ToggleButtonGroup exclusive aria-label="view toggle">
                    <ToggleButton value="schema" aria-label="schema view" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'darkgray' } }}>
                      <FormatListBulletedIcon sx={{ color: 'white' }} />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <SchemaTwoToneIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', marginBottom: '60px', marginTop: '10px' }}>
                <TableContainer component={Paper} sx={{border: '1px solid #EBEBEB' }}>
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }}align="left">Employee ID</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Name</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Clock-in time</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Clock-out time</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Hours worked</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Date</TableCell>
                        <TableCell sx={{ color: '#0E3B64', fontWeight: 'bold' }} align="left">Status</TableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentRows.length > 0 ? (
                        currentRows.map((row) => (
                          <TableRow key={row['branch_Id']}>
                            <TableCell align="left">{row['branch_Id']}</TableCell>
                            <TableCell align="left">{row['name']}</TableCell>
                            <TableCell align="left">{row['clock_in_time']}</TableCell>
                            <TableCell align="left">{row['clock_out_time']}</TableCell>
                            <TableCell align="left">{row['hours_worked']}</TableCell>
                            <TableCell align="left">{row['date']}</TableCell>
                            <TableCell align="left" sx={{ color: getStatusColor(row['status']) }}>{row['status']}</TableCell>
                            
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            {noResultsFound ? 'No results found.' : 'Loading...'}
                          </TableCell>
                        </TableRow>
                        
                      )}
                    </TableBody>
                    
                  </Table>
                  


                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px'}}>
                    <Button
                      onClick={handlePreviousButtonClick}
                      sx={{ color: '#486A89', backgroundColor: 'whitesmoke', marginRight: '8px', textTransform: 'capitalize' }}
                      className="CustomButton"
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <RedButton
                      onClick={handleNextButtonClick}
                      sx={{
                        color: 'white',
                        marginRight: '8px',
                      
                      }}
                      className="CustomButton"
                    >
                      {currentPage}
                    </RedButton>
                    <Button
                      onClick={handleNextButtonClick}
                      sx={{ color: '#486A89', backgroundColor: 'whitesmoke', marginRight: '8px', textTransform: 'capitalize' }}
                      className="CustomButton"
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </Box>
                </TableContainer>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AddBranch currentBranch={currentBranch} onClose={toggleDrawer(false)} fetchData={fetchData} />
      </Drawer>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

