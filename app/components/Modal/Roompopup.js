import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Col, Row } from "antd";
import moment from "moment";

import Dropdown from "@/components/Dropdown";
import Carousel from "@/components/Carousel";

import * as S from "./styled";

const Company = ({ breadCrumb, rowData, title }) => {
  const [values, setValues] = React.useState("Laminar");

  const lastDate = moment(`${rowData?.last_service_laminar}`).format(
    "DD-MM-YYYY",
  );
  return (
    <S.Room>
      <div className="title">{title}</div>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>{breadCrumb?.company}</Breadcrumb.Item>
          <Breadcrumb.Item>{breadCrumb?.campus}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <br />
      <p>
        Room
        {`: ${rowData.room_no ? rowData.room_no : "-"}`}
      </p>
      <p>
        Jamb
        {`: ${rowData?.jamb_id}`}
      </p>
      <br />
      <p>
        Last:
        {` ${lastDate}`}
      </p>
      <p>By: Richard M</p>
      <p>
        Exp In
        {`: ${10} days`}
      </p>
      <br />
      <Row>
        <Col span={9}>
          <Dropdown
            handleDropDownChange={(v) => {
              setValues(v);
            }}
            isUseArrayIndex
            options={["Laminar", "POU", "Ice Machine"]}
            state="Report Type"
            value={values}
          />
        </Col>
      </Row>
      <br />
      <Row className="row">
        <Col span={10}>
          <div className="beforeAfter">
            <p>After</p>
          </div>
          <Carousel />
        </Col>
        <Col span={10}>
          <div className="beforeAfter">
            <p>before</p>
          </div>
          <Carousel />
        </Col>
      </Row>
    </S.Room>
  );
};

export default Company;

Company.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  breadCrumb: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  rowData: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string,
};
