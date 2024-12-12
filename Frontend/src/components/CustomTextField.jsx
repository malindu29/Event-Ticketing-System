import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';

const CustomTextField = ({
  name,
  control,
  label,
  required,
  type,
  placeholder = "",
  variant = "outlined",
  disabled = false,
  InputProps = {}, 
  value, 
  onChange, 
  multiline = false, 
  rows, 
}) => {

  const [error,] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
      }}
    >
      {label && (
        <Typography 
          variant="subtitle2" 
          fontWeight={400} 
          color="#000" 
          sx={{ fontSize: '0.875rem' }}
        >
          {label} {required && <Typography component="span" color="error">*</Typography>}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder={placeholder}
            type={type}
            variant={variant}
            fullWidth
            error={!!error}
            helperText={error?.message}
            disabled={disabled}
            InputProps={InputProps}
            value={value !== undefined ? value : field.value} 
            onChange={(e) => {
              field.onChange(e); 
              if (onChange) {
                onChange(e); 
              }
            }}
            multiline={multiline}
            rows={rows}
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: "8px",
                mt: label ? 1 : 0,
                color: "black",
                height: '36px',
                width: '500px',
                fontSize: '0.875rem',
              },
              "& .MuiInputLabel-root": {
                color: "#000000",
              },
              "& .MuiFormHelperText-root": {
                color: "black",
              },
              "& .MuiInputBase-input": {
                height: "10px",
              },
            }}
            InputLabelProps={{
              style: { color: "#000000" },
            }}
          />
        )}
      />
      {error && (
        <Typography color="error" sx={{ fontSize: "0.75rem", marginTop: "4px" }}>
            {error}
        </Typography>
      )}
    </Box>
  );
};
CustomTextField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  InputProps: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
};

export default CustomTextField;