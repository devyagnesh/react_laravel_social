import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSuggestedPeople } from "@/services/profile/profileService";

export const FeedRightContent = () => {
  const [suggestedAccount, setSuggestedAccount] = useState([]);

  useEffect(() => {
    async function getSuggestedAccounts() {
      const data = await getSuggestedPeople();
      setSuggestedAccount((prevData) => data.data);
    }

    getSuggestedAccounts();
  }, []);
  return (
    <div className="w-3/12 min-h-screen flex flex-col gap-2 dis hidden md:block">
      <Card className="shadow-none">
        <CardHeader className="border-b">
          <h4 className="font-bold text-primary-cts">Explore</h4>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="mt-2">
              <p className="text-sm leading-0 m-0 p-0">
                Proin sit amet quam vel nibh mattis malesuada eu sit amet augue.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">3 mins ago</span>
                <span className="text-sm text-blue-500 ">News</span>
              </div>
            </li>
            <li className="mt-4 border-t">
              <p className="text-sm leading-0 m-0 p-0">
                Proin sit amet quam vel nibh mattis malesuada eu sit amet augue.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">3 mins ago</span>
                <span className="text-sm text-blue-500 ">Politics</span>
              </div>
            </li>
            <li className="mt-4 border-t">
              <p className="text-sm leading-0 m-0 p-0">
                Proin sit amet quam vel nibh mattis malesuada eu sit amet augue.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">3 mins ago</span>
                <span className="text-sm text-blue-500 ">Economy</span>
              </div>
            </li>
            <li className="mt-4 border-t">
              <p className="text-sm leading-0 m-0 p-0">
                Proin sit amet quam vel nibh mattis malesuada eu sit amet augue.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">3 mins ago</span>
                <span className="text-sm text-blue-500 ">Sports</span>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mt-4 shadow-none">
        <CardHeader className="border-b">
          <h4 className="font-bold text-primary-cts">Suggestion for you</h4>
        </CardHeader>
        <CardContent>
          <ul>
            {suggestedAccount.map((suggestedAcc) => {
              return (
                <li key={suggestedAcc.id} className="mt-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-2 items-center justify-items-center">
                      <img
                        src={suggestedAcc.profile_img}
                        className="rounded-full w-8 h-8 object-cover"
                        alt=""
                      />
                      <p className="font-bold leading-[1]">
                        {suggestedAcc.name}
                      </p>
                    </div>
                    <p className="text-blue-500 font-semibold">Follow</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
