import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PLAYER, PLAYER_SIGN, STATUS } from './constants';
import { setCurrentPlayer, setField, setStatus } from './actions';
import { checkEmptyCell, checkWin } from './utils';
import { selectCurrentPlayer, selectField, selectStatus } from './selectors';

class Field extends Component {
  handleCellClick = (cellIndex) => {
    const { status, currentPlayer, field, dispatch } = this.props;

    if (
      status === STATUS.WIN ||
      status === STATUS.DRAW ||
      field[cellIndex] !== PLAYER.NOBODY
    ) {
      return;
    }

    const newField = [...field];
    newField[cellIndex] = currentPlayer;

    dispatch(setField(newField));

    if (checkWin(newField, currentPlayer)) {
      dispatch(setStatus(STATUS.WIN));
    } else if (checkEmptyCell(newField)) {
      const newCurrentPlayer =
        currentPlayer === PLAYER.CROSS ? PLAYER.NOUGHT : PLAYER.CROSS;
      dispatch(setCurrentPlayer(newCurrentPlayer));
    } else {
      dispatch(setStatus(STATUS.DRAW));
    }
  };

  render() {
    const { field } = this.props;

    return (
      <div className="flex flex-wrap w-[300px] my-5 border border-black">
        {field.map((cellPlayer, index) => (
          <button
            key={index}
            onClick={() => this.handleCellClick(index)}
            className="w-[100px] h-[100px] text-[50px] border border-black flex items-center justify-center bg-white font-bold"
            >
            {PLAYER_SIGN[cellPlayer]}
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: selectStatus(state),
  currentPlayer: selectCurrentPlayer(state),
  field: selectField(state),
});

export default connect(mapStateToProps)(Field);
