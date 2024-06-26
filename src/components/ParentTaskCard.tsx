import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "./ui/switch";
import {
  CaretDown,
  DotsThree,
  TrashSimple,
  CopySimple,
  Plus,
  CaretRight,
  PencilSimple,
} from "@phosphor-icons/react";
import { Input } from "./ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "./ui/sheet";
import Link from "next/link";
import { Chat, Question, Wrench } from "@phosphor-icons/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import AskCard from "./AskCard";
import DoCard from "./DoCard";
import SayCard from "./SayCard";
import { useAppSelector } from "../redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ParentTaskCard: React.FC<{
  id: string;
  handleDelete: (id: string) => void;
  handleCopy: (id: string) => void;
}> = ({ id, handleDelete, handleCopy }) => {
  const [components, setComponents] = useState<
    { type: string; subType: string }[]
  >([]);
  const [allClosed, setAllClosed] = useState<any>([]);

  const handleAddComponent = (type: string, subType: string) => {
    setComponents((prevComponents) => [...prevComponents, { type, subType }]);
  };

  useEffect(() => {
    setAllClosed(components);
  }, [components]);

  const handleToggle = (e: any) => {
    let temp;
    if (allClosed.includes(e)) {
      temp = allClosed.filter((item: any) => item !== e);
    } else {
      temp = [...allClosed, e];
    }
    setAllClosed(temp);
  };

  const renderDropdownItems = (child: string) => {
    if (child === "ask") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
              <Question size={20} />
              <span>Ask</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "text")}
              >
                <span>Text</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "number")}
              >
                <span>Number</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "option")}
              >
                <span>Option</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "date")}
              >
                <span>Date</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "time")}
              >
                <span>Time</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAddComponent("ask", "yesno")}
              >
                <span>Yes/No</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else if (child === "do") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="px-4 rounded-md py-1 text-sm flex items-center gap-1">
              <Wrench size={20} />
              <span>Do</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Call</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "end call")}
                  >
                    <span>End Call</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "transfer call")}
                  >
                    <span>Transfer Call</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Send Message</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "sms")}
                  >
                    <span>SMS</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "email")}
                  >
                    <span>Email</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Calendar</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "availability")}
                  >
                    <span>Availability</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "book")}
                  >
                    <span>Book</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "reschedule")}
                  >
                    <span>Reschedule</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "cancel")}
                  >
                    <span>Cancel</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Campaign</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "addcampagin")}
                  >
                    <span>Add</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAddComponent("do", "removecampaign")}
                  >
                    <span>Remove</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Cancel</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent></DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleAddComponent("do", "custom")}
            >
              Custom
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  };

  console.log("components", components);

  return (
    <div>
      <Sheet>
        <Card className="w-[330px]">
          <SheetTrigger className="w-full">
            <CardHeader className="bg-[#a7f3d0] h-[52px] flex justify-center w-full">
              <div className="flex items-center justify-between w-full px-4">
                <CardTitle className="text-sm">Task Set</CardTitle>
                <div className="flex items-center gap-3">
                  <DotsThree size={20} />
                  <CopySimple
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopy(id);
                    }}
                  />
                  <TrashSimple
                    size={20}
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(id);
                    }}
                  />
                  <CaretDown size={16} />
                </div>
              </div>
            </CardHeader>
          </SheetTrigger>
          <CardContent className="flex flex-col items-start mt-4">
            <div className="flex items-center justify-between w-full">
              <p className="text-[#18181B] text-sm font-semibold">
                Agent speaks first
              </p>
              <Switch />
            </div>
            <Input placeholder="AI Responds to user" className="w-full mt-4" />
            <div className="w-full flex justify-center mt-4 relative">
              <Popover>
                <PopoverTrigger>
                  <button>
                    <Plus />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="bg-white border rounded shadow-lg p-2 flex justify-between items-center">
                  <button
                    className="px-4 rounded-md py-1 text-sm flex items-center gap-1"
                    onClick={() => handleAddComponent("say", "")}
                  >
                    <Chat size={20} />
                    <span>Say</span>
                  </button>
                  {renderDropdownItems("ask")}
                  {renderDropdownItems("do")}
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          {components.length ? (
            <div className="flex justify-center">
              <button onClick={() => setAllClosed([])}>
                Collapse all actions
              </button>
            </div>
          ) : null}
          <div className="px-3 flex flex-col justify-center items-center w-full gap-5 py-10">
            {components.map((component, index) => {
              if (component.type === "do")
                return (
                  <DoCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                    type={component.subType}
                  />
                );
              if (component.type === "say")
                return (
                  <SayCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                  />
                );
              if (component.type === "ask")
                return (
                  <AskCard
                    key={index}
                    allClosed={allClosed}
                    handleToggle={handleToggle}
                    type={component.subType}
                  />
                );
              return null;
            })}
          </div>
        </Card>

        <SheetContent>
          <SheetClose />
          <Card className="w-[330px]">
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-sm">Edit Task Set</CardTitle>
                <div className="flex items-center gap-3">
                  <DotsThree size={20} />
                  <PencilSimple size={20} />
                  <TrashSimple size={20} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-start mt-4"></CardContent>
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ParentTaskCard;
