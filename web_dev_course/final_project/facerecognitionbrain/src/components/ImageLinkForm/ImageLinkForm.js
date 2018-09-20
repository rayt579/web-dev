import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onSubmitButtonClicked, onInputChanged}) => {
  return (
    <div>
      <p className='f3' align='center'>
      {'This Magic Brain will detect faces in your pictures. Give it a try.'}
      </p>
      <div className='form center pa4 br3 shadow-5'>
        <input className='f4 pa2 w-70 center' type='text' onChange={onInputChanged}/>
        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
          onClick={onSubmitButtonClicked}>
          Detect
        </button>
      </div>
    </div>
  );
}

export default ImageLinkForm;