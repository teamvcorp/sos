"use client";

import { useEffect, useState } from "react";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiSpeedometer } from "react-icons/pi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import style from "./components.module.css";
import { Lilita_One } from "next/font/google";
import { FaEdit } from "react-icons/fa";

const lilita = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
});

interface PresentMeterProps {
  user?: ExtendedUser | any;
  label: string;
}

interface Present {
  id: string;
  name: string;
  imageId: string | null; // Allow imageId to be null
  retailer: string;
  retailerId: string;
  retailCost: number;
  wholesaleCost: number;
  onHand: number;
}

export const PresentCard = ({ user, label }: PresentMeterProps) => {
  const [presents, setPresents] = useState<Present[]>([]);

  useEffect(() => {
    const fetchPresents = async () => {
      if (user.presentsId && user.presentsId.length > 0) {
        try {
          const response = await fetch("/api/presents", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ presentsId: user.presentsId }), // Send presentsId to API
          });

          // Check if the response is ok (status is 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          // Check if the response body contains any content
          const responseText = await response.text();
          if (!responseText) {
            throw new Error("Empty response from server");
          }

          // Parse the JSON if the response body is not empty
          const presentsData = JSON.parse(responseText);
          setPresents(presentsData || []); // Set the state with fetched data
        } catch (error) {
          console.error("Error fetching presents:", error);
        }
      }
    };

    fetchPresents();
  }, [user.presentsId]);
console.log(user.presentsId)
  return (
    <Card className="flex flex-col w-[55%] m-4 bg-santa-pink text-2xl text-white">
      <CardHeader className="flex self-center">
        <h3 className={cn(`uppercase ${lilita.className}`)}>
          {user.name} Presents
        </h3>
      </CardHeader>
      <CardContent
        // Whole Presents card below header/white space for presents
        className={cn(
          `flex flex-col bg-white h-2/5 space-y-4 ${style.meterContainer}`
        )}
      >
        {presents.length > 0 ? (
          <div className="flex flex-wrap justify-start space-x-4">
            {presents.map((present, index) => (
              <div
                // presents image div
                className="flex items-center justify-around "
                key={index}
              >
                {present.imageId ? (
                  <Image
                    className="mx-3"
                    src={`${present.imageId}`}
                    alt={present.name}
                    width={125} // Specify width
                    height={50} // Specify height
                  />
                ) : (
                  // if no presents in list
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">No image available</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No presents available.</p>
        )}

        <div className="flex justify-around items-center pt-5">
          {/* presents in list */}
          <div className="flex flex-col items-center">
            <p>Gifts in List</p>
            <h2 className={`${lilita.className} text-4xl font-bold text-white`}>
              {user.presentsId.length}
            </h2>
          </div>

          {/* edit list button */}
          <Button  
          variant={"darkblue"}
          size='lg'
          >
            <FaEdit className="mr-2" />
            Edit List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
