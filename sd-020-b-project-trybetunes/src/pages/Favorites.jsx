import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-favorites">Favorites</div>
      </main>
    );
  }
}

export default Favorites;
