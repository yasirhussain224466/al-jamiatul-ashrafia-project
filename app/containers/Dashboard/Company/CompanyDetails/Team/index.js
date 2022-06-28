/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Tabs } from "antd";
import PropTypes from "prop-types";
import * as yup from "yup";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import axios from "axios";

import { TeamColumns } from "@/containers/Dashboard/Company/TempApi";
import Table from "@/containers/Dashboard/Company/Table";
import Modal from "@/components/Modal";
import TeamPopUp from "@/components/Modal/Teampopup";
import appService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";

import * as S from "./styled";

const { TabPane } = Tabs;

const initialSchema = {
  _id: "",
  full_name: "",
  email: "",
  is_active: true,
  role: "",
  campus: [],
  phone: "",
};

const Team = ({ id }) => {
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(initialSchema);
  const [value, setValue] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: undefined,
    search: "",
  });

  const fetchTeam = ({ limit = 10, page = 1, search = "", status }, _id) =>
    appService.getCompanyTeam({ page, limit, status, search }, _id);

  const {
    data: companyTeam,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ["getCompanyTeam", pagination],
    () => fetchTeam(pagination, id),
    {
      keepPreviousData: true,
    },
  );

  const validationSchema = yup.object({
    full_name: yup.string().trim().required("*user name is required"),
    email: yup.string().email().required("*email is required"),
    is_active: yup.boolean().required("*status is required"),
    role: yup.string().trim().required("*user type is required"),
    phone: yup.number().required("*phone is required"),
    campus: yup.array(
      yup.object({
        _id: yup.string().required("*campus is required"),
        name: yup.string().required("*campus name is required"),
      }),
    ),
  });

  const userMutation = useMutation((data) => appService.addUser(data));

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      userMutation.mutate(
        { ...values, company_id: id },
        {
          onSuccess: (data) => {
            setVisible(false);
            refetch();
            NotificationStatus("success", data?.message);
            resetForm();
          },
          onError: (err) => {
            NotificationStatus("error", err?.message);
          },
        },
      );
    },
  });

  const removeUserMutation = useMutation(({ id: userId }) =>
    appService.removeUser(userId),
  );

  const handleRow = (record) => {
    setInitialValues({
      campus: record?.campus,
      full_name: record?.full_name,
      is_active: record?.is_active,
      phone: record?.phone,
      _id: record?.user?._id,
      role: record?.role?._id,
      email: record?.user?.email,
    });
    setVisible(!visible);
  };

  const handleVisible = () => {
    setVisible(!visible);
    setInitialValues({ ...initialSchema, _id: "" });
  };

  const handleTabsChange = (key) => {
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      status: key === "1" ? undefined : key === "2",
    });
  };

  const addTeam = () => {
    formik.handleSubmit();
  };

  const handlePaginationChange = (pag) => {
    setPagination({
      ...pagination,
      limit: pag?.pageSize,
      page: pag?.current,
    });
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
          });
        } catch (error) {
          throw error;
        }
      } else {
        setPagination({
          ...pagination,
          search: e.target.value,
        });
      }
    }
  };

  const handleRemoveUser = () => {
    removeUserMutation.mutate(
      {
        id: formik.values._id,
      },
      {
        onSuccess: (data) => {
          NotificationStatus("success", data?.message);
          setVisible(false);
          setInitialValues({
            ...initialSchema,
            _id: "",
          });
          refetch();
        },

        onError: (err) => {
          NotificationStatus("error", err?.message);
        },
      },
    );
  };

  React.useEffect(() => {
    if (!visible) {
      setInitialValues({ ...initialSchema, _id: "" });
    }
  }, [visible]);

  return (
    <S.Wrapper>
      <Tabs
        defaultActiveKey="1"
        onChange={handleTabsChange}
        tabBarExtraContent={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Modal
            buttontitle="Add Team"
            cancelTitle={
              removeUserMutation.isLoading ? "Please wait..." : "Remove"
            }
            handleCancel={handleRemoveUser}
            handleClick={addTeam}
            handleVisible={handleVisible}
            modalContent={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <TeamPopUp
                cancelTitle="Remove"
                companyId={id}
                formik={formik}
                spaceBtw
                title={formik?.values._id ? "Update Team" : "Add Team"}
              />
            }
            name="ADD Team"
            setVisible={setVisible}
            showCancelBtn={!!formik.values._id}
            title={
              formik?.values._id
                ? userMutation.isLoading
                  ? "Updating..."
                  : "Update Team"
                : userMutation.isLoading
                ? " Adding..."
                : "Add Team"
            }
            visible={visible}
          />
        }
      >
        <TabPane key="1" tab="ALL">
          <>
            <Table
              columns={TeamColumns}
              data={companyTeam?.data}
              handleSearch={handleSearch}
              limit={pagination?.limit}
              loading={isFetching || isLoading}
              onChange={handlePaginationChange}
              onRow={(record, rowIndex) => ({
                onClick: () => handleRow(record, rowIndex),
              })}
              page={pagination?.page}
              placeholder="Team"
              total={companyTeam?.total}
              value={value}
            />
          </>
        </TabPane>
        <TabPane key="2" tab="ACTIVE">
          <Table
            columns={TeamColumns}
            data={companyTeam?.data}
            handleSearch={handleSearch}
            limit={pagination?.limit}
            loading={isFetching || isLoading}
            onChange={handlePaginationChange}
            onRow={(record, rowIndex) => ({
              onClick: () => handleRow(record, rowIndex),
            })}
            page={pagination?.page}
            placeholder="Team"
            total={companyTeam?.total}
            value={value}
          />
        </TabPane>
        <TabPane key="3" tab="DISABLE">
          <Table
            columns={TeamColumns}
            data={companyTeam?.data}
            handleSearch={handleSearch}
            limit={pagination?.limit}
            loading={isFetching || isLoading}
            onChange={handlePaginationChange}
            onRow={(record, rowIndex) => ({
              onClick: () => handleRow(record, rowIndex),
            })}
            page={pagination?.page}
            placeholder="Team"
            total={companyTeam?.total}
            value={value}
          />
        </TabPane>
      </Tabs>
    </S.Wrapper>
  );
};

export default Team;

Team.propTypes = {
  id: PropTypes.string,
};
