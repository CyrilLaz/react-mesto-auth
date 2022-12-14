import { useState, useCallback } from 'react';

export function useFormValidator() {
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleValidForm = (event) => {
    const target = event.target;
    const name = target.name;
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsButtonDisabled(!target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newErrors = {}, newIsButtonDisabled = true) => {
      setErrors(newErrors);
      setIsButtonDisabled(newIsButtonDisabled);
    },
    [setErrors, setIsButtonDisabled]
  );

  const toggleButtonDisabling = useCallback(
    (state) => {
      setIsButtonDisabled(state);
    },
    [setIsButtonDisabled]
  );
  
  return [
    handleValidForm,
    errors,
    isButtonDisabled,
    resetForm,
    toggleButtonDisabling,
  ];
}
