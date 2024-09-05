import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import { PropsWithChildren, ReactNode } from "react";
import {
  Container,
  MainWrap,
  PageContainer,
  SideWrap,
  Wrapper,
} from "styles/adminLayoutStyle";

const AdminLayout = ({
  children,
}: PropsWithChildren<{ children: ReactNode }>) => (
  <Container>
    <Wrapper>
      <MainWrap>
        <SideWrap>
          <Sidebar />
        </SideWrap>
        <PageContainer>
          <Navbar />
          {children}
        </PageContainer>
      </MainWrap>
    </Wrapper>
  </Container>
);
export default AdminLayout;
