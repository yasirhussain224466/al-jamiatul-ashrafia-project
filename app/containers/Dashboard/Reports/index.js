import React from "react";
import { Tabs } from "antd";

// import Button from "@/components/Modal";
// import Content from "@/components/Modal/Companypopup";

import PageLayout from "@/containers/PageLayout";

import Table from "./Table";
import * as S from "./styled";
import { ReportColumn, Report } from "./TempApi";

const { TabPane } = Tabs;

const index = () => {
  const ActiveData = Report.filter(
    (currElem) => currElem.Status === "Completed",
  );
  const DisableData = Report.filter(
    (currElem) => currElem.Status === "Incomplete",
  );
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
                  Reports
                </h1>
              </div>
            </div>
            <div>
              <Tabs defaultActiveKey="1">
                <TabPane key="1" tab="  ALL  ">
                  <>
                    <Table
                      columns={ReportColumn}
                      data={Report}
                      placeholder="Companies"
                    />
                  </>
                </TabPane>
                <TabPane key="2" tab="ACTIVE">
                  <Table
                    columns={ReportColumn}
                    data={ActiveData}
                    placeholder="Companies"
                  />
                </TabPane>
                <TabPane key="3" tab="DISABLED">
                  <Table
                    columns={ReportColumn}
                    data={DisableData}
                    placeholder="Companies"
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

export default index;
