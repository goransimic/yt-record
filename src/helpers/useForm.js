import { useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return { ...state, values: action.payload };
    case 'SET_TOUCHED':
      return { ...state, touched: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'SET_FIELD_VALUE':
      return { ...state, values: { ...state.values, ...action.payload } };
    case 'SET_FIELD_TOUCHED':
      return { ...state, touched: { ...state.touched, ...action.payload } };
    case 'SET_FIELD_ERROR':
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case 'SET_IS_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
};

export const useForm = (initialValues, validate, callback) => {
  const [state, dispatch] = useReducer(reducer, {
    values: { ...initialValues },
    touched: {},
    errors: {},
    isSubmitting: false
  });

  const setValues = fields => dispatch({ type: 'SET_VALUES', payload: fields });

  const setTouched = fields => dispatch({ type: 'SET_TOUCHED', payload: fields });

  const setErrors = fields => dispatch({ type: 'SET_ERRORS', payload: fields });

  const setFieldValue = (name, value) =>
    dispatch({ type: 'SET_FIELD_VALUE', payload: { [name]: value } });

  const setFieldTouched = (name, isTouched = true) =>
    dispatch({ type: 'SET_FIELD_TOUCHED', payload: { [name]: isTouched } });

  const setFieldError = (name, errorMsg) =>
    dispatch({ type: 'SET_FIELD_ERROR', payload: { [name]: errorMsg } });

  const setIsSubmitting = isSubmitting =>
    dispatch({ type: 'SET_IS_SUBMITTING', payload: isSubmitting });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFieldValue(name, type === 'checkbox' ? checked : value);
  };

  const handleBlur = event => setFieldTouched(event.target.name);

  const handleReset = event => {
    event.preventDefault();
    setIsSubmitting(false);
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const handleSubmit = event => {
    event.preventDefault();
    setIsSubmitting(true);

    const touched = {};
    Object.keys(initialValues).forEach(index => {
      touched[index] = true;
    });

    setTouched(touched);
    setErrors(validate(state.values));
  };

  useEffect(() => {
    if (!state.isSubmitting) setErrors(validate(state.values));
  }, [state.values, state.touched]);

  useEffect(() => {
    if (state.isSubmitting)
      if (Object.keys(state.errors).length === 0) callback();
      else setIsSubmitting(false);
  }, [state.errors]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
    setValues,
    setTouched,
    setErrors,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setIsSubmitting
  };
};
