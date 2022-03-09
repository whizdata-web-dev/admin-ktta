import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CategoryTable from './CategoryTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function CategorySection() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', margin: '1rem 0 0 0' }}>
      <AppBar position='static'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='secondary'
          variant='fullWidth'
          aria-label='full width tabs example'
          style={{ backgroundColor: '#ffc107', color: '#333' }}
        >
          <Tab label='Cadet Boys' {...a11yProps(0)} />
          <Tab label='Cadet Girls' {...a11yProps(1)} />
          <Tab label='Sub-Junior Boys' {...a11yProps(2)} />
          <Tab label='Sub-Junior Girls' {...a11yProps(3)} />
          <Tab label='Junior Boys' {...a11yProps(4)} />
          <Tab label='Junior Girls' {...a11yProps(5)} />
          <Tab label='Youth Boys' {...a11yProps(6)} />
          <Tab label='Youth Girls' {...a11yProps(7)} />
          <Tab label='Mens' {...a11yProps(8)} />
          <Tab label='Womens' {...a11yProps(9)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={8} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
        <TabPanel value={value} index={9} dir={theme.direction}>
          <CategoryTable />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
