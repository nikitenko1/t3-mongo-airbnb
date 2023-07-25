"use client";

import React, { useState, useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: IProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
