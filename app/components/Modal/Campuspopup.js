/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import Dropdown from "@/components/Dropdown";
import TextInput from "@/components/Input";

import * as S from "./styled";

const Company = ({ formik, title }) => {
  const { errors, handleChange, setFieldValue, values } = formik || {};
  const optionArr = [];
  for (let i = 1; i <= 365; i += 1) {
    optionArr.push(`${i} Days`);
  }

  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          error={errors?.name}
          label="Campus Name"
          name="name"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values?.name}
        />
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("laminar_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state="Laminar Compliance Period"
          value={values?.laminar_compliance_period}
        />
        <br />
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("pou_sink_and_shower_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state="POU Sink and Shower Compliance Period"
          value={values?.pou_sink_and_shower_compliance_period}
        />
        <br />
        <Dropdown
          handleDropDownChange={(v) =>
            setFieldValue("pou_ice_machine_compliance_period", v)
          }
          isUseArrayIndex
          options={optionArr}
          state="POU Ice Machine and Compliance Period"
          title={90}
          value={values?.pou_ice_machine_compliance_period}
        />
      </S.Company>
    </Formik>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
