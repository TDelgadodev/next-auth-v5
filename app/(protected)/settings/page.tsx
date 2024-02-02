"use client";
import { logout } from "@/actions/logout";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <h1>Settings Page</h1>
    </div>
  );
};

export default SettingsPage;
