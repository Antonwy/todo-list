import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ColorShow from './ColorShow';
import { changePrimaryColor, changeSecondaryColor } from '../Redux/actions'
import { connect } from 'react-redux'

import { red, pink, purple, deepPurple,
    indigo, blue, lightBlue, cyan, teal,
    green, lightGreen, lime, yellow, amber,
    orange, deepOrange, brown, grey, blueGrey
} from '@material-ui/core/colors';

const colors = [
    red, pink, purple, deepPurple,
    indigo, blue, lightBlue, cyan, teal,
    green, lightGreen, lime, yellow, amber,
    orange, deepOrange, brown, grey, blueGrey
]

let currCallback = null;

class ColorChooser extends React.Component {


  selectPrimaryColor = (callback, color) => {

    if(currCallback !== null){
        currCallback();
    }
    currCallback = callback;
    if(this.props.colorType === 'primary'){
      this.props.changePrimaryColor(color);
    }else{
      this.props.changeSecondaryColor(color);
    }
    
  }

  render() {
    const { fullScreen, colorType, open, handleClose } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{`Choose ${colorType} Color: `}</DialogTitle>
          <DialogContent>
            <div style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: 'center', alignContent: 'center'}}>
                {colors.map((color, i) => ( <ColorShow selectColor={this.selectPrimaryColor} key={i} color={color}/> ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
            <Button onClick={handleClose} color="secondary" autoFocus>
              Choose
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
      colors: state.colors
  }
}

export default withMobileDialog()(connect(mapStateToProps, { changePrimaryColor, changeSecondaryColor })(ColorChooser));