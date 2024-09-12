import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RESTART_GAME } from './actions';
import Field from './field'; // Убедитесь, что это default export
import Information from './information'; // Убедитесь, что это default export

class Game extends Component {
  handleRestart = () => {
    this.props.dispatch(RESTART_GAME);
  };

  render() {
    return (
      <div className="flex flex-col items-center w-[300px] my-[50px] mx-auto">
        <Information />
        <Field />
        <button
          onClick={this.handleRestart}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Начать заново
        </button>
      </div>
    );
  }
}

export default connect()(Game);
