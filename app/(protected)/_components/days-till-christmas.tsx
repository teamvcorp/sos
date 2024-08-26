// app/DaysUntilChristmas.tsx
import { FC } from "react";

const calculateDaysUntilChristmas = (): number => {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25); // December 25

  if (today > christmas) {
    // If today is after Christmas, calculate for next year
    christmas.setFullYear(today.getFullYear() + 1);
  }

  const oneDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
  return Math.ceil((christmas.getTime() - today.getTime()) / oneDay);
};

const DaysUntilChristmas: FC = () => {
  const daysUntilChristmas = calculateDaysUntilChristmas();

  return (
   
      <h1 className="text-2xl font-bold uppercase text-white mt-2">
        {daysUntilChristmas} Days Until Christmas
      </h1>
  
  );
};

export default DaysUntilChristmas;
