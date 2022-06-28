import React, { useState } from "react";
import { Tabs } from "antd";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import axios from "axios";

import { CampusColumns } from "@/containers/Dashboard/Company/TempApi";
import Table from "@/containers/Dashboard/Company/Table";
import Modal from "@/components/Modal";
import Content from "@/components/Modal/Campuspopup";
import appService from "@/services/api/app-service";

import * as S from "./styled";

const { TabPane } = Tabs;

const initialValues = {
  name: "",
  laminar_compliance_period: 365,
  pou_ice_machine_compliance_period: 90,
  pou_sink_and_shower_compliance_period: 90,
};

const Campus = ({
  campuses,
  id: companyId,
  isFetching,
  isLoading,
  pagination,
  refetch,
  setPagination,
  total,
}) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = React.useState("");
  const validationSchema = yup.object({
    name: yup.string().trim().required("*name is required"),
    laminar_compliance_period: yup
      .number()
      .required("*laminar compliance period is required"),
    pou_sink_and_shower_compliance_period: yup
      .number()
      .required("*pou sink and shower compliance period is required"),
    pou_ice_machine_compliance_period: yup
      .number()
      .required("*pou sink and shower compliance period is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      addCampus.mutateAsync({ company: companyId, ...values });
    },
  });
  const addCampus = useMutation((data) => appService.addCampus(data), {
    onSuccess: () => {
      setVisible(false);
      formik.resetForm();
      refetch();
    },
  });

  const handleAddCampus = () => {
    formik.handleSubmit();
  };
  const handleVisible = () => {
    setVisible(true);
  };

  let cancelToken;
  const handleSearch = async (e) => {
    setValue(e.target.value);
    if (e.target.value.length <= 250) {
      if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }
      cancelToken = axios.CancelToken.source();

      if (e.target.value !== "") {
        // eslint-disable-next-line
        try {
          setPagination({
            ...pagination,
            search: e.target.value,
            companyId,
          });
        } catch (error) {
          throw error;
        }
      } else {
        setPagination({
          ...pagination,
          search: e.target.value,
          companyId,
        });
      }
    }
  };
  const handleTableChange = (pag, key) => {
    setPagination({
      limit: pag?.pageSize,
      page: pag?.current,
      search: value,
      companyId,

      // eslint-disable-next-line
      status: key == 2 ? true : key == 3 ? false : undefined,
      ...pag,
    });
  };

  function callback(key) {
    // eslint-disable-next-line no-console

    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      companyId,
      // eslint-disable-next-line
      status: key == 2 ? true : key == 3 ? false : undefined,
    });
  }
  return (
    <S.Wrapper>
      <Tabs
        defaultActiveKey="1"
        // eslint-disable-next-line react/jsx-no-bind
        onChange={callback}
        tabBarExtraContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Modal
            buttontitle="Add Campus"
            handleClick={handleAddCampus}
            handleVisible={handleVisible}
            modalContent={<Content formik={formik} title="Add Campus" />}
            name="ADD CAMPUS"
            setVisible={setVisible}
            title={addCampus.isLoading ? "Adding..." : "Add Campus"}
            visible={visible}
          />
        }
      >
        <TabPane key="1" tab="  ALL  ">
          <>
            <Table
              columns={CampusColumns}
              data={campuses}
              handleSearch={handleSearch}
              limit={pagination.limit}
              loading={isFetching || isLoading}
              onChange={(page) => handleTableChange(page, 1)}
              page={pagination.page}
              placeholder="Campus"
              total={total}
              value={value}
            />
          </>
        </TabPane>
        <TabPane key="2" tab="ACTIVE">
          <Table
            columns={CampusColumns}
            data={campuses}
            handleSearch={handleSearch}
            limit={pagination.limit}
            loading={isFetching || isLoading}
            onChange={(page) => handleTableChange(page, 2)}
            page={pagination.page}
            placeholder="Campus"
            total={total}
            value={value}
          />
        </TabPane>
        <TabPane key="3" tab="DISABLED">
          <Table
            columns={CampusColumns}
            data={campuses}
            handleSearch={handleSearch}
            limit={pagination.limit}
            loading={isFetching || isLoading}
            onChange={(page) => handleTableChange(page, 3)}
            page={pagination.page}
            placeholder="Campus"
            total={total}
            value={value}
          />
        </TabPane>
      </Tabs>
    </S.Wrapper>
  );
};

export default Campus;

Campus.propTypes = {
  campuses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  id: PropTypes.string,
  isFetching: PropTypes.bool,
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  pagination: PropTypes.objectOf(PropTypes.any),
  refetch: PropTypes.func,
  setPagination: PropTypes.func,
  total: PropTypes.number,
};
Campus.defaultProps = {
  campuses: [],
};
