/* eslint-disable consistent-return */
import React from "react";
import { Table as AntDTable } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

import * as S from "./styled";

const Table = styled(AntDTable)`
  ${(props) => {
    const onRowImplementation = props.onRow && props.onRow({});
    if (onRowImplementation?.onClick) {
      return `
        tbody tr:hover {
          cursor: pointer;
        }
        `;
    }
  }}
`;
const TableComponent = ({
  columns,
  dataSource,
  limit,
  loading,
  onChange,
  onRow,
  page,
  total,
}) => (
  <>
    <S.Wrapper>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        onRow={onRow}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          showSizeChanger: false,
        }}
        size="middle"
      />
    </S.Wrapper>
  </>
);

export default TableComponent;

TableComponent.propTypes = {
  columns: PropTypes.arrayOf,
  dataSource: PropTypes.arrayOf,
  limit: PropTypes.number,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  onRow: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number,
};
