import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 16px;
  .ant-btn {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.skyBlue};
    border: 1px solid ${({ theme }) => theme.colors.skyBlue};
  }
  .header {
    display: flex;
  }
  .textCompany {
  }
  .ant-tabs-tab {
    justify-content: center;
  }
  .ant-tabs {
    overflow: overlay;
    margin: 10px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.colors.skyBlue};
  }
  .ant-tabs-ink-bar {
    position: absolute;
    background: ${({ theme }) => theme.colors.skyBlue};
    pointer-events: none;
  }
  .ant-tabs-tab .ant-tabs-tab-active {
    width: 50px;
  }
`;
