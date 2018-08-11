import React from 'react';
import  CloseIcon  from '@material-ui/icons/Close'
import { IconButton, Snackbar } from '../../node_modules/@material-ui/core';


export const SnackBar = ({ open, message, close }) => {
  return (
    <div>
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={close}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={close}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    </div>
  )
}