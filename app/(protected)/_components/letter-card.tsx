import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiSpeedometer } from "react-icons/pi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import style from "./components.module.css";
import { Lilita_One }from 'next/font/google'

const lilita = Lilita_One({
    weight: ["400"],
    subsets: ['latin'],
  });

interface LetterMeterProps {
  user?: ExtendedUser | any;
  label: string;
}
export const LetterCard = ({ user, label }: LetterMeterProps) => {
  return (
    <Card className='flex flex-col justify-center items-center w-[45%] m-4 bg-santa-green text-2xl text-white'>
      <CardHeader className="flex items-center justify-center w-full">
        <h3 className={cn(`${lilita.className} uppercase`)}>My Letters to Santa</h3>
      </CardHeader>
      <CardContent className={cn(`flex flex-row  items-center justify-center w-full ${style.meterContainer}`)}>
        <div className={style.image}>
        <Image src='/mailbox.png' alt='naughty nice meter' width='100' height='10'/>
        </div>
        <div className={cn(`text-center ${style.meterColumn}`)}>
        <p className='text-sm'>You have</p>
        <span>{user?.magicPoints}</span>
        <p className="text-sm">Magic Points</p>

        <Button variant={"red"}><PiSpeedometer className="mr-2 pb-5" /> Add letter</Button>
        </div>
       
      </CardContent>
    </Card>
  );
};