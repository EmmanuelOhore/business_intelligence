"use client";

import { Field, ErrorMessage } from "formik";
import { useState } from "react";

type inputProps = {
  type: string;
  name: string;
  label: string;
  icon?: string;
  textcolor?: boolean;
  placeholder?: string;
  className?: string;
};

const Inputfield = ({
  type,
  className,
  name,
  label,
  icon,
  placeholder,
  textcolor,
}: inputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handelshowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex  w-full  flex-col gap-2 max-phoneL:gap-1">
      <label
        htmlFor="email"
        className={`${
          textcolor ? "text-black/64" : "text-black/80"
        }  font-semibold ${className} text-sm max-phoneL:text-xs max-phoneP:text-[10px]`}
      >
        {label}
      </label>
      <div className="relative">
        <Field
          type={`${showPassword ? "text" : type}`}
          name={name}
          placeholder={placeholder}
          className={` py-2 px-4 border w-full  border-black/20 rounded-md placeholder:text-sm max-phoneL:py-1.5 max-phoneL:px-2 max-phoneL:rounded max-phoneL:text-xs max-phoneL:placeholder:text-[10px] max-phoneP:text-[10px]`}
        />
        {icon && (
          <button
            type="button"
            onClick={handelshowPassword}
            className="absolute bottom-2.5 text-sm right-5 opacity-50 max-phoneL:bottom-2 max-phoneL:right-3 max-phoneL:text-xs"
          >
            <i
              className={`fa-solid  ${showPassword ? "fa-eye-slash" : icon} `}
            ></i>
          </button>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm"
      />
    </div>
  );
};

export default Inputfield;
