/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import PropTypes from "prop-types";

import Modal from "@/components/Modal";
import appService from "@/services/api/app-service";
import RoomPopup from "@/components/Modal/Roompopup";

import Table from "../../../../Table";
import { Building } from "../../../../TempApi";

import * as S from "./styled";

const { TabPane } = Tabs;

const Index = ({ breadCrumb, id }) => {
  const [key, setKey] = useState();
  const [rowData, setRowData] = useState();
  const [visible, setVisible] = React.useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    departmentId: undefined,
    search: "",
    BuildingId: id,
  });

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
  const getRooms = (building_id) => appService.getBuildingRooms(building_id);

  const {
    data: roomData,
    isFetching: fetchRoomInfo,
    isLoading: loadRoomInfo,
  } = useQuery(["getBuildingRooms", pagination], () => getRooms(pagination)) ||
  {};
  const getParticularBuilding = (building_id) =>
    appService.getParticularBuilding(building_id);
  const { data: buildingData } =
    useQuery(
      ["getParticularBuilding", pagination],
      () => getParticularBuilding(id),
      {
        keepPreviousData: true,
      },
    ) || {};
  useEffect(() => {
    setPagination({
      ...pagination,
      departmentId: key === "" ? "" : key,
    });
  }, [key]);

  const handleTableChange = (pag, Tabkey, keyValue) => {
    setPagination({
      ...pagination,
      limit: pag?.pageSize,
      page: pag?.current,
      search: value,
      departmentId: keyValue ? (keyValue === 1 ? "" : Tabkey) : Tabkey,
    });
  };
  const handleVisible = () => {
    setVisible(true);
  };
  const handleRow = (record) => {
    setRowData(record);
    setVisible(!visible);
  };

  return (
    <>
      <S.Wrapper>
        <Tabs
          onChange={(Tabkey) => {
            setKey(Tabkey);
          }}
          tabBarExtraContent={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <Modal
              cancelTitle="Exit"
              handleVisible={handleVisible}
              modalContent={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <RoomPopup
                  breadCrumb={breadCrumb}
                  rowData={rowData}
                  title="Room Photos"
                />
              }
              name="Room Photos"
              setVisible={setVisible}
              visible={visible}
              width={500}
            />
          }
        >
          <TabPane key="" tab="  ALL  ">
            <>
              <Table
                columns={Building}
                data={roomData?.data}
                handleSearch={handleSearch}
                limit={pagination.limit}
                loading={fetchRoomInfo || loadRoomInfo}
                onChange={(page) => handleTableChange(page, key, 1)}
                onRow={(record, rowIndex) => ({
                  onClick: () => handleRow(record, rowIndex),
                })}
                page={pagination.page}
                placeholder="Rooms"
                total={roomData?.total}
                value={value}
              />
            </>
          </TabPane>
          {buildingData?.no_of_departments?.map((currElem) => (
            <>
              <TabPane key={currElem?._id} tab={`${currElem.name}`}>
                <>
                  <Table
                    columns={Building}
                    data={roomData?.data}
                    handleSearch={handleSearch}
                    limit={pagination.limit}
                    loading={fetchRoomInfo || loadRoomInfo}
                    onChange={(page) => handleTableChange(page, key)}
                    page={pagination.page}
                    placeholder="Rooms"
                    total={roomData?.total}
                    value={value}
                  />
                </>
              </TabPane>
            </>
          ))}
        </Tabs>
      </S.Wrapper>
    </>
  );
};

export default Index;
Index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  breadCrumb: PropTypes.objectOf(PropTypes.any),
  id: PropTypes.string,
};
