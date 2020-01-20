import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, createStyles } from '@material-ui/core/styles';

const fetchDog = (breed, subBreed) => fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`).then(data => data.json())

class BreedDetail extends Component {
  constructor(props) {
    super(props)
    const query = new URLSearchParams(this.props.location.search);
    this.state = {
      breed: query.get('breed'),
      subBreed: query.get('sub-breed'),
      src: undefined,
      dogIsFetching: true,
    }
  }

  handleDogFetch(breed, subBreed) {
    this.setState({ dogIsFetching: true })
    fetchDog(breed, subBreed).then(({ message }) => this.setState(() => ({src: message, dogIsFetching: false})))
  }

  componentDidMount(){
    this.handleDogFetch(this.state.breed, this.state.subBreed)
  }

  componentDidUpdate(_prevProps, prevState) {
    const query = new URLSearchParams(this.props.location.search);
    const subBreed = query.get('sub-breed')
    if(subBreed !== prevState.subBreed) {
      this.setState({
        breed: query.get('breed'),
        subBreed
      }, () => this.handleDogFetch(this.state.breed, this.state.subBreed));
      
    }
  }
  
  render() {
    const { breed, subBreed, src, dogIsFetching } = this.state
    const { classes } = this.props;
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" className={classes.heading}>
            {breed}
          </Typography>
          <Typography variant="h4" component="h2" className={classes.heading}>
            {subBreed}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {dogIsFetching ? <CircularProgress /> : <img src={src} />}
        </Grid> 
      </Grid>
    )
  }
}

const styles = createStyles(() => ({
  heading: {
    textTransform: 'capitalize'
  }
}))


export default withStyles(styles)(withRouter(BreedDetail))
