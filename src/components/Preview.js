import React, { Fragment } from 'react';

const Preview = ({ data, onPrevStep }) => {
  return(
    <div className="panel is-primary">
      <p className="panel-heading">Your data</p>
      <div className="panel-block is-block">
        <ul className="py-5">
          {data.map((input, index) => (
            <li key={index} className="py-2">
              {!input.image
                ? <Fragment><strong>{input.label}:</strong> {input.value}</Fragment>
                : <div><strong>{input.label}:</strong> <img src={input.value} alt="" style={{maxWidth: '100px'}} /></div>
              }
            </li>
          ))}
        </ul>
        <div>
          <button type="button" className="button is-warning mr-2" onClick={onPrevStep}>Go back</button>
          <button type="submit" className="button is-primary">Submit form</button>
        </div>
      </div>
    </div>
  );
}

export default Preview;