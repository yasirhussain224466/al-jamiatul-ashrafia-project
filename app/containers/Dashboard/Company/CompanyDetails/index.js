/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useQuery } from "react-query";

import PageLayout from "@/containers/PageLayout";
import appService from "@/services/api/app-service";
import Loader from "@/components/Loader";

import Campus from "./Campus";
import Team from "./Team";
import About from "./About";
import * as S from "./styled";

const { TabPane } = Tabs;

const CompanyDetail = () => {
  const history = useHistory();
  const [tabChangeKey, setTabChangeKey] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    status: undefined,
    search: "",
    companyId: id,
  });

  const getSingleCompany = (companyId) =>
    appService.getParticularCompany(companyId);
  const {
    data: companyInfo,
    isFetching: fetchCompanyInfo,
    isLoading: loadCompanyInfo,
    refetch: refetchCompany,
  } = useQuery(["getParticularCompany", id], () => getSingleCompany(id));
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
  const getCampusesData = (data) => appService.getCampuses(data);

  const {
    data: campusesData,
    isFetching: loadCampusesData,
    isLoading: fetchCampusesData,
    refetch: fetchCampuses,
  } = useQuery(["getCampusesData", pagination, tabChangeKey], () =>
    getCampusesData(pagination),
  ) || {};

  function callback(key) {
    setPagination({
      ...pagination,
      page: 1,
      limit: 10,
      // eslint-disable-next-line
      status: key == "2" ? true : key == "3" ? false : undefined,
    });
  }

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.append("campusStatus", pagination?.status);
    history.push({
      state: `campusStatus=${searchParams.get("campusStatus")}`,
    });
  }, [pagination]);
  return (
    <>
      <PageLayout>
        {loadCompanyInfo || fetchCompanyInfo ? (
          <Loader />
        ) : (
          <S.Wrapper>
            <div>
              <div
                className="header"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h1 className="textCompany" style={{ fontSize: "24px" }}>
                    {companyInfo?.name}
                  </h1>
                </div>
                <div />
              </div>
              <div>
                <Tabs
                  key={tabChangeKey}
                  defaultActiveKey={tabChangeKey}
                  onChange={callback}
                >
                  <TabPane key="1" tab="  CAMPUS  ">
                    <>
                      <Campus
                        campuses={
                          Array.isArray(campusesData?.data)
                            ? campusesData?.data
                            : []
                        }
                        id={id}
                        isFetching={fetchCampusesData}
                        isLoading={loadCampusesData}
                        pagination={pagination}
                        refetch={fetchCampuses}
                        setPagination={setPagination}
                        total={campusesData?.total}
                      />
                    </>
                  </TabPane>
                  <TabPane key="2" tab="TEAM">
                    <Team
                      // eslint-disable-next-line no-underscore-dangle
                      id={id}
                    />
                  </TabPane>
                  <TabPane key="3" tab="ABOUT">
                    <About
                      company={companyInfo}
                      refetchCompany={refetchCompany}
                      setTabChangeKey={setTabChangeKey}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </S.Wrapper>
        )}
      </PageLayout>
    </>
  );
};

export default CompanyDetail;
