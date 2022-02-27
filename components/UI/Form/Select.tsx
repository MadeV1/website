// OPTIONS EN PROPS
// SINON AFFICHER CHILDREN => TYPEES

import { forwardRef, ReactNode, SelectHTMLAttributes } from 'react';

interface Props {
  name: string;
  label: string;
  required: boolean;
  validationError?: string;
  submitErrors?: string[];
  children: ReactNode | ReactNode[];
}

export default forwardRef<HTMLSelectElement, Props & SelectHTMLAttributes<unknown>>(function Select(
  { name, required, label, children, ...rest },
  ref
) {
  return (
    <label htmlFor={`id-${name}`}>
      {label}
      <select id={`id-${name}`} name={name} required={required} {...rest} ref={ref}>
        {children}
      </select>
    </label>
  );
});
