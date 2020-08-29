import React, { useState } from 'react';

import Step from './Step';
import Preview from './Preview';
import validate from '../helpers/validate';

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    stepOne: {
      firstName: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'First name'
      },
      lastName: {
        value: '',
        required: true,
        type: 'input',
        placeholder: 'Last name'
      }
    },
    stepTwo: {
      email: {
        value: '',
        email: true,
        type: 'input',
        placeholder: 'Email'
      },
      password: {
        value: '',
        minLength: 6,
        type: 'input:password',
        placeholder: 'Password'
      }
    },
    stepThree: {
      gender: {
        value: '',
        required: true,
        type: 'select',
        choices: [
          { value: '', label: 'Choose gender' },
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' }
        ]
      },
      image: {
        value: {},
        required: true,
        file: true,
        fileName: 'No file chosen',
        type: 'file',
        allowedTypes: ['png', 'jpg', 'jpeg'],
        maxFileSize: 1024
      }
    }
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (step, e) => {
    e.persist();

    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [e.target.name]: {
          ...prev[step][e.target.name],
          value: e.target.value
        }
      }
    }));
  }

  const fileChangeHandler = (name, file, step) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [name]: {
          ...prev[step][name],
          value: file,
          fileName: file.name ? file.name : 'No file chosen'
        }
      }
    }));
  }

  const stepChangeHandler = (values, e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0) {
      setStep(step + 1);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('firstName', formData.stepOne.firstName.value);
    data.append('lastName', formData.stepOne.lastName.value);
    data.append('email', formData.stepTwo.email.value);
    data.append('password', formData.stepTwo.password.value);
    data.append('gender', formData.stepThree.gender.value);
    data.append('image', formData.stepThree.image.value);

    // In here you can send data to some api 
    // For example if you have some redux action: sendData(data)
  }

  return(
    <form onSubmit={submitHandler}>
      <h1 className="is-size-2 has-text-centered mb-4">Create an account</h1>
      {step === 1 && <Step 
        data={formData.stepOne}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        errors={errors}
        stepKey="stepOne"
        step={1}
      />}
      {step === 2 && <Step 
        data={formData.stepTwo}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        errors={errors}
        stepKey="stepTwo"
        onPrevStep={(step) => setStep(step)}
        step={2}
      />}
      {step === 3 && <Step 
        data={formData.stepThree}
        onChange={changeHandler}
        onStepChange={stepChangeHandler}
        onFileChange={fileChangeHandler}
        errors={errors}
        stepKey="stepThree"
        onPrevStep={(step) => setStep(step)}
        step={3}
      />}
      {step === 4 && <Preview 
        onPrevStep={() => setStep(step - 1)}
        data={[
          { label: 'First name', value: formData.stepOne.firstName.value },
          { label: 'Last name', value: formData.stepOne.lastName.value },
          { label: 'Email', value: formData.stepTwo.email.value },
          { label: 'Password', value: formData.stepTwo.password.value },
          { label: 'Gender', value: formData.stepThree.gender.value },
          { label: 'Image', value: URL.createObjectURL(formData.stepThree.image.value), image: true },
        ]}
      />}
    </form>
  );
}

export default Form;