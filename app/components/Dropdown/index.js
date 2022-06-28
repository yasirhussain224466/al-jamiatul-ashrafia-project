import React from "react";
import { Input, Select } from "antd";

import * as S from "./styled";

const { Option } = Select;

const index = ({
  handleDropDownChange,
  isUseArrayIndex,
  number,
  options,
  placeholder,
  state,
  styles,
  title,
  value,
  ...rest
}) => (
  <>
    <S.Wrapper>
      <Input.Group compact>
        <p className="p-down">{state}</p>
        <Select
          className="select"
          defaultValue={value}
          onChange={handleDropDownChange}
          placeholder={placeholder}
          showSearch
          value={value}
          {...rest}
        >
          {options.map((currElem, ind) => (
            <Option value={isUseArrayIndex ? ind + 1 : currElem}>
              {currElem}
            </Option>
          ))}
        </Select>
      </Input.Group>
    </S.Wrapper>
  </>
);

export default index;
