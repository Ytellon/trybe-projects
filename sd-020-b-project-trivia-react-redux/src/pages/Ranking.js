import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetGame } from '../actions';

class Ranking extends Component {
  render() {
    const { history, resetFunc } = this.props;
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            history.push('/');
            resetFunc();
          } }
        >
          Inicio
        </button>
        {rankingList.sort((a, b) => b.score - a.score)
          .map((rankingPosition, index) => (
            <div key={ index }>
              <img
                src={ rankingPosition.picture }
                alt={ rankingPosition.name }
              />
              <p data-testid={ `player-name-${index}` }>{rankingPosition.name}</p>
              <p data-testid={ `player-score-${index}` }>{rankingPosition.score}</p>
            </div>
          ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetFunc: () => dispatch(resetGame()),
});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  resetFunc: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(Ranking));
