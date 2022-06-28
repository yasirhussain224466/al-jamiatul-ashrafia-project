/* eslint-disable react/jsx-curly-newline */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useQuery } from "react-query";

import TextInput from "@/components/Input";
import Switch from "@/components/Switch";
import appService from "@/services/api/app-service";

import RoleDropDown from "../Dropdown/RoleDropDown";
import CampusDropDown from "../Select/CampusDropDown";
import NumberFormatInput from "../Input/FormatNumber";

import * as S from "./styled";

const TeamPopUp = ({ companyId, formik, title }) => {
  const { errors, handleChange, setFieldValue, values } = formik || {};
  const { data } = useQuery("getRoles", () => appService.getRoles());
  const onChange = (checked) => {
    setFieldValue("is_active", checked);
  };
  return (
    <Formik>
      <S.Company>
        <div className="title">{title}</div>
        <TextInput
          error={errors?.full_name}
          label="User Name"
          name="full_name"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values?.full_name}
        />
        <TextInput
          error={errors?.email}
          label="Email"
          name="email"
          onChange={handleChange}
          style={{ borderRadius: "3px" }}
          value={values?.email}
        />
        <NumberFormatInput
          error={errors?.phone}
          label="Phone"
          name="phone"
          setFieldValue={setFieldValue}
          style={{ borderRadius: "3px" }}
          value={values?.phone}
        />
        <div className="pd-04">
          <Switch onChange={onChange} value={values?.is_active} />
          <span style={{ marginLeft: "10px" }}>
            {values?.is_active ? "Enabled" : "Disabled"}
          </span>
        </div>
        <br />
        <RoleDropDown
          error={errors?.role}
          handleDropDownChange={(v) => setFieldValue("role", v)}
          options={Array.isArray(data) && data}
          state="User Type"
          value={values?.role}
        />
        <br />
        <CampusDropDown
          companyId={companyId}
          defaultValue={values?.campus}
          error={errors?.campus}
          isMulti
          onChange={(v) => setFieldValue("campus", v)}
          state="Campus Access"
          value={values?.campus}
        />
      </S.Company>
    </Formik>
  );
};

export default TeamPopUp;

TeamPopUp.propTypes = {
  companyId: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
