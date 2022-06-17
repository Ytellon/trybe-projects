import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';
import { getQuestionsFromApi } from '../services/api';
import { getScore, getAssertion } from '../actions';
import '../components/styles/games.css';
import musicQuestion from '../components/styles/audio/song_question.mp3';

class Game extends Component {
  audio = new Audio(musicQuestion)

  constructor() {
    super();

    this.state = {
      index: 0,
      questions: [],
      render: false,
      clicked: false,
      timer: 30,
      shuffleResponse: [],
    };
  }

  async componentDidMount() {
    this.audio.play();
    const token = localStorage.getItem('token');
    const data = await getQuestionsFromApi(token);
    this.setState({
      questions: data.results,
    }, () => {
      this.setState({ render: true });
      this.shuffleQuestions();
      this.timer();
    });
    const { history } = this.props;
    const errorCode = 3;
    if (data.response_code === errorCode) {
      history.push('/');
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = ({ target }) => {
    const { scoreFunc, saveAssertion } = this.props;
    const { questions, index, timer } = this.state;
    clearInterval(this.interval);
    this.setState({
      clicked: true,
    });
    if (target.value === questions[index].correct_answer) {
      let difficultyPoint = '';
      const baseScore = 10;
      const hardModifier = 3;
      saveAssertion();
      if (questions[index].difficulty === 'easy') {
        difficultyPoint = 1;
      } else if (questions[index].difficulty === 'medium') {
        difficultyPoint = 2;
      } else {
        difficultyPoint = hardModifier;
      }
      scoreFunc(baseScore + (timer * difficultyPoint));
    }
  }

  shuffleQuestions = () => {
    const { questions, index } = this.state;
    const lasQuestion = 4;
    if (questions.length > 0 && index <= lasQuestion) {
      const answer = [questions[index].correct_answer,
        ...questions[index].incorrect_answers];
      const s = 0.5;
      answer.sort(() => Math.random() - s);
      this.setState({
        shuffleResponse: answer,
      });
    }
  }

  handleColor = (answer) => {
    const { questions, index } = this.state;
    if (questions[index].correct_answer === answer) {
      return 'trueAnswer';
    }
    return 'falseAnswer';
  }

  renderQuestion = () => {
    const { questions, clicked, shuffleResponse } = this.state;
    return (
      questions.map((q, i) => (
        <div key={ i }>
          <div className="divQuestion">
            <p
              data-testid="question-category"
              className="questionCategory"
            >
              {q.category}

            </p>
            <p data-testid="question-text" className="questionText">{q.question}</p>
          </div>
          <div data-testid="answer-options" className="answersContainer">
            {shuffleResponse.map((primary, qIndex) => (
              <button
                type="button"
                key={ qIndex }
                data-testid={ primary === q.correct_answer
                  ? 'correct-answer' : `wrong-answer-${qIndex}` }
                id={ primary === q.correct_answer
                  ? 'correct-answer' : `wrong-answer-${qIndex}` }
                className={ clicked ? this.handleColor(primary) : 'answers' }
                onClick={ this.handleClick }
                value={ primary }
                disabled={ clicked }
              >
                {primary}
              </button>
            ))}
          </div>
        </div>
      ))
    );
  }

  clickIndex = () => {
    const { index } = this.state;
    const { history } = this.props;
    const lasQuestion = 4;

    this.setState((state) => {
      if (state.index === lasQuestion) {
        history.push('/feedback');
      } else {
        this.timer();
        this.setState({
          index: index + 1,
          clicked: false,
          timer: 30,
        }, () => {
          this.shuffleQuestions();
        });
      }
    });
  }

  timer() {
    const second = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState({ timer: timer - 1 });
      } else {
        clearInterval(this.interval);
        this.setState({ clicked: true });
      }
    }, second);
  }

  render() {
    const { render, index, timer, clicked } = this.state;
    return (
      <div>
        <Header />
        <div className="divCountdown">
          <span className="countdown">{timer}</span>
        </div>
        <div className="gameContainer">
          <div className="question">
            { render ? this.renderQuestion()[index]
              : <p>Loading...</p> }
          </div>
        </div>
        <div className="divNextBtn">
          {clicked && (
            <button
              type="button"
              data-testid="btn-next"
              className="nextBtn"
              onClick={ () => {
                this.clickIndex();
              } }
            >
              Next
            </button>)}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  scoreFunc: PropTypes.func.isRequired,
  saveAssertion: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  scoreFunc: (score) => dispatch(getScore(score)),
  saveAssertion: () => dispatch(getAssertion()),
});

export default connect(null, mapDispatchToProps)(withRouter(Game));
