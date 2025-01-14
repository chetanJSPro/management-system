import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from "../assets/images/logo.png";
import { Button, CssBaseline } from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function Layout({ children }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [expandedEditStudents, setExpandedEditStudents] = useState(false);
    const [expandedUpdateMarks, setExpandedUpdateMarks] = useState(false);
    const [expandedUpdateAttendance, setExpandedUpdateAttendance] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        collapseAllMenus(); // Collapse all menus when drawer is closed
    };

    const toggleEditStudentsMenu = () => {
        setExpandedEditStudents(!expandedEditStudents);
    };

    const toggleUpdateMarksMenu = () => {
        setExpandedUpdateMarks(!expandedUpdateMarks);
    };

    const toggleUpdateAttendanceMenu = () => {
        setExpandedUpdateAttendance(!expandedUpdateAttendance);
    };

    const collapseAllMenus = () => {
        setExpandedEditStudents(false);
        setExpandedUpdateMarks(false);
        setExpandedUpdateAttendance(false);
    };

    const navItems = ['Home', 'About', 'Contact'];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} className="bg-white text-black">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} height={60} alt="" />
                    <Typography variant="h6" noWrap component="div">
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#000' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button component="a" href="/home">
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button component="a" href="/check-attendence">
                        <ListItemIcon>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Check Attendance" />
                    </ListItem>

                    {/* Edit Students Dropdown */}
                    <ListItem button onClick={toggleEditStudentsMenu}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit Students" />
                        {expandedEditStudents ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={expandedEditStudents} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component="a" href="/StudentForm">
                                <ListItemText primary="Add Students" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Remove Students" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Edit Students" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Update Marks Dropdown */}
                    <ListItem button onClick={toggleUpdateMarksMenu}>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Update Marks" />
                        {expandedUpdateMarks ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={expandedUpdateMarks} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component="a" href="/sessional">
                                <ListItemText primary="Sessional Marks" />
                            </ListItem>
                            <ListItem button component="a" href="/Updatemarks">
                                <ListItemText primary="Final Exam Marks" />
                            </ListItem>
                        </List>
                    </Collapse>

                    {/* Update Attendance Dropdown */}
                    <ListItem button onClick={toggleUpdateAttendanceMenu}>
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Update Attendance" />
                        {expandedUpdateAttendance ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </ListItem>
                    <Collapse in={expandedUpdateAttendance} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button component="a" href="/addAttendence">
                                <ListItemText primary="Add / Update" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Bulk Update" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
