import { GlobalContext } from "@/context/GlobalProvider";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { useContext, useState } from "react";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Incomplete!",
    icon: <CrossCircledIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Completed!",
    icon: <CheckCircledIcon className="w-5 h-5" />,
  },
];

export function Sidebar() {
  const { collapsed, toggleMenu } = useContext(GlobalContext);

  const [activeTab, setActiveTab] = useState("All Tasks");

  return (
    <nav
      className={`md:relative md:w-[15rem] bg-[#212121] md:border-bg2 text-[#6c7983] md:h-full fixed h-[calc(100vh-2rem)] z-50 transition-sidebar rounded-2xl lg:py-8 ${
        collapsed ? "translate-x-[-107%]" : "translate-x-0"
      }`}
    >
      <button
        className="md:hidden py-[0.40rem] px-[0.5rem] absolute -right-[38px] top-[1.8rem] rounded-tr-2xl rounded-br-2xl bg-[#212121] border-sidebar flex items center"
        onClick={toggleMenu}
      >
        {collapsed ? (
          <ArrowRightIcon className="w-5 h-5 mr-[0.15rem]" />
        ) : (
          <ArrowLeftIcon className="w-5 h-5 mr-[0.15rem]" />
        )}
      </button>
      <div className={`overflow-auto flex flex-col justify-between h-full`}>
        <div className="m-[1.5rem] px-[0.8rem] relative rounded-2xl cursor-pointer font-bold flex items-center group">
          <div
            className="absolute top-0 left-0 w-full h-full backdrop-blur-md z-0 bg-[#181818] 
                transition-all duration-500 ease-linear rounded-2xl border-bg2 opacity-20 hover:opacity-100 group-hover:opacity-100"
          ></div>
          <h1 className="text-[1.2rem] flex flex-col leading-[1.4rem] relative z-50 text-center w-full lg:py-6 md:py-2 py-2">
            Alfredo Austin
          </h1>
        </div>
        <ul>
          {menu.map((item) => {
            return (
              <li
                key={item.id}
                className={`relative pt-[0.8rem] pr-[1rem] pb-[0.9rem] pl-[2.1rem] 
                            mx-0 my-[0.3rem] grid grid-cols-[40px_1fr] cursor-pointer items-center 
                            after:absolute after:content-[""] after:left-0 after:top-0 after:w-0 after:h-full 
                            after:bg-sidebar-hover after:z-10 after:transition-all after:duration-300 after:ease-in-out 
                            hover:after:w-full before:absolute before:content-[""] before:right-0 before:top-0
                            before:h-full before:bg-sidebar-active before:rounded-bl-[5px] before:rounded-tl-[5px] ${
                              activeTab === item.title
                                ? "bg-sidebar-link before:w-[0.3rem]"
                                : ""
                            }`}
                onClick={() => {
                  setActiveTab(item.title);
                }}
              >
                <span className="flex items-center">{item.icon}</span>
                <p className="font-medium transition-all duration-300 ease-in-out z-10 leading-[0px]">
                  {item.title}
                </p>
              </li>
            );
          })}
        </ul>
        <div
          className="
            relative pr-[1rem] pt-[0.8rem] pb-[0.9rem] pl-[2.1rem] 
            mx-0 grid grid-cols-[40px_1fr] cursor-pointer items-center 
            after:absolute after:content-[''] after:left-0 after:top-0 after:w-0 after:h-full 
            after:bg-sidebar-hover after:z-1 after:transition-all after:duration-0.3 after:ease-in-out 
            hover:after:w-full before:absolute before:content-[''] before:right-0 before:top-0
            before:h-full before:bg-sidebar-active before:rounded-bl-[5px] before:rounded-tl-[5px]
            "
        >
          <ExitIcon className="w-5 h-5 flex items-center" />
          <p className="font-medium transition-all duration-300 ease-in-out z-10 leading-[0px]">
            Sign Out
          </p>
        </div>
      </div>
    </nav>
  );
}
