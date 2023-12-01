import React from 'react';
import useFormContext from '@/hooks/userProfile/useFormContext';
import BodyType from '../bodyType';
import StylePreference from '../stylePreference';

function FormSelector() {
  const { formStep } = useFormContext();

  const formComponents = {
    0: <StylePreference />,
    1: <BodyType />,
  };

  return <div>{formComponents[formStep]}</div>;
}

export default FormSelector;
