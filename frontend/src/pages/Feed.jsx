import React, { useEffect, useState } from "react";
import FeedLeftContent from "@/components/FeedLeftContent";
import { FeedMiddleContent } from "@/components/FeedMiddleContent";
import { FeedRightContent } from "@/components/FeedRightContent";
import "../assets/style.css";

export const Feed = () => {
  
  return (
    <div className="max-h-screen sm:mx-0 lg:mx-44">
      <div className="max-h-screen sm:gap-0 md:gap-0 lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-2">
       <FeedLeftContent />
        <FeedMiddleContent />
       <FeedRightContent />
      </div>
    </div>
  );
};
