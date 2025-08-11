import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoExit } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { FaRegSadCry } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//import { userData } from "../../backend/api";
import e from "cors";

function Home() {
  const navigate = useNavigate();

  const [optionsStatus, setOptionsStatus] = useState([
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Active", label: "Active" },
    { id: 3, value: "Completed", label: "Completed" },
  ]);
  const [optionsCategory, setOptionsCategory] = useState([
    { id: 0, value: "New Category", label: "New Category" },
    { id: 1, value: "All", label: "All" },
    { id: 2, value: "Work", label: "Work" },
    { id: 3, value: "Home", label: "Home" },
    { id: 4, value: "Study", label: "Study" },
  ]);
  const [tasksData, setTasksData] = useState([
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
  ]);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [openStatusList, setOpenStatusList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const [selectedCategoryNT, setSelectedCategoryNT] = useState("");
  const [openCategoryListNT, setOpenCategoryListNT] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [isDark, setIsDark] = useState(false);
  const [openNewTask, setOpenNewTask] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editWindow, setEditWindow] = useState(false);
  const [selectedCategoryET, setSelectedCategoryET] = useState("");

  const handleCategoryChangeET = (value) => {
    setSelectedCategoryET(value);
    setOpenCategoryListNT(false);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setOpenStatusList(false);
  };
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setOpenCategoryList(false);
  };
  const handleCategoryChangeNT = (value) => {
    setSelectedCategoryNT(value);
    setOpenCategoryListNT(false);
  };

  const getUserTasks = () => {
    try {
      const loginUser = localStorage.getItem("token");
      //const res = await userData(loginUser,selectedDate);
      //return res.data.tasks;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const changeTaskStatus = (idTask) => {
    // Update the task status in the local state
    setTasksData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === idTask
          ? {
              ...task,
              status: task.status === "Active" ? "Completed" : "Active",
            }
          : task
      )
    );

    // Update the task status in the backend
    try {
      const loginUser = localStorage.getItem("token");
      //const res = await updateTaskStatus(loginUser, idTask);
      console.log("Task status updated successfully");
      //setTasksData(getUserTasks());
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(
    () => {
      //setTasksData(getUserTasks());
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [isDark],
    [selectedDate]
  );

  const toggleTheme = () => setIsDark(!isDark);

  //Sorting data

  const filteredTasks = tasksData.filter((task) => {
    const statusMatch =
      selectedStatus === "All" ||
      selectedStatus === "" ||
      task.status === selectedStatus;
    const categoryMatch =
      selectedCategory === "All" ||
      selectedCategory === "" ||
      task.category === selectedCategory;
    const dateMatch = task.date === selectedDate;
    return statusMatch && categoryMatch && dateMatch;
  });

  return (
    <div className=" min-h-screen relative flex flex-col items-center gap-4 bg-gradient-to-b from-bg1 to-accent1">
      <div className="flex flex-row items-center justify-between md:gap-4 md:justify-start flex-wrap w-[95%] md:w-[70%]">
        {/* Input date for showing tasks by date*/}
        <input
          type="date"
          className="bg-details my-2 py-[13px] px-[15px] rounded-xl font-rubik text-base md:text-xl h-full w-[49%] md:w-[195px] max-w-xs text-bg1 cursor-pointer"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Input status*/}
        <div className="relative inline-block w-[49%] md:w-[195px] max-w-xs cursor-pointer">
          <div
            className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-base md:text-xl appearance-none flex items-center justify-between shadow-main "
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
        <div className="relative inline-block w-[49%] md:w-[195px] max-w-xs cursor-pointer">
          <div
            className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-base md:text-xl appearance-none flex items-center justify-between shadow-main"
            onClick={() => setOpenCategoryList(!openCategoryList)}
          >
            {selectedCategory === "" ? "Category" : selectedCategory}
            {openCategoryList && <IoIosArrowDropupCircle />}
            {!openCategoryList && <IoIosArrowDropdownCircle />}
          </div>
          {openCategoryList && (
            <ul className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl">
              {optionsCategory
                .filter((option) => option.id !== 0)
                .map((option) => (
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

        {/* Dark mode toggle and profile button*/}
        <div className="flex md:flex-2 items-center justify-around md:justify-end md:gap-4 w-[49%] md:w-[195px]">
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
              className="flex items-center gap-2 md:gap-4"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <div className="h-7 md:h-10 aspect-square rounded-full bg-[url(/persone.png)] bg-cover bg-center bg-no-repeat"></div>
              {/* This is a placeholder for user photo */}
              <p className="text-signika text-base md:text-xl text-text">
                Login
              </p>{" "}
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
                    <IoExit className="hidden md:block text-accent2 text-base font-signika" />
                    <p className="text-accent2 md:text-text text-center text-base font-signika">
                      Sign out
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main container with tasks*/}
      <div className="w-[95%] md:w-[70%] bg-gradient-to-b from-accent1 to-bg1 flex flex-col items-center rounded-3xl shadow-main px-[3%] md:px-25 py-[3%] gap-5">
        <div className="flex flex-row items-center w-full justify-between">
          <div className="w-[40px]"></div>

          {/* Main logo*/}
          <img
            src="/logo.svg"
            alt="logo"
            className="w-[100px] md:w-[150px] logo-fil-static"
          />

          {/* Add new task button*/}
          <button
            onClick={() => setOpenNewTask(!openNewTask)}
            className="w-[40px] md:w-[50px] aspect-square bg-bg1 shadow-main flex items-center justify-center cursor-pointer rounded-full hover:bg-static-details transition duration-300"
          >
            <FiPlus className="text-xl text-text" />
          </button>
        </div>

        {/*Main table with tasks*/}
        <div className="flex flex-col gap-4 justify-center w-full">
          {filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="text-text text-3xl font-signika text-center">
                <FaRegSadCry />
              </p>
              <p className="text-text text-base md:text-xl font-signika text-center">
                No tasks found
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div>
                <div
                  key={task.id}
                  className="flex justify-between items-center w-full gap-4 h-10 bg-bg2 rounded-xl px-4 shadow-main"
                  onMouseEnter={() => setHoveredId(task.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    {/*Check box field*/}
                    <div
                      className="w-6 aspect-square bg-bg1 shadow-main flex items-center justify-center rounded-sm"
                      onClick={() => changeTaskStatus(task.id)}
                    >
                      {task.status === "Completed" && (
                        <FaCheck className="text-text" />
                      )}
                    </div>

                    {/*Title*/}
                    <p
                      className={`font-signika text-sm md:text-base font-semibold text-text ${
                        task.status === "Completed" && "line-through"
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  {/*Addition information about task*/}
                  <div className="flex items-center gap-2 md:w-[30%] justify-between">
                    <div className="flex items-center justify-start gap-2">
                      <p>|</p>
                      <p className="text-sm md:text-base font-rubik text-details font-bold">
                        #{task.category}
                      </p>
                    </div>
                    <p className="hidden md:block opacity-80 text-text font-rubik text-base">
                      {task.date}
                    </p>

                    {/*Edit button and delete button*/}
                    {hoveredId === task.id && (
                      <div className="flex items -center gap-2">
                        <button
                          onClick={() => {
                            setEditTask(task.id);
                            setEditWindow(!editWindow);
                          }}
                        >
                          <FaEdit className="text-text text-base cursor-pointer" />
                        </button>
                        <button>
                          <FaTrashAlt className="text-accent2 text-base cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/*Overlay window for creating new tasks*/}
                {editTask === task.id && editWindow && (
                  <div>
                    <div className="fixed inset-0 bg-static-text opacity-80 flex items-center justify-center z-6"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                      <div className="bg-bg2 rounded-3xl shadow-main p-8 md:w-[30%]">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-text text-2xl font-signika text-center w-[99%]">
                            Edit Task
                          </h2>
                          <p
                            className="text-text text-xl font-signika cursor-pointer"
                            onClick={() => setEditWindow(!editWindow)}
                          >
                            <MdOutlineClose />
                          </p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <input
                            type="text"
                            placeholder="Title"
                            className="input shadow-main"
                            value={task.title}
                          />

                          {/* Input category for new task*/}
                          <div className="relative inline-block cursor-pointer">
                            <div
                              className="flex items-center justify-between input shadow-main"
                              onClick={() =>
                                setOpenCategoryListNT(!openCategoryListNT)
                              }
                            >
                              {selectedCategoryET === ""
                                ? task.category
                                : selectedCategoryET}
                              {openCategoryListNT && <IoIosArrowDropupCircle />}
                              {!openCategoryListNT && (
                                <IoIosArrowDropdownCircle />
                              )}
                            </div>
                            {openCategoryListNT && (
                              <ul className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl">
                                {optionsCategory
                                  .filter((option) => option.id !== 1)
                                  .map((option) => (
                                    <li
                                      key={option.id}
                                      value={option.value}
                                      onClick={() =>
                                        handleCategoryChangeET(option.value)
                                      }
                                      className="text-text bg-bg1 py-[13px] px-[15px] font-rubik text-l cursor-pointer rounded-b-xl hover:bg-accent1 hover:text-static-text"
                                    >
                                      {option.label}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>

                          {/* Input for new category*/}
                          {selectedCategoryNT === "New Category" && (
                            <input
                              type="text"
                              placeholder="New category..."
                              className="input shadow-main"
                            />
                          )}
                          <div className="flex flex-row justify-between items-center gap-4">
                            {/* Input date for new task*/}
                            <input
                              type="date"
                              className="input shadow-main flex-4"
                              value={task.date}
                            />

                            {/* Save button for new task*/}
                            <button className="flex-1 bg-details py-2 px-4 rounded-xl font-rubik text-base text-bg1 cursor-pointer">
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/*Overlay window for creating new tasks*/}
      {openNewTask && (
        <div>
          <div className="fixed inset-0 bg-static-text opacity-80 flex items-center justify-center z-6"></div>
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-bg2 rounded-3xl shadow-main p-8 md:w-[30%]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-text text-2xl font-signika text-center w-[99%]">
                  New Task
                </h2>
                <p
                  className="text-text text-xl font-signika cursor-pointer"
                  onClick={() => setOpenNewTask(!openNewTask)}
                >
                  <MdOutlineClose />
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="input shadow-main"
                />

                {/* Input category for new task*/}
                <div className="relative inline-block cursor-pointer">
                  <div
                    className="flex items-center justify-between input shadow-main"
                    onClick={() => setOpenCategoryListNT(!openCategoryListNT)}
                  >
                    {selectedCategoryNT === ""
                      ? "Category"
                      : selectedCategoryNT}
                    {openCategoryListNT && <IoIosArrowDropupCircle />}
                    {!openCategoryListNT && <IoIosArrowDropdownCircle />}
                  </div>
                  {openCategoryListNT && (
                    <ul className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl">
                      {optionsCategory
                        .filter((option) => option.id !== 1)
                        .map((option) => (
                          <li
                            key={option.id}
                            value={option.value}
                            onClick={() => handleCategoryChangeNT(option.value)}
                            className="text-text bg-bg1 py-[13px] px-[15px] font-rubik text-l cursor-pointer rounded-b-xl hover:bg-accent1 hover:text-static-text"
                          >
                            {option.label}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>

                {/* Input for new category*/}
                {selectedCategoryNT === "New Category" && (
                  <input
                    type="text"
                    placeholder="New category..."
                    className="input shadow-main"
                  />
                )}
                <div className="flex flex-row justify-between items-center gap-4">
                  {/* Input date for new task*/}
                  <input
                    type="date"
                    className="input shadow-main flex-4"
                    value={selectedDate}
                  />

                  {/* Save button for new task*/}
                  <button className="flex-1 bg-details py-2 px-4 rounded-xl font-rubik text-base text-bg1 cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
