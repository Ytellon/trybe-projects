import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import './Form.css';

class Form extends Component {
  render() {
    console.log(this.props);

    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      hasTrunfo,
      onSaveButtonClick } = this.props;
    return (
      <form>
        <Input
          type="text"
          datatestid="name-input"
          name="cardName"
          label="Nome"
          value={ cardName }
          onInputChange={ onInputChange }
        />
        <Input
          type="textarea"
          datatestid="description-input"
          name="cardDescription"
          label="Descricao"
          value={ cardDescription }
          onInputChange={ onInputChange }
        />
        <Input
          type="number"
          datatestid="attr1-input"
          name="cardAttr1"
          label="attribute 1"
          value={ cardAttr1 }
          onInputChange={ onInputChange }
        />
        <Input
          type="number"
          datatestid="attr2-input"
          name="cardAttr2"
          label="attribute 2"
          value={ cardAttr2 }
          onInputChange={ onInputChange }
        />
        <Input
          type="number"
          datatestid="attr3-input"
          name="cardAttr3"
          label="attribute 3"
          value={ cardAttr3 }
          onInputChange={ onInputChange }
        />
        <Input
          type="text"
          datatestid="image-input"
          name="cardImage"
          label="card Image"
          value={ cardImage }
          onInputChange={ onInputChange }
        />
        <select
          data-testid="rare-input"
          name="cardRare"
          value={ cardRare }
          onChange={ onInputChange }
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
        {hasTrunfo
            && <p>Você já tem um Super Trunfo em seu baralho</p> }
        {!hasTrunfo
            && <Input
              type="checkbox"
              datatestid="trunfo-input"
              name="cardTrunfo"
              label="Super Trunfo"
              checked={ cardTrunfo }
              onInputChange={ onInputChange }
            />}
        <button
          type="button"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
