import React, {Component} from 'react';
import propTypes from 'prop-types';
import './Navbar.css';

class Navbar extends Component {
    static propTypes = {
        startNewGame: propTypes.func.isRequired
    }
    
    render() {
        const {startNewGame} = this.props;
        
        return (
            <header>
                <h2>Memory</h2>
                <span id="new-game"><a onClick={startNewGame}>New Game</a></span>
            </header>  
        );
    }
}

export default Navbar;