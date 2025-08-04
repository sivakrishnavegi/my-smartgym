import Header from "@/core/components/Header/Header";
import React from "react";

const AuthPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AuthPageLayout;
