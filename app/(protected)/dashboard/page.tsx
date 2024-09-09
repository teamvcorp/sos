import React from "react";
import style from "./dashboard.module.css";
import { cn } from "@/lib/utils";
import { NiceMeter } from "../_components/nice-meter";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import { LetterCard } from "../_components/letter-card";
import {PresentForm} from "../_components/presentForm";
import {GameLoader} from "../_components/game-loader";
import {Magic} from '../_components/magic';
import { PresentCard } from "../_components/present-card";

const DashboardPage = async () => {
  const curUser = await currentUser();
  const user = await getUserById(curUser?.id);

  return (
    <div className={style.dashContainer}>
      <div className="flex flex-row justify-between">
        <NiceMeter user={user} label="Nice Meter" />
        <LetterCard user={user} label="Letter Card" />
      </div>
      <div className="flex flex-row justify-between">
        {/* <PresentForm /> */}
        <Magic user={user} label="Magic"/>
        <PresentCard user={user} label="Presents"/>
      </div>
      <div className="flex flex-row justify-between">
        <GameLoader label='f'/>
      </div>
    </div>
  );
};

export default DashboardPage;
