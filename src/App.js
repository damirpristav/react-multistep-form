import React, { Fragment } from 'react';
import './App.css';

import Form from './components/Form';

const App = () => {
  return (
    <Fragment>
      <section className="hero is-light has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="is-size-1">ReactJS multi step form with validation</h1>
          </div>
        </div>
      </section>
      <div className="container pt-5">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Form />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
