import React, { Fragment, forwardRef, useState, useEffect } from 'react'
import { NavLink, Route, useLocation } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

import BreedDetail from './breed-detail';

const useStyles = makeStyles(() => ({
  menuContainer: {
    overflowY: 'auto',
    maxHeight: '100vh',
    position: 'fixed',
    width: 240
  },
  contentContainer: {
    marginLeft: 240,
    flexGrow: 1
  },
  toggleExpand: {
    marginLeft: 16
  },
  capitalize: {
    textTransform: 'capitalize',
    fontWeight: 'initial'
  }
}))

const LifeCycleTransform = () => {
  const [breeds, setBreeds] = useState({})
  const [opened, setOpened] = useState({})

  const location = useLocation()
  const classes = useStyles();

  const handleMenuOpen = breed => setOpened((opened) => ({...opened, [breed]: !opened[breed] }));

  const calculateBreed = search => search
    .replace('?', '')
    .split('&')
    .map(item => item.split('='))
    .reduce((acc, [ key, value ]) => ({ ...acc, [key]: value }), {});

  useEffect(() => {
    const { breed } = calculateBreed(location.search);
    breed && handleMenuOpen(breed);
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(data => data.json())
    .then(({ message }) => Object.entries(message).filter(([key, list]) => list.length > 0).reduce((acc, [breed, subBreeds]) => ({
      ...acc,
      [breed]: subBreeds
    }), {}))
    .then(breeds => setBreeds(breeds));
  }, [location.search])
  
  return (
    <Box display="flex" flexDirection="row">
      <Box p={1} className={classes.menuContainer}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {Object.entries(breeds).map(([name, subBreeds]) => (
            <Fragment key={name}>
              <ListItem button onClick={() => handleMenuOpen(name)}>
                <ListItemText primary={name} className={classes.capitalize}/>
                { opened[name] ? <ExpandLess className={classes.toggleExpand} /> : <ExpandMore className={classes.toggleExpand} /> }
              </ListItem>
              <Collapse in={ opened[name] } timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subBreeds.map(subBreed => (
                    <ListItem
                      button
                      key={ subBreed }
                      component={ forwardRef((props, ref) => (
                          <Link { ...props } to={`/breeds?breed=${name}&sub-breed=${subBreed}`} ref={ref} component={NavLink} />
                      )) }
                    >
                    <Typography
                      variant="button"
                      gutterBottom
                      className={classes.capitalize}
                    >
                      { subBreed }
                    </Typography>
                  </ListItem>
                  ))}
                </List>
              </Collapse>
            </Fragment>
            ))}
        </List>
      </Box>
      <Box p={1} className={classes.contentContainer}>
        <Route path="/breeds">
          <BreedDetail />
        </Route>
      </Box>
    </Box>
  )
}


export default LifeCycleTransform;
