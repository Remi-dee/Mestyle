import React from 'react';
import useFormData from '../../../../hooks/userProfile/userForm/useFormData';
import BodyType from './bodyType';
import StylePreference from './stylePreference';

function FormSelector() {
  const { formStep } = useFormData();

  const formComponents = {
    0: <StylePreference />,
    1: <BodyType />,
  };

  return <div>{formComponents[formStep]}</div>;
}

export default FormSelector;
