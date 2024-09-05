import styled from "styled-components";

interface IProps {
  isActive?: boolean;
  color?: string;
}
export const TrackDetails = styled.div`
  display: flex;
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  align-items: center;

  .trackline {
    width: 700px !important;
    gap: 20px;
    display: flex;
    align-items: center;
  }
`;

export const TractLineWrapper = styled.div`
  display: flex;
  border: 1px solid;
`;

export const Line2 = styled.div<IProps>`
  width: 100%;
  flex: 100%;
  max-width: 100%;
  min-width: 350px;
  border: 1px dashed;
  border-spacing: 15px;
  border-color: ${(props) => props.color};
`;

export const Seprators = styled.img`
  width: 90%;
  padding: 30px;
  opacity: 0.7;
`;
