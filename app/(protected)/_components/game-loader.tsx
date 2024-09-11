'use client'
import { useEffect, useState } from "react";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiSpeedometer } from "react-icons/pi";
import Modal from "@/components/ui/modal";
import PresentCatcher from "../dashboard/games/present-catcher";

interface GamerLoaderProps {
  user?: ExtendedUser | any;
  label: string;
}
const buttons = [
    { id: 1, name: "catcher", label: "Present Catcher", url: "#" },
    { id: 2, name: "santasaver", label: "Santa Saver", url: "#" },
    { id: 3, name: "beanelf", label: "Be an Elf", url: "#" },
    // Add more buttons as needed
  ];
export const GameLoader = ({ user, label }: GamerLoaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeComponent, setActiveComponent] = useState<string>("");

  useEffect(() => {
    if (activeComponent === "catcher") {
      setIsModalOpen(true);
    }
  }, [activeComponent]);  // Dependency on activeComponent ensures this runs only when it changes

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveComponent("");  // Optionally reset activeComponent on modal close
  };

  const loadComponent = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "catcher":
        return <PresentCatcher />;
      default:
        return <p>Select a game to load</p>;
    }
  };

  return (
    <>
      <Card className="flex flex-col w-[60%] m-4 bg-santa-yellow text-2xl text-white">
        <CardHeader className="flex self-center">
          <h3>Game Loader</h3>
        </CardHeader>
        <CardContent className="flex flex-row">
        
          <div>
            {buttons.map((button) => (
              <Button
                key={button.id}
                onClick={() => loadComponent(button.name)}
                className="m-2"
              >
                {button.label}
              </Button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm">You have</p>
            <span>{user?.magicPoints}</span>
            <p className="text-sm">Magic Points</p>
            <Button variant={"red"}>
              <PiSpeedometer className="mr-2" /> Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {renderComponent()}
      </Modal>
    </>
  );
};
