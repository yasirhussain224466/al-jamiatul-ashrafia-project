import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import TableComponent from "@/components/Table";

import * as S from "./styled";

const Table = ({ columns, data, placeholder }) => (
  <>
    <S.Wrapper>
      <div>
        <Input
          placeholder={`Search ${placeholder}`}
          prefix={<SearchOutlined style={{ paddingRight: "20px" }} />}
          size="large"
          style={{ width: "30vw", margin: "20px 20px 20px 0px" }}
        />
        <TableComponent columns={columns} dataSource={data} />
      </div>
    </S.Wrapper>
  </>
);

export default Table;
Table.propTypes = {
  columns: PropTypes.arrayOf,
  data: PropTypes.arrayOf,
  placeholder: PropTypes.string,
};
