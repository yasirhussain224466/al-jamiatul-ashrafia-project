/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import { useMutation } from "react-query";
import * as yup from "yup";
import { useFormik, Formik } from "formik";

import TextInput from "@/components/Input";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import appService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";
import Dropdown from "@/components/Dropdown";
import { optionState } from "@/components/Modal/Contant";

import * as S from "./styled";

const schema = {
  name: "",
  address: "",
  secondary_address: "",
  city: "",
  state: "",
  zip: "",
  status: true,
};

const About = ({ company, refetchCompany, setTabChangeKey, title }) => {
  const [initialValues, setInitialValues] = useState(schema);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const updateCompany = useMutation((data) => appService.updateCompany(data), {
    onSuccess: (data) => {
      NotificationStatus("success", data?.message);
      refetchCompany();
    },
    onError: (err) => {
      NotificationStatus("err", err?.message);
    },
  });

  useEffect(() => {
    setInitialValues(company || schema);
  }, []);

  const validationSchema = yup.object({
    name: yup.string().trim().required("*name is required"),
    address: yup.string().trim().required("*address is required"),
    secondary_address: yup.string(),
    city: yup.string().trim().required("*city is required"),
    state: yup.string().trim().required("*state is required"),
    zip: yup.number().required("*zip is required"),
    status: yup.boolean(),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-underscore-dangle
      updateCompany.mutateAsync(
        { companyId: company?._id, ...values },
        {
          onSuccess: () => {
            setTabChangeKey("3");
          },
        },
      );
    },
  });

  const { errors, handleChange, handleSubmit, setFieldValue, values } =
    formik || {};
  const onChange = (checked) => {
    setFieldValue("status", checked);
  };
  return (
    <Formik>
      <Row>
        <Col span={9}>
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
              error={errors.secondary_address}
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
                  <Dropdown
                    handleDropDownChange={(e) => setFieldValue("state", e)}
                    options={optionState}
                    placeholder="State"
                    state="State"
                    value={values?.state}
                  />
                </div>
                <div className="pd-top">
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
              <Switch onChange={onChange} value={values?.status} />
              <span style={{ marginLeft: "10px" }}>
                {values.status ? "Enabled" : "Disabled"}
              </span>
            </div>

            <br />
            <Button
              onClick={handleSubmit}
              type="primary"
              value={updateCompany.isLoading ? "Updating..." : "Save"}
            />
          </S.Company>
        </Col>
      </Row>
    </Formik>
  );
};

export default About;

About.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  company: PropTypes.objectOf(PropTypes.any),
  refetchCompany: PropTypes.func,
  setTabChangeKey: PropTypes.func,
  title: PropTypes.string,
};
