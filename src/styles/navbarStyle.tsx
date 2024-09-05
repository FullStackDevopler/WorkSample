import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  z-index: 0;
  height: 83px;
  background-color: #f7931e;
  display: flex;
  justify-content: center;
  border-bottom-right-radius: 35px;
  position: sticky;
  top: 0;
  z-index: 1;
  .customeDrop {
    cursor: pointer;
  }
`;
export const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
`;

export const PageName = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const User = styled.div`
  color: white;
  width: 190px;
  height: 54px;
  display: flex;
  align-items: center;
  border-radius: 27px;
  background-color: #fa9d33;
`;

export const AdminName = styled.div`
  color: white;
  width: 100%;
  text-align: center;
`;
