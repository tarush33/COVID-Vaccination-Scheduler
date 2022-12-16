import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyle = makeStyles({
    header: {
        background: 'crimson'
    },
    tabs: {
        color: '#FFFFFF',
        marginRight: 20,
        textDecoration: 'none',
        fontSize: 20
    }
})

const NavBar = () => {
    const classes = useStyle();
    const url='http://localhost:3001'
    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to="./" exact>Home</NavLink>
                {/* <NavLink className={classes.tabs} to="all" exact>All Users</NavLink> */}
                <NavLink className={classes.tabs} to="add" exact>Add User</NavLink>
                <NavLink className={classes.tabs} to="book-slot" exact>Book Slot</NavLink>
                <a href={url} style={{color:'white',fontSize:20}}>News</a>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;