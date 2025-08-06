import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoExit } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  const optionsStatus = [
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Active", label: "Active" },
    { id: 3, value: "Completed", label: "Completed" },
  ];
  const optionsCategory = [
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Work", label: "Work" },
    { id: 3, value: "Home", label: "Home" },
    { id: 4, value: "Study", label: "Study" },
  ];
  const tasksData = [
    {
      id: 1,
      title: "Task 1",
      status: "Active",
      category: "Work",
      date: "2025-08-05",
    },
    {
      id: 2,
      title: "Task 2",
      status: "Completed",
      category: "Home",
      date: "2025-08-05",
    },
    {
      id: 3,
      title: "Task 3",
      status: "Active",
      category: "Study",
      date: "2025-08-05",
    },
    {
      id: 4,
      title: "Task 4",
      status: "Completed",
      category: "Work",
      date: "2025-08-05",
    },
    {
      id: 5,
      title: "Task 5",
      status: "Completed",
      category: "Home",
      date: "2025-08-05",
    },
    {
      id: 6,
      title: "Task 6",
      status: "Completed",
      category: "Study",
      date: "2025-08-05",
    },
    {
      id: 7,
      title: "Task 7",
      status: "Active",
      category: "Work",
      date: "2025-08-05",
    },
    {
      id: 8,
      title: "Task 8",
      status: "Completed",
      category: "Home",
      date: "2025-08-05",
    },
    {
      id: 9,
      title: "Task 9",
      status: "Active",
      category: "Study",
      date: "2025-08-05",
    },
    {
      id: 10,
      title: "Task 10",
      status: "Completed",
      category: "Work",
      date: "2025-08-05",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("");
  const [openStatusList, setOpenStatusList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setOpenStatusList(false);
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCategoryList, setOpenCategoryList] = useState(false);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setOpenCategoryList(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="flex flex-col items-center h-full py-[2%] gap-10">
      <div className="flex flex-1 flex-row justify-between items-center w-[70%]">
        <div className="flex items-center gap-4">
          {/* Input date for showing tasks by date*/}
          <input
            type="date"
            className="bg-details py-[13px] px-[15px] rounded-xl font-rubik text-xl h-full w-[195px] max-w-xs text-bg1 cursor-pointer"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          {/* Input status*/}
          <div className="relative inline-block w-[195px] max-w-xs cursor-pointer">
            <div
              className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-xl appearance-none w-[195px] flex items-center justify-between shadow-main "
              onClick={() => setOpenStatusList(!openStatusList)}
            >
              {selectedStatus === "" ? "Status" : selectedStatus}
              {openStatusList && <IoIosArrowDropupCircle />}
              {!openStatusList && <IoIosArrowDropdownCircle />}
            </div>
            {openStatusList && (
              <ul className="absolute z-10 w-full bg-bg1 rounded-b-xl shadow-main mt-1">
                {optionsStatus.map((option) => (
                  <li
                    key={option.id}
                    value={option.value}
                    onClick={() => handleStatusChange(option.value)}
                    className="text-text bg-bg1 py-[13px] px-[15px]  font-rubik text-l cursor-pointer hover:bg-accent1 hover:text-static-text rounded-b-xl"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Input category*/}
          <div className="relative inline-block w-[195px] max-w-xs cursor-pointer">
            <div
              className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-xl appearance-none w-[195px] flex items-center justify-between shadow-main"
              onClick={() => setOpenCategoryList(!openCategoryList)}
            >
              {selectedCategory === "" ? "Category" : selectedCategory}
              {openCategoryList && <IoIosArrowDropupCircle />}
              {!openCategoryList && <IoIosArrowDropdownCircle />}
            </div>
            {openCategoryList && (
              <ul className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl">
                {optionsCategory.map((option) => (
                  <li
                    key={option.id}
                    value={option.value}
                    onClick={() => handleCategoryChange(option.value)}
                    className="text-text bg-bg1 py-[13px] px-[15px]  font-rubik text-l cursor-pointer rounded-b-xl hover:bg-accent1 hover:text-static-text"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Switch light and dark mode*/}
          <button
            onClick={toggleTheme}
            className={`w-14 h-8 flex items-center rounded-full px-1 cursor-pointer transition duration-300 ${
              isDark ? "bg-details" : "bg-details"
            }`}
          >
            <div
              className={`flex justufy-center items-center  bg-bg1 w-6 h-6 rounded-full transform transition duration-300  ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDark ? (
                <IoMoon className="text-details w-full text-center" />
              ) : (
                <FaSun className="text-details w-full text-center" />
              )}
            </div>
          </button>

          {/* Profile button*/}
          <div className="relative flex">
            <div
              className="flex items-center gap-4"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <div className="h-10 aspect-square rounded-full bg-[url(/persone.png)] bg-cover bg-center bg-no-repeat"></div>
              {/* This is a placeholder for user photo */}
              <p className="text-signika text-xl text-text">Login</p>{" "}
              {/* This is a placeholder for user login */}
            </div>

            {/* Profile menu overlay*/}
            {openProfile && (
              <div className="absolute top-10 bg-bg1 rounded-xl shadow-main p-4 w-[110%]">
                <ul className="flex flex-col gap-2">
                  <li
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <IoExit className="text-accent2 text-base font-signika" />
                    <p className="text-text text-base font-signika">Sign out</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main container with tasks*/}
      <div className="flex-10 w-[70%] bg-gradient-to-b from-accent1 to-bg1 flex flex-col items-center rounded-3xl shadow-main px-25 py-[3%] gap-5">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="w-[50px]"></div>

          {/* Main logo*/}
          <img
            src="/logo.svg"
            alt="logo"
            className="w-[150px] logo-fil-static"
          />

          {/* Add new task button*/}
          <button className="w-[50px] aspect-square bg-bg1 shadow-main flex items-center justify-center cursor-pointer rounded-full hover:bg-static-details transition duration-300">
            <FiPlus className="text-xl text-text" />
          </button>
        </div>

        {/*Main table with tasks*/}
        <div className="flex flex-col gap-4 justify-center w-full">
          {tasksData.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center w-full gap-4 h-10 bg-bg2 rounded-xl px-4 shadow-main"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                {/*Check box field*/}
                <div className="w-6 aspect-square bg-bg1 shadow-main flex items-center justify-center rounded-sm">
                  {task.status === "Completed" && (
                    <FaCheck className="text-text" />
                  )}
                </div>

                {/*Title*/}
                <p className="font-signika text-base font-semibold text-text">
                  {task.title}
                </p>
              </div>

              {/*Addition information about task*/}
              <div className="flex items-center gap-2 w-[30%] justify-between">
                <div className="flex items-center justify-start gap-2">
                  <p>|</p>
                  <p className="text-base font-rubik text-details font-bold">
                    #{task.category}
                  </p>
                </div>
                <p className="opacity-80 text-text font-rubik text-base">
                  {task.date}
                </p>

                {/*Edit button and delete button*/}
                <div className="flex items-center gap-2 ">
                  <button>
                    <FaEdit className="text-text text-base cursor-pointer" />
                  </button>
                  <button>
                    <FaTrashAlt className="text-accent2 text-base cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
