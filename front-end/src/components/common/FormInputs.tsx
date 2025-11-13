"use client";

import {
  Control,
  Controller,
  FieldError,
  UseFormRegister,
} from "react-hook-form";
import { IMaskInput } from "react-imask";

const inputClasses =
  "w-full h-14 px-4 text-base text-gray-900 placeholder:text-gray-900/60 border border-gray-300 rounded focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
const errorInputClasses =
  inputClasses + " border-red-500 focus:border-red-500 focus:ring-red-500";
const errorTextClasses = "px-4 pt-1 text-xs text-red-500";

interface FormInputProps {
  name: string;
  label: string;
  error?: FieldError;
  register: UseFormRegister<any>;
}

interface TextInputProps extends FormInputProps {
  helperText?: string;
  type?: "text" | "email";
}

export const TextInput = ({
  name,
  label,
  register,
  error,
  helperText,
  type = "text",
}: TextInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={label}
        className={error ? errorInputClasses : inputClasses}
        {...register(name)}
      />
      {error ? (
        <span className={errorTextClasses}>{error.message}</span>
      ) : (
        helperText && (
          <span className="px-4 pt-1 text-xs text-gray-900/70">
            {helperText}
          </span>
        )
      )}
    </div>
  );
};

interface MaskedInputProps {
  name: string;
  label: string;
  mask: string;
  error?: FieldError;
  control: Control<any>;
}

export const MaskedInput = ({
  name,
  label,
  mask,
  control,
  error,
}: MaskedInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IMaskInput
            mask={mask}
            id={name}
            placeholder={label}
            className={error ? errorInputClasses : inputClasses}
            value={field.value}
            onAccept={(value: any) => field.onChange(value)}
            onBlur={field.onBlur}
          />
        )}
      />
      {error && <span className={errorTextClasses}>{error.message}</span>}
    </div>
  );
};

interface CheckboxInputProps {
  name: string;
  label: React.ReactNode;
  error?: FieldError;
  register: UseFormRegister<any>;
}

export const CheckboxInput = ({
  name,
  label,
  register,
  error,
}: CheckboxInputProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={name}
          {...register(name)}
          className="mt-1 h-5 w-5 shrink-0 appearance-none rounded border border-gray-500 checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor={name}
          className="text-base font-medium text-gray-900 cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error && (
        <span className="text-xs text-red-500 ml-8">{error.message}</span>
      )}
    </div>
  );
};
