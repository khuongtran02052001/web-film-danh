import styled from "@emotion/styled";
import React from "react";

const FooterContainer = styled("div")(({ theme }) => ({
  backgroundColor: "black",
  padding: "10px",
  marginTop: "auto",

  "& p": {
    textAlign: "center",
    color: "white",
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <p>
        Copyright 2022 Nguyen Cong Danh Licensed under the Apache License,
        Version 2.0.
      </p>
    </FooterContainer>
  );
};

export default Footer;
