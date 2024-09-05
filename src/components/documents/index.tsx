import {
  DocsWrap,
  DocumentsWrapper,
  DocumnetsContainer,
  PdfDetail,
  PdfWrapper,
  Size,
  Type,
} from "styles/commonStyle";
import { Icon } from "styles/pages/userManagement";
import pdficon from "assets/images/pdf.png";
import viewIcon from "assets/images/view.png";
import { TableTitle } from "styles/dashboard";

export const Documents = () => {
  return (
    <DocumentsWrapper>
      <TableTitle className="doc">Documents</TableTitle>
      <DocumnetsContainer>
        {new Array(5).fill(null).map((item) => (
          <DocsWrap>
            <PdfWrapper>
              <Icon src={pdficon} className="pdf" />
              <PdfDetail>
                <Type>Pdf</Type>
                <Size>2.5kb/ 1.3Kb Format : pdf</Size>
              </PdfDetail>
            </PdfWrapper>
            <Icon src={viewIcon} />
          </DocsWrap>
        ))}
      </DocumnetsContainer>
    </DocumentsWrapper>
  );
};
