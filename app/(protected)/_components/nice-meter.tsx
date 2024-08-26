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

interface NiceMeterProps {
  user?: ExtendedUser | any;
  label: string;
}
export const NiceMeter = ({ user, label }: NiceMeterProps) => {
  return (
    <Card className='flex flex-col w-[60%] m-4 bg-santa-red text-2xl text-white'>
      <CardHeader className="flex self-center">
        <h3 className={cn(`uppercase ${lilita.className}`)}>Naughty Nice Meter</h3>
      </CardHeader>
      <CardContent className={cn(`flex flex-row ${style.meterContainer}`)}>
        <div className={style.image}>
        <Image src='/newNNmeter.png' alt='naughty nice meter' width='250' height='10'/>
        </div>
        <div className={cn(`text-center ${style.meterColumn}`)}>
        <p className='text-sm'>You have</p>
        <span>{user?.magicPoints}</span>
        <p className="text-sm">Magic Points</p>
        <Button variant={"yellow"}><PiSpeedometer className="mr-2" /> Details</Button>
        </div>
       
      </CardContent>
    </Card>
  );
};
