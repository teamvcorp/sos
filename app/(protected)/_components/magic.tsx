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

interface MagicProps {
  user?: ExtendedUser | any;
  label: string;
}
export const Magic = ({ user, label }: MagicProps) => {
  return (
<Card className='flex flex-col justify-around w-[40%] m-4 bg-santa-dark-blue text-2xl text-white '>
  <CardHeader className="flex self-center">
  <h3 className={cn(`${lilita.className} uppercase white-text`)}>Christmas Magic</h3>
  </CardHeader>
  <CardContent className='flex flex-row justify-center gap-x-20 items-center'>
    <div className='flex-none'>
      <Image src='/handgift.png' alt='Hand holding gift' width='100' height='100'/>
    </div>
    <div className='bg-white text-black rounded-xl p-4 ml-4 flex flex-col items-center'>
      <p className={cn(`${lilita.className} text-lg text-santa-red`)}>You have</p>
      <span className={cn(`${lilita.className} text-santa-green text-5xl`)}>{user?.magicPoints}</span>
      <p className={cn(`${lilita.className} text-xl text-santa-red`)}>Magic Points</p>
    </div>
  </CardContent>
  <div className='flex justify-center mt-4'>
    <Button variant="red" className='mr-2'><PiSpeedometer className="mr-2" /> Add letter</Button>
    <Button variant="red"><PiSpeedometer className="mr-2" /> Another Action</Button>
  </div>
</Card>

  );
};