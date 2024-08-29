import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange }) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

export default FormInput;