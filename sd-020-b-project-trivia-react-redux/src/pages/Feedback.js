import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import { resetGame } from '../actions';
import '../components/styles/feedback.css';

class Feedback extends Component {
  componentDidMount() {
    const { player } = this.props;
    const ranking = {
      name: player.name,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${player.gravatarEmail}`,
    };

    if (localStorage.getItem('ranking')) {
      const newRanking = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...newRanking, ranking]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([ranking]));
    }
  }

  render() {
    const pointsComparation = 2;
    const { scoreGame, assertion, history, resetFunc } = this.props;
    return (
      <main>
        <Header />
        <div className="feedbackScore">
          <span
            data-testid="feedback-total-score"
            className="feedbackScoreText"
          >
            Score:
            {' '}
            {scoreGame}

          </span>
          <span
            data-testid="feedback-total-question"
            className="feedbackScoreText"
          >
            Correct Answers:
            {' '}
            {assertion}

          </span>
          {assertion <= pointsComparation
            ? (
              <p
                data-testid="feedback-text"
                className="feedbackText"
              >
                Could be better...

              </p>)
            : <p data-testid="feedback-text" className="feedbackText">Well Done!</p>}
        </div>
        <div className="feedbackButtons">
          <button
            data-testid="btn-play-again"
            type="button"
            className="playAgainBtn"
            onClick={ () => {
              history.push('/');
              resetFunc();
            } }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            className="rankingBtn"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetFunc: () => dispatch(resetGame()),
});

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
  scoreGame: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  player: PropTypes.objectOf(PropTypes.shape).isRequired,
  resetFunc: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertion: state.player.assertions,
  scoreGame: state.player.score,
  player: state.player,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Feedback));
