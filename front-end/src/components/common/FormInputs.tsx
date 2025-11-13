"use client";

import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { IMaskInput } from "react-imask";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";

interface MuiInputProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

// Input de Texto (Nome, Email)
interface TextInputProps extends MuiInputProps {
  helperText?: React.ReactNode;
  type?: "text" | "email";
}

export const MuiTextInput = ({
  name,
  label,
  control,
  error,
  helperText,
  type = "text",
}: TextInputProps) => (
  <FormControl fullWidth error={!!error}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          type={type}
          id={name}
          label={label}
          error={!!error}
        />
      )}
    />
    {error ? (
      <FormHelperText>
        {typeof error.message === "string" ? error.message : ""}
      </FormHelperText>
    ) : (
      helperText && <FormHelperText>{helperText}</FormHelperText>
    )}
  </FormControl>
);

// Input com Máscara (CPF, Telefone, Ano)
interface MaskedInputAdapterProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const MaskedInputAdapter = React.forwardRef<
  HTMLElement,
  MaskedInputAdapterProps
>(function MaskedInputAdapter(props, ref) {
  const { onChange, mask, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      onAccept={(value: any) =>
        onChange({ target: { name: props.name, value } })
      }
      inputRef={ref as React.RefObject<HTMLInputElement>}
      overwrite
    />
  );
});

interface MaskedInputProps extends MuiInputProps {
  mask: string;
}

export const MuiMaskedInput = ({
  name,
  label,
  mask,
  control,
  error,
}: MaskedInputProps) => (
  <FormControl fullWidth error={!!error}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          error={!!error}
          slotProps={{
            input: {
              inputComponent: MaskedInputAdapter as any,
              inputProps: {
                mask: mask,
              },
            },
          }}
        />
      )}
    />
    {error && (
      <FormHelperText>
        {typeof error.message === "string" ? error.message : ""}
      </FormHelperText>
    )}
  </FormControl>
);

//  Data
export const MuiDateInput = ({
  name,
  label,
  control,
  error,
}: MuiInputProps) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={
              (newValue: Dayjs | null) =>
                field.onChange(newValue ? newValue.toDate() : null) // ✅ sempre envia Date | null
            }
            slotProps={{
              textField: {
                error: !!error,
                id: name,
              },
            }}
          />
        )}
      />
      {error && (
        <FormHelperText>
          {typeof error.message === "string" ? error.message : ""}
        </FormHelperText>
      )}
    </FormControl>
  </LocalizationProvider>
);

// Checkbox
interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  control: Control<any>;
  error?: FieldError;
}

export const MuiCheckbox = ({ name, label, control, error }: CheckboxProps) => (
  <FormControl error={!!error}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={field.onChange}
            />
          }
          label={label}
        />
      )}
    />
    {error && <FormHelperText>{error.message}</FormHelperText>}
  </FormControl>
);
