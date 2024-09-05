import styled from "styled-components";

export const Container = styled.div`
  border-top-right-radius: 28px;
  background-color: white;
  padding-top: 25px;
  padding-right: 20px;
  padding-bottom: 0;
  padding-left: 20px;
  text-align: left;
  min-height: 90vh;
  max-height: 95vh;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const LogoWrapper = styled.div`
  width: 168px;
  height: 26px;
  padding-top: 26px;
  padding-right: 20px;
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 100%;
`;

export const ManuWrapper = styled.div`
  padding-top: 50px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0; /* Set the width of the scrollbar */
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent; /* Set the color of the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    background-color: transparent; /* Set the color of the scrollbar track */
  }

  ul {
    border: none !important;
  }

  .ant-menu-title-content {
    display: flex !important;
    align-items: center !important;
    height: 56px;
    gap: 8px !important;
    font-size: 14px;
  }

  .ant-menu-item {
    height: 50px !important;
    display: flex;
    border-radius: 12px !important;
    color: #848382 !important;
  }

  .ant-menu-item:hover {
    color: white !important;
    background-color: #f7931e !important;
    transition: none !important;
    border-radius: 12px !important;
    img {
      filter: brightness(5);
    }
  }
  .ant-menu-title-content {
    transition: none !important;
  }

  .ant-menu-item-selected {
    color: white !important;
    background-color: #f7931e !important;
    border-radius: 12px !important;
  }

  .ant-menu-submenu-title {
    color: #848382 !important;
    height: 50px !important;
    border-radius: 12px !important;
    span {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    i {
      display: none;
    }
    &:hover {
      color: white !important;
      background-color: #f7931e !important;
      img {
        filter: brightness(5);
      }
    }
  }

  .ant-menu-submenu-active {
    color: white;
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  color: black;
`;
