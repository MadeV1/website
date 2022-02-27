import { forwardRef, InputHTMLAttributes } from 'react';
import ComponentStyles from 'styles/UI/Form/FlatInput.module.css';

interface Props {
  name: string;
  label: string;
  required: boolean;
  validationError?: string;
  submitErrors?: string[];
}

export default forwardRef<HTMLInputElement, Props & InputHTMLAttributes<unknown>>(function FlatInput(
  { name, label, type, required = false, validationError, submitErrors, ...rest },
  ref
) {
  return (
    <label htmlFor={`${name.toLowerCase()}Input`} className={ComponentStyles.label}>
      {label}
      <input
        ref={ref}
        id={`${name.toLowerCase()}Input`}
        name={name}
        type={type}
        className={`${ComponentStyles.flatInputText} ${validationError && ComponentStyles.flatInputTextError}`}
        required={required}
        {...rest}
      />
      {validationError && <p className={ComponentStyles.textError}>{validationError}</p>}
      {submitErrors && (
        <ul className={ComponentStyles.textError}>
          {submitErrors.map((err) => err && <li key={err.trim().replace(' ', '')}>{err}</li>)}
        </ul>
      )}
    </label>
  );
});
