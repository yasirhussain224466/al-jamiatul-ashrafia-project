/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";

import TextInput from "@/components/Input";

import * as S from "./styled";

const Company = ({ formik, title }) => {
  const { errors, handleChange, values } = formik || {};
  return (
    <S.Company>
      <div className="title">{title}</div>
      <TextInput
        error={errors?.name}
        label="Building Name"
        name="name"
        onChange={handleChange}
        style={{ borderRadius: "3px" }}
        value={values?.name}
      />
      <TextInput
        error={errors?.name}
        label="Sequence"
        name="sequence"
        onChange={handleChange}
        style={{ borderRadius: "3px" }}
        type="Number"
        value={values?.sequence}
      />
    </S.Company>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
