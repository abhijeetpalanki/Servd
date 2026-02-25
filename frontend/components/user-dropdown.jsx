"use client";

import { UserButton } from "@clerk/nextjs";
import { Cookie, Refrigerator } from "lucide-react";

const UserDropdown = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Link
          label="My Recipes"
          labelIcon={<Cookie className="w-4 h-4" />}
          href="/recipes"
        />
        <UserButton.Link
          label="My Pantry"
          labelIcon={<Refrigerator className="w-4 h-4" />}
          href="/pantry"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserDropdown;
