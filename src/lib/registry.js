"use client";

import React, { useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }) {
  const sheetRef = useRef(null);

  if (!sheetRef.current) {
    sheetRef.current = new ServerStyleSheet();
  }

  useServerInsertedHTML(() => {
    const styles = sheetRef.current.getStyleElement();
    sheetRef.current.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{children}</>;
  }
  return (
    <StyleSheetManager sheet={sheetRef.current.instance}>
      {children}
    </StyleSheetManager>
  );
}
