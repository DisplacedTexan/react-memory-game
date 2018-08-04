import React, {Component} from 'react';
import './Game.css';
import Navbar from './Navbar';
import Tile from './Tile';

class Game extends Component {
    constructor(props) {
        super(props);
        let tiles = [
            {id: 0, cardState: CardState.HIDING, backgroundColor: 'crimson'},
            {id: 1, cardState: CardState.HIDING, backgroundColor: 'crimson'},
            {id: 2, cardState: CardState.HIDING, backgroundColor: 'darkorange'},
            {id: 3, cardState: CardState.HIDING, backgroundColor: 'darkorange'},
            {id: 4, cardState: CardState.HIDING, backgroundColor: 'gold'},
            {id: 5, cardState: CardState.HIDING, backgroundColor: 'gold'},
            {id: 6, cardState: CardState.HIDING, backgroundColor: 'lavender'},
            {id: 7, cardState: CardState.HIDING, backgroundColor: 'lavender'},
            {id: 8, cardState: CardState.HIDING, backgroundColor: 'mediumpurple'},
            {id: 9, cardState: CardState.HIDING, backgroundColor: 'mediumpurple'},
            {id: 10, cardState: CardState.HIDING, backgroundColor: 'mediumseagreen'},
            {id: 11, cardState: CardState.HIDING, backgroundColor: 'mediumseagreen'},
            {id: 12, cardState: CardState.HIDING, backgroundColor: 'aqua'},
            {id: 13, cardState: CardState.HIDING, backgroundColor: 'aqua'},
            {id: 14, cardState: CardState.HIDING, backgroundColor: 'royalblue'},
            {id: 15, cardState: CardState.HIDING, backgroundColor: 'royalblue'}
        ];
        this.state = {
            tiles: this.shuffle(tiles),
            //tracks id of visible tiles
            visibleTiles: [],
            //count of visible tiles
            count: 0
        };
        this.changeCardState = this.changeCardState.bind(this);
        this.checkForMatch = this.checkForMatch.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
    }
    
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    changeCardState(currentState, id) {
        let {tiles, visibleTiles} = this.state;
        let newState = CardState.SHOWING;
        this.setState({visibleTiles: [...visibleTiles, id]});
        
        tiles[id].cardState = newState;
        this.setState({tiles});
        this.setState((prevState, props) => ({
            count: prevState.count + 1
        }));
    }
    
    checkForMatch() {
        let {tiles, visibleTiles} = this.state;
        let [a, b] = [...visibleTiles];
        
        if (tiles[a].backgroundColor === tiles[b].backgroundColor) {
            this.isMatch(a,b);
        } else {
            this.isNotMatch(a,b);
        }
    }
    
    isMatch(a,b) {
        let {tiles} = this.state;
        tiles[a].cardState = tiles[b].cardState = CardState.MATCHING;
        this.setState({tiles, count: 0, visibleTiles: []});
    }
    
    isNotMatch(a,b) {
        let {tiles} = this.state;
        tiles[a].cardState = tiles[b].cardState = CardState.HIDING;
        setTimeout(
            function() {
                this.setState({tiles, count: 0, visibleTiles: []});
            }
            .bind(this),1500
            );
    }
    
    startNewGame() {
        let {tiles} = this.state;

        tiles.map((tile) => ({
            ...tile,
            cardState: CardState.HIDING
        }));
        
        this.setState({
            tiles: this.shuffle(tiles),
            visibleTiles: [],
            count: 0
        });
    }
    
    render() {
        let {newGame, count, clickable} = this.state;
        
        //change whether cards can be clicked based on showing cards
        var isClickable = (count === 2) ? () => {}: 
            this.changeCardState;
        
        const tiles = this.state.tiles.map((tile, index) =>(
            <Tile 
                key={index}
                id={index}
                color={tile.backgroundColor}
                clickable={clickable}
                visibility={tile.cardState}
                count={count}
                changeCardState={isClickable}
                checkForMatch={this.checkForMatch} />
        ));
        
        return (
            <div>
                <Navbar startNewGame={this.startNewGame} newGame={newGame} />
                <div id="game-board">
                    {tiles}
                </div>
            </div>
        );
    }
}

const CardState = {
    HIDING: 0,
    SHOWING: 1,
    MATCHING: 2
};

export default Game;