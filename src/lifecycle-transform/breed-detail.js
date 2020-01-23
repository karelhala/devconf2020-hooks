import React, { useReducer, useEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Tick } from './tick';
import useQuery from './use-query';

const fetchDog = (breed, subBreed) => fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`).then(data => data.json())

const FETCH_INTERVAL = 10000
const TIMER_INTERVAL = 100

const detailReducer = (state, action) => {
  switch (action.type) {
    case 'init-fetch':
      return {...state, dogIsFetching: true, timerValue: 0}
    case 'finish-fetch':
      return {...state, src: action.payload, dogIsFetching: false}
    case 'update-timer':
      return {...state, timerValue: state.timerValue + 1}
    case 'reset-timer':
      return {...state, timerValue: 0}
    default:
      throw new Error('Unsupported action');
  }
}

const useStyles = makeStyles(() => ({
  heading: {
    textTransform: 'capitalize'
  },
  imageContainer: {
    height: 'calc(100vh - 97px - 48px - 20px)'
  },
  dogImage: {
    maxHeight: '100%'
  },
  timerIndicator: {
    width: '100%'
  }
}))

const BreedDetail = () =>  {
  const {breed, subBreed} = useQuery()
  const ref = useRef()
  const [state, dispatch] = useReducer(detailReducer, {
    src: undefined,
    dogIsFetching: true,
    timerValue: 0,
    pause: false,
  })
  const classes = useStyles();

  const tickClicked = () => dispatch({type: 'reset-timer'});

  const handleDogFetch = (breed, subBreed) => {
    dispatch({ type: 'init-fetch' })
    return fetchDog(breed, subBreed).then(({ message }) => dispatch({type: 'finish-fetch', payload: message}));
  }

  useEffect(() => {
    handleDogFetch(breed, subBreed)
  }, [breed,subBreed])

  useEffect(() => {
    let fetchInterval;
    let progressInterval;
    if(!ref?.current?.checked) {
      clearInterval(fetchInterval)
      clearInterval(progressInterval)
    } else {
      fetchInterval = setInterval(() => handleDogFetch(breed, subBreed), FETCH_INTERVAL);
      progressInterval = setInterval(() => dispatch({type: 'update-timer'}), TIMER_INTERVAL)
    }
    return () => {
      clearInterval(fetchInterval)
      clearInterval(progressInterval)
    }
  }, [ref?.current?.checked])

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
        <Box>
          <div>
            <Tick ref={ref} onClick={tickClicked} label="Auto reload"/>
          </div>
        </Box>
        <Box className={classes.imageContainer}>
          <LinearProgress className={classes.timerIndicator} variant="determinate" value={state.timerValue} />
          {state.dogIsFetching ? <CircularProgress /> : <img className={classes.dogImage} src={state.src} alt={state.src}/>}
        </Box> 
      </Box>
    )
  }


export default BreedDetail
