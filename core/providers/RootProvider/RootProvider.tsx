import React from "react";
import AppThemeProvider from "../AppThemeProvider";

const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AppThemeProvider>{children}</AppThemeProvider>
        
    </div>
  );
};

export default RootProvider;
