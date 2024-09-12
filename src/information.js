import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectStatus, selectCurrentPlayer } from './selectors';
import { PLAYER_ACTION, PLAYER_NAME, STATUS } from './constants';

export class Information extends Component {
  render() {
    const { status, currentPlayer } = this.props;

    const playerAction = PLAYER_ACTION[status];
    const playerName = PLAYER_NAME[currentPlayer];

    const information =
      status === STATUS.DRAW ? 'Ничья' : `${playerAction}: ${playerName}`;

    return (
      <div className="flex items-center justify-center h-16 bg-gray-200 border border-gray-300 rounded-lg shadow-md">
        <span className="text-xl font-semibold text-gray-700">{information}</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: selectStatus(state),
  currentPlayer: selectCurrentPlayer(state),
});

export default connect(mapStateToProps)(Information);
