import React, { forwardRef } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Tick = forwardRef(({ label, ...props }, ref) => {
  return <FormControlLabel control={
    <Checkbox
      {...props}
      defaultChecked
      inputRef={ref}
      value="uncontrolled"
      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
    />
  } label={label}/>
});
