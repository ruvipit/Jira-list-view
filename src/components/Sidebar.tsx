
import {
  Home,
  Clock,
  Star,
  LayoutDashboard,
  FolderKanban,
  Filter,
  ChevronDown,
  CheckSquare,
  User,
  Plus,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./ui/accordion";

interface NavItemProps {
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

function NavItem({ icon: Icon, children, className, active }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 pl-2 h-10",
        active && "bg-blue-50 text-blue-600",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Button>
  );
}

interface SidebarSectionProps {
  title: string;
  icon: React.ElementType;
  items: {
    name: string;
    icon?: React.ElementType;
    active?: boolean;
  }[];
}

function SidebarSection({ title, icon: Icon, items }: SidebarSectionProps) {
  return (
    <AccordionItem value={title} className="border-none">
      <div className="flex items-center">
        <AccordionTrigger className="py-2 px-2 hover:no-underline flex items-center h-10">
          <div className="flex items-center flex-1">
            <Icon className="h-4 w-4 mr-2" />
            <span className="text-sm font-normal">{title}</span>
          </div>
        </AccordionTrigger>
        <Button variant="ghost" size="icon" className="h-8 w-8 mr-1">
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <AccordionContent className="pb-0 pt-0">
        <div className="pl-7 space-y-1">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "flex items-center h-10 pl-2 rounded-md text-sm",
                item.active && "bg-blue-50 text-blue-600"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4 mr-2" />}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export function Sidebar() {
  const [value, setValue] = useState<string[]>(["Projects", "Filters"]);

  const projectItems = [
    { name: "Marketing Launches", active: true },
    { name: "Online store updates" },
    { name: "View all projects" },
  ];

  const filterItems = [
    { name: "Search work items", icon: Search },
    { name: "Starred" },
    { name: "Due soon" },
    { name: "Default filters", className: "font-semibold mt-2" },
    { name: "My open work items" },
    { name: "Reported by me" },
    { name: "All work items" },
    { name: "Open work items" },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="text-black text-sm leading-5 flex-1 overflow-y-auto">
        <div className="space-y-1 p-2">
          <NavItem icon={FolderKanban}>Your work</NavItem>
          <NavItem icon={Clock}>Recent</NavItem>
          <NavItem icon={Star}>Starred</NavItem>
          <NavItem icon={LayoutDashboard}>Dashboard</NavItem>
          
          <Accordion 
            type="multiple" 
            className="w-full" 
            value={value}
            onValueChange={setValue}
          >
            <SidebarSection 
              title="Projects" 
              icon={FolderKanban} 
              items={projectItems} 
            />
            
            <SidebarSection 
              title="Filters" 
              icon={Filter} 
              items={filterItems}
            />
          </Accordion>
          
          <NavItem icon={User} className="mt-2">Customize sidebar</NavItem>
        </div>
      </div>
    </div>
  );
}
