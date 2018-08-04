import React, {Component} from 'react';
import propTypes from 'prop-types';
import './Tile.css';

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    static propTypes = {
        id: propTypes.number.isRequired,
        color: propTypes.string.isRequired,
        visibility: propTypes.number.isRequired,
        visibleTiles: propTypes.array,
        changeCardState: propTypes.func.isRequired,
        checkForMatch: propTypes.func.isRequired
    }
    
    handleVisibilityChange() {
        const {visibility, id, changeCardState} = this.props;
        changeCardState(visibility, id);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.count === 1) {
            this.props.checkForMatch();
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.count === 2) {
            return {count: nextProps.count};
        }
        else return null;
    }
    
    render() {
        const {color, visibility} = this.props;
        const style = (visibility === 0) ? {backgroundColor: '#737373'} :
            {backgroundColor: color};
        
        return (
            <div 
                className='game-tile'
                style={style}
                onClick={this.handleVisibilityChange}
            ></div>
        );
    }
}

export default Tile;