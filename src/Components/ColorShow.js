import React from 'react'
import { ButtonBase } from '../../node_modules/@material-ui/core';
import { Done } from '@material-ui/icons'

class ColorShow extends React.Component {

    state = {
        isChecked: false
    }

    onClick = () => {
        this.setState({isChecked: true})
        this.props.selectColor(this.unSelectColor, this.props.color);
    }

    unSelectColor = () => {
        this.setState({isChecked: false})
    }

    render(){
        const { color } = this.props;
        return (
            <ButtonBase>
                <div onClick={this.onClick} style={{ width: "50px", height: "50px", backgroundColor: color[500]}}></div>
                {this.state.isChecked ? <Done style={{position: "absolute", top: 12, left: 12}}/> : <div></div>}
            </ButtonBase>
        )
    }
    
}

export default ColorShow
