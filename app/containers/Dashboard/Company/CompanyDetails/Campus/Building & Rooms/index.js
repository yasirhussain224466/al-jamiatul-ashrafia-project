/* eslint-disable no-underscore-dangle */
import React from "react";
import { Breadcrumb, Collapse } from "antd";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as yup from "yup";
import { useFormik } from "formik";

import Button from "@/components/Modal/index";
import BuildingPopup from "@/components/Modal/Buildingpopup";
import Pagelayout from "@/containers/PageLayout";
import appService from "@/services/api/app-service";
import Loader from "@/components/Loader";
import NotificationStatus from "@/components/Notification";

// import { Company } from "../../../TempApi";

import BuildingComp from "./Building";
import * as S from "./styled";

const { Panel } = Collapse;

const initialValues = {
  name: "",
  sequence: "",
};

const Index = () => {
  const { id } = useParams();
  const [visible, setVisible] = React.useState("");
  const validationSchema = yup.object({
    name: yup.string().trim().required("*Building name is required"),
    sequence: yup.number().required("*sequence is required"),
  });

  const getbuildings = (campusId) => appService.getBuildings(campusId);
  const {
    data: buildindData,
    isFetching: fetchBuildingsInfo,
    isLoading: loadBuildingsInfo,
    refetch,
  } = useQuery(["getbuildings", id], () => getbuildings(id));

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      addBuilding.mutateAsync({ campus: id, ...values });
    },
  });

  const addBuilding = useMutation((data) => appService.addBuilding(data), {
    onSuccess: (data) => {
      setVisible(false);
      formik.resetForm();
      refetch();
      NotificationStatus("success", data?.message);
    },
    onError: (err) => {
      NotificationStatus("error", err?.message);
    },
  });

  const handleVisible = () => {
    setVisible(true);
  };
  const handleAddBuilding = () => {
    formik.handleSubmit();
  };

  const getParticularcampus = (campusId) =>
    appService.getParticularcampus(campusId);
  const { data: CampusData } =
    useQuery(["getParticularBuilding"], () => getParticularcampus(id), {
      keepPreviousData: true,
    }) || {};
  const breadCrumb = {
    campus: CampusData?.name,
    company: CampusData?.company?.name,
  };
  return (
    <>
      {loadBuildingsInfo || fetchBuildingsInfo ? (
        <Loader />
      ) : (
        <Pagelayout>
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
                    Buildings &#38; Rooms
                  </h1>
                  <div>
                    <Breadcrumb>
                      <Breadcrumb.Item>{breadCrumb?.company}</Breadcrumb.Item>
                      <Breadcrumb.Item>{breadCrumb.campus}</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <div>
                  <Button
                    handleClick={handleAddBuilding}
                    handleVisible={handleVisible}
                    modalContent={
                      <BuildingPopup formik={formik} title="Add Building" />
                    }
                    setVisible={setVisible}
                    title={addBuilding.isLoading ? "Adding..." : "Add Building"}
                    visible={visible}
                  />
                </div>
              </div>
              <br />
              <div>
                <Collapse defaultActiveKey={[`0`]}>
                  {buildindData?.data?.map((currElem, key) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Panel key={`${key}`} header={currElem?.name}>
                      <BuildingComp
                        breadCrumb={breadCrumb}
                        id={currElem?._id}
                      />
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </div>
          </S.Wrapper>
        </Pagelayout>
      )}
    </>
  );
};

export default Index;
