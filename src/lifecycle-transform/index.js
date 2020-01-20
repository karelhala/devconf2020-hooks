import React, { Component, Fragment, forwardRef } from 'react'
import { NavLink, Route } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import BreedDetail from './breed-detail';

class LifeCycleTransform extends Component {
  state = {
    selectedBreed: undefined,
    isFetchingSelectedBreed: false,
    breeds: {},
    isFetchingBreeds: true,
    opened: {}
  }

  handleMenuOpen = breed => this.setState(({opened}) => ({ opened: {...opened, [breed]: !opened[breed] }}))

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(data => data.json())
    .then(({ message }) => Object.entries(message).filter(([key, list]) => list.length > 0).reduce((acc, [breed, subBreeds]) => ({
      ...acc,
      [breed]: subBreeds
    }), {}))
    .then(breeds => this.setState({breeds, isFetchingBreeds: false}));
  }
  
  render() {
    const {breeds, opened} = this.state;
    console.log('opened', opened)
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {Object.entries(breeds).map(([name, subBreeds]) => (
              <Fragment key={name}>
                <ListItem button onClick={() => this.handleMenuOpen(name)}>
                  <ListItemText primary={name}/>
                  { opened[name] ? <ExpandLess /> : <ExpandMore /> }
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
                        style={{ textTransform: 'capitalize', fontWeight: 'initial' }}
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
        </Grid>
        <Grid item xs={10}>
          <Route path="/breeds">
            <BreedDetail />
          </Route>.
        </Grid>
      </Grid>
    )
  }
}

export default LifeCycleTransform;
