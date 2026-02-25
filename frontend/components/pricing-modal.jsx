"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import PricingSection from "./pricing-section";

const PricingModal = ({ subscriptionTier = "free", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const canOpen = subscriptionTier === "free";

  return (
    <Dialog isOpen={isOpen} onOpenChange={canOpen ? setIsOpen : undefined}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-8 pt-4 sm:max-w-4xl">
        <DialogTitle />
        <PricingSection />
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
