/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

import Modal from "@/components/Modal";
import CompanyPopUp from "@/components/Modal/Companypopup";
import PageLayout from "@/containers/PageLayout";
import appService from "@/services/api/app-service";

import Table from "./Table";
import * as S from "./styled";
import { columns } from "./TempApi";

const { TabPane } = Tabs;

const schema = {
  name: "",
  address: "",
  secondary_address: "",
  city: "",
  state: "",
  zip: "",
  status: true,
  laminar_compliance_days: "",
  pou_compliance_days: "",
};

const Index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [companyData, setCompanyData] = useState(false);
  const [tabChangeKey, setTabChangeKey] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: undefined,
    search: "",
  });
  useEffect(() => {
    const { state } = location;

    const status = String(state).split("=")[1];

    if (status === "undefined") {
      setTabChangeKey("1");
      setPagination({
        ...pagination,
        status: undefined,
      });
    } else if (status === "true") {
      setTabChangeKey("2");
      setPagination({
        ...pagination,
        status: true,
      });
    } else if (status === "false") {
      setTabChangeKey("3");
      setPagination({
        ...pagination,
        status: false,
      });
    }
  }, []);
  const fetchAllCompany = ({ limit = 10, page = 1, search = "", status }) =>
    appService.getCompanies({ page, limit, status, search });

  const [value, setValue] = React.useState("");
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

  const { isFetching, isLoading, refetch } = useQuery(
    ["companies", pagination, tabChangeKey],
    () => fetchAllCompany(pagination),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setCompanyData(data);
      },
    },
  );

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
    initialValues: schema,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: (values) => {
      addCompany.mutateAsync(values);
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("status", pagination?.status);
    history.push({
      state: `status=${searchParams.get("status")}`,
    });
  }, [pagination]);
  function callback(key) {
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      // eslint-disable-next-line
      status: key == 2 ? true : key == 3 ? false : undefined,
    });
    refetch();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addCompany = useMutation(
    "addCompany",
    (data) => appService.addCompany(data),
    {
      onSuccess: () => {
        setVisible(false);
        formik.handleReset();
        refetch();
      },
    },
  );

  const handleTableChange = (pag, key) => {
    setPagination({
      limit: pag?.pageSize,
      page: pag?.current,
      search: value,

      // eslint-disable-next-line
      status: key === 2 ? true : key === 3 ? false : undefined,
      ...pag,
    });
  };

  const options = ["hello ", "World"];
  const handleAddCompany = () => {
    formik.handleSubmit();
  };

  const handleVisible = () => {
    setVisible(true);
  };
  return (
    <>
      <PageLayout>
        <S.Wrapper>
          <div>
            <div
              className="header"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <h1 className="textCompany" style={{ fontSize: "24px" }}>
                  Companies
                </h1>
              </div>
              <div>
                <Modal
                  buttontitle="Add Company"
                  dropOptions={options}
                  handleClick={handleAddCompany}
                  handleVisible={handleVisible}
                  modalContent={
                    <CompanyPopUp formik={formik} title="Add Company" />
                  }
                  name="ADD COMPANY"
                  setVisible={setVisible}
                  title={addCompany.isLoading ? "Adding..." : "Add Company"}
                  visible={visible}
                />
              </div>
            </div>
            <div>
              <Tabs
                key={tabChangeKey}
                defaultActiveKey={tabChangeKey}
                onChange={callback}
              >
                <TabPane key="1" tab="  ALL  ">
                  <>
                    <Table
                      columns={columns}
                      data={companyData?.data}
                      handleSearch={handleSearch}
                      limit={pagination.limit}
                      loading={isFetching || isLoading}
                      onChange={(page) => handleTableChange(page, 1)}
                      page={pagination.page}
                      placeholder="Companies"
                      total={companyData?.total}
                      value={value}
                    />
                  </>
                </TabPane>
                <TabPane key="2" tab="ACTIVE">
                  <Table
                    columns={columns}
                    data={companyData?.data}
                    handleSearch={handleSearch}
                    limit={pagination.limit}
                    loading={isFetching || isLoading}
                    onChange={(page) => handleTableChange(page, 2)}
                    page={pagination.page}
                    placeholder="Companies"
                    total={companyData?.total}
                    value={value}
                  />
                </TabPane>
                <TabPane key="3" tab="DISABLED">
                  <Table
                    columns={columns}
                    data={companyData?.data}
                    handleSearch={handleSearch}
                    limit={pagination.limit}
                    loading={isFetching || isLoading}
                    onChange={(page) => handleTableChange(page, 3)}
                    page={pagination.page}
                    placeholder="Companies"
                    total={companyData?.total}
                    value={value}
                  />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </S.Wrapper>
      </PageLayout>
    </>
  );
};

export default Index;
