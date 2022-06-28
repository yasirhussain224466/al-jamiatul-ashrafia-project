import styled from "styled-components";

export const Wrapper = styled.div`
  .ant-btn {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.skyBlue};
    border: 1px solid ${({ theme }) => theme.colors.skyBlue};
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .textCompany {
    font-size: 24px;
  }
  .ant-tabs-tab {
    width: 120px;
    justify-content: center;
  }
  .ant-tabs {
    overflow: overlay;
    margin: 10px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.skyBlue};
    font-size: 13px;
  }
  .ant-tabs-ink-bar {
    position: absolute;
    background: ${({ theme }) => theme.colors.skyBlue};
    pointer-events: none;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    background-color: ${({ theme }) => theme.colors.skyBlue};
    color: white;
  }
  .box1 {
    box-shadow: 2px 2px 9px -1px rgba(0, 0, 0, 0.92);
    -webkit-box-shadow: 2px 2px 9px -1px rgba(0, 0, 0, 0.92);
    -moz-box-shadow: 2px 2px 9px -1px rgba(0, 0, 0, 0.92);
  }
  .buttonp1 {
    display: flex;
  }
  .containerp1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .divComp {
    border: 1px solid #8a9099;
    padding: 23px;
    border-radius: 10px;
  }
  .innerdiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #8a9099;
    padding: 10px;
    border-radius: 10px;
  }
  .centerClass {
    text-align: center;
  }
  .classStyle {
    padding: 10px;
    font-size: 13px;
  }
  .roomNotes {
    font-size: 14px;
    border: 1px solid #8a9099;
    width: 30vw;
    padding: 10px;
    border-radius: 10px;
  }
`;
