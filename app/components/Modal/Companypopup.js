import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import TextInput from "@/components/Input";
import Switch from "@/components/Switch";
import Dropdown from "@/components/Dropdown";

import { optionState } from "./Contant";
import * as S from "./styled";

const Company = ({ formik, title }) => {
  const { errors, handleChange, setFieldValue, values } = formik || {};

  const onChange = (checked) => {
    setFieldValue("status", checked);
  };

  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          error={errors.name}
          label="Company Name"
          name="name"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values.name}
        />
        <TextInput
          error={errors.address}
          label="Address 1"
          name="address"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values.address}
        />
        <TextInput
          label="Address 2"
          name="secondary_address"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values.secondary_address}
        />
        <TextInput
          error={errors.city}
          label="City"
          name="city"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values.city}
        />
        <div>
          <div className="md-04">
            <div className="nd-04">
              {/* <TextInput
                error={errors.state}
                label="State"
                name="state"
                onChange={handleChange}
                placeholder="State"
                value={values.state}
              /> */}
              <Dropdown
                handleDropDownChange={(e) => setFieldValue("state", e)}
                options={optionState}
                placeholder="State"
                state="State"
                value={values?.state}
              />
            </div>
            <div className="paddingtop">
              <TextInput
                error={errors.zip}
                label="Zip"
                name="zip"
                onChange={handleChange}
                style={{ borderRadius: "3px" }}
                value={values.zip}
              />
            </div>
          </div>
        </div>
        <div className="pd-04">
          <Switch onChange={onChange} />
          <span style={{ marginLeft: "10px" }}>
            {values.status ? "Enabled" : "Disabled"}
          </span>
        </div>
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
