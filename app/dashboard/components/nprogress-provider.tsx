"use client";

import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

type props = {
  children: React.ReactNode;
};

const NProgressBarProvider = ({ children }: props) => {
  return (
    <>
      <ProgressBar color="#F97316" />
      {children}
    </>
  );
};

export default NProgressBarProvider;
