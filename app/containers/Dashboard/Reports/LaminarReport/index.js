import React from "react";
import { Breadcrumb, Tabs } from "antd";

import Button from "@/components/Button";
import PageLayout from "@/containers/PageLayout";

import Table from "../Table";
import { ReportColumn, Report } from "../TempApi";

import * as S from "./styled";
const { TabPane } = Tabs;

const CompanyDetail = () => (
  <>
    <PageLayout>
      <S.Wrapper>
        <div>
          <div className="header">
            <div>
              <h1 className="textCompany">Laminar Report</h1>
              <div>
                <Breadcrumb>
                  <Breadcrumb.Item>Kaiser Permanente</Breadcrumb.Item>
                  <Breadcrumb.Item> Irvine</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>

            <div className="buttonp1">
              <div style={{ padding: "10px" }}>
                <Button type="link" value="DOWNLOAD" />
              </div>

              <div style={{ padding: "10px" }}>
                <Button type="primary" value="PUBLISH" />
              </div>
            </div>
          </div>
          <br />
          <div className="containerp1">
            <div className="divComp">
              <div>Report Status: Unpublished</div>
            </div>
            <div>
              <div>Room Status:</div>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div className="classStyle">
                  <div className="centerClass">2</div>
                  <div className="centerClass">Unservicable</div>
                </div>
                <div className="classStyle">
                  <div className="centerClass">4</div>
                  <div className="centerClass">Comback</div>
                </div>
                <div className="classStyle">
                  <div className="centerClass">243</div>
                  <div className="centerClass">Serviced</div>
                </div>
              </div>
            </div>
          </div>
          <br />
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
                  data={Report}
                  placeholder="Companies"
                />
              </TabPane>
              <TabPane key="3" tab="DISABLED">
                <Table
                  columns={ReportColumn}
                  data={Report}
                  placeholder="Companies"
                />
              </TabPane>
            </Tabs>
          </div>
          <div>
            <div style={{ fontSize: "20px" }}>Room Notes</div>
            <div className="roomNotes">
              <div>Room: 343</div>
              <div>Jamb: x34t3b</div>
              <div>Status: Comeback</div>
              <div>Note: We had a problem with the xyz.</div>
            </div>
          </div>
        </div>
      </S.Wrapper>
    </PageLayout>
  </>
);

export default CompanyDetail;
