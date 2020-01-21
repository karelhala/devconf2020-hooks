import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles, createStyles } from '@material-ui/core/styles';

const fetchDog = (breed, subBreed) => fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`).then(data => data.json())

const FETCH_INTERVAL = 10000
const TIMER_INTERVAL = 100

class BreedDetail extends Component {
  constructor(props) {
    super(props)
    const query = new URLSearchParams(this.props.location.search);
    this.state = {
      breed: query.get('breed'),
      subBreed: query.get('sub-breed'),
      src: undefined,
      dogIsFetching: true,
      timerValue: 0
    }
  }

  handleDogFetch(breed, subBreed) {
    this.setState({ dogIsFetching: true, timerValue: 0 })
    fetchDog(breed, subBreed).then(({ message }) => this.setState(() => ({src: message, dogIsFetching: false})))
  }

  componentDidMount(){
    this.handleDogFetch(this.state.breed, this.state.subBreed)
    this.fetchInterval = setInterval(() => this.handleDogFetch(this.state.breed, this.state.subBreed), FETCH_INTERVAL);
    this.progressInterval = setInterval(() => this.setState(({timerValue}) => ({timerValue: timerValue + 1})), TIMER_INTERVAL)
  }

  componentDidUpdate(_prevProps, prevState) {
    const query = new URLSearchParams(this.props.location.search);
    const subBreed = query.get('sub-breed')
    if(subBreed !== prevState.subBreed) {
      this.setState({
        breed: query.get('breed'),
        subBreed,
        timerValue: 0
      }, () => {
        this.handleDogFetch(this.state.breed, this.state.subBreed)
        clearInterval(this.fetchInterval)
        this.fetchInterval = setInterval(() => this.handleDogFetch(this.state.breed, this.state.subBreed), FETCH_INTERVAL);
        clearInterval(this.progressInterval)
        this.progressInterval = setInterval(() => this.setState(({timerValue}) => ({timerValue: timerValue + 1})), TIMER_INTERVAL)
      });
      
    }
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval)
    clearInterval(this.progressInterval)
  }
  
  render() {
    const { breed, subBreed, src, dogIsFetching, timerValue } = this.state
    const { classes } = this.props;
    return (
      <Box>
        <Box>
          <Typography variant="h3" component="h1" className={classes.heading}>
            {breed}
          </Typography>
          <Typography variant="h4" component="h2" className={classes.heading}>
            {subBreed}
          </Typography>
        </Box>
        <Box className={classes.imageContainer}>
          <LinearProgress className={classes.timerIndicator} variant="determinate" value={timerValue} />
          {dogIsFetching ? <CircularProgress /> : <img className={classes.dogImage} src={src} alt={src}/>}
        </Box> 
      </Box>
    )
  }
}

const styles = createStyles(() => ({
  heading: {
    textTransform: 'capitalize'
  },
  imageContainer: {
    height: 'calc(100vh - 97px - 48px - 4px)'
  },
  dogImage: {
    maxHeight: '100%'
  },
  timerIndicator: {
    width: '100%'
  }
}))


export default withStyles(styles)(withRouter(BreedDetail))
