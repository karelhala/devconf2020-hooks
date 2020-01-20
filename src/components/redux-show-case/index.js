import React from 'react'
import { Store } from '../../rexud-using-hooks'
import demoReducer from '../../rexud-using-hooks/demo-reducer';
import ChildComponent from './child-component';
import DisplayComponent from './display-component';

const ReduxShowCase = () => (
    <Store reducer={demoReducer} initialState={{count: 0}}>
      <ChildComponent />
      <DisplayComponent />
    </Store>
)

export default ReduxShowCase;
