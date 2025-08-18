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
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
  userData,
  addTask,
  deleteTaskById,
  updateTask,
  updateTaskStatus,
} from "../../backend/api";

import axios from "axios";
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
    { id: 5, value: "Others", label: "Others" },
  ]);

  const [tasksData, setTasksData] = useState([]);

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
  const [editWindow, setEditWindow] = useState(false);
  const [selectedCategoryET, setSelectedCategoryET] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    category: "",
    date: today,
  });
  const [editTask, setEditTask] = useState({
    id: null,
    title: "",
    category: "",
    date: today,
  });
  const [editTaskID, setEditTaskID] = useState(null);

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

  const token = localStorage.getItem("token");
  let decoded = "";
  if (token) {
    decoded = jwtDecode(token);
  }

  const getUserTasks = async () => {
    try {
      const res = await userData(token, selectedDate);
      return res.data.tasks;
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const changeTaskStatus = async (idTask) => {
    try {
      const res = await updateTaskStatus(token, idTask);
      console.log("Task status updated successfully");
      const updatedTasks = await getUserTasks();
      setTasksData(updatedTasks || []);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const deleteTask = async (idTask) => {
    try {
      console.log(idTask);
      const res = await deleteTaskById(token, idTask);
      console.log("Task deleted successfully");
      const updatedTasks = await getUserTasks();
      setTasksData(updatedTasks || []);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const addNewTask = async (newTask) => {
    setSelectedCategoryNT("");
    setOpenCategoryListNT(false);
    try {
      const res = await addTask(token, {
        title: newTask.title,
        category: newTask.category,
        date: newTask.date,
      });
      console.log("New task added successfully");
      const updatedTasks = await getUserTasks();
      setTasksData(updatedTasks || []);
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };

  const editTaskHandler = async (idTask, updatedTask) => {
    try {
      const res = await updateTask(token, idTask, {
        title: updatedTask.title,
        category: updatedTask.category,
        date: updatedTask.date,
      });
      console.log("Task edited successfully");
      const updatedTasks = await getUserTasks();
      setTasksData(updatedTasks || []);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const refs = useRef({});

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getUserTasks();
      setTasksData(tasks || []);
    };
    fetchTasks();

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    function handleClickOutside(event) {
      const isInside = Object.values(refs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (!isInside) {
        setOpenStatusList(false);
        setOpenCategoryList(false);
        setOpenCategoryListNT(false);
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDark, selectedDate]);

  const toggleTheme = () => setIsDark(!isDark);

  //Sorting data

  const filteredTasks = (Array.isArray(tasksData) ? tasksData : []).filter(
    (task) => {
      const statusMatch =
        selectedStatus === "All" ||
        selectedStatus === "" ||
        task.status === selectedStatus;
      const categoryMatch =
        selectedCategory === "All" ||
        selectedCategory === "" ||
        task.category === selectedCategory ||
        (selectedCategory === "Others"
          ? !["Home", "Work", "Study"].includes(task.category)
          : task.category === selectedCategory);
      const dateMatch = task.date === selectedDate;
      return statusMatch && categoryMatch && dateMatch;
    }
  );

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
            <ul
              className="absolute z-10 w-full bg-bg1 rounded-b-xl shadow-main mt-1"
              ref={(el) => (refs.current.statusRef = el)}
            >
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
            <ul
              className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl"
              ref={(el) => (refs.current.categoryRef = el)}
            >
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
              className="flex items-center gap-2 md:gap-4 cursor-pointer"
              onClick={() => setOpenProfile(!openProfile)}
            >
              <div className="h-7 md:h-10 aspect-square rounded-full bg-[url(/persone.png)] bg-cover bg-center bg-no-repeat"></div>
              {/* This is a placeholder for user photo */}
              <p className="text-signika text-base md:text-xl text-text">
                {decoded.name}
              </p>{" "}
              {/* This is a placeholder for user login */}
            </div>

            {/* Profile menu overlay*/}
            {openProfile && (
              <div
                className="absolute top-10 bg-bg1 rounded-xl shadow-main p-4 w-[110%]"
                ref={(el) => (refs.current.profileRef = el)}
              >
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
              <div key={task.id}>
                <div
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
                            setEditTaskID(task.id);
                            setEditWindow(!editWindow);
                            setEditTask({
                              id: task.id,
                              title: task.title,
                              category: task.category,
                              date: task.date,
                            });
                          }}
                        >
                          <FaEdit className="text-text text-base cursor-pointer" />
                        </button>
                        <button onClick={() => deleteTask(task.id)}>
                          <FaTrashAlt className="text-accent2 text-base cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/*Overlay window for edit task*/}
                {editTaskID === task.id && editWindow && (
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
                            value={editTask.title}
                            onChange={(e) =>
                              setEditTask({
                                ...editTask,
                                title: e.target.value,
                              })
                            }
                          />

                          {/* Input edit category*/}
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
                              <ul
                                className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl"
                                ref={(el) => (refs.current.categoryETRef = el)}
                              >
                                {optionsCategory
                                  .filter((option) => option.id !== 1)
                                  .map((option) => (
                                    <li
                                      key={option.id}
                                      value={option.value}
                                      onClick={() => {
                                        handleCategoryChangeET(option.value);
                                        setEditTask({
                                          ...editTask,
                                          category: option.value,
                                        });
                                      }}
                                      className="text-text bg-bg1 py-[13px] px-[15px] font-rubik text-l cursor-pointer rounded-b-xl hover:bg-accent1 hover:text-static-text"
                                    >
                                      {option.label}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>

                          {/* Input for new category*/}
                          {selectedCategoryET === "New Category" && (
                            <input
                              type="text"
                              placeholder="New category..."
                              className="input shadow-main"
                              onChange={(e) =>
                                setEditTask({
                                  ...editTask,
                                  category: e.target.value,
                                })
                              }
                            />
                          )}
                          <div className="flex flex-row justify-between items-center gap-4">
                            {/* Input edit date for task*/}
                            <input
                              type="date"
                              className="input shadow-main flex-4"
                              value={editTask.date}
                              onChange={(e) =>
                                setEditTask({
                                  ...editTask,
                                  date: e.target.value,
                                })
                              }
                            />

                            {/* Edit button for task*/}
                            <button
                              onClick={() => {
                                editTaskHandler(task.id, editTask);
                                setEditTaskID(null);
                                setEditWindow(!editWindow);
                              }}
                              className="flex-1 bg-details py-2 px-4 rounded-xl font-rubik text-base text-bg1 cursor-pointer"
                            >
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
                  onClick={() => {
                    setOpenNewTask(!openNewTask);
                    setNewTask({ title: "", category: "", date: today });
                    setSelectedCategoryNT("");
                    setOpenCategoryListNT(false);
                  }}
                >
                  <MdOutlineClose />
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="input shadow-main"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
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
                    <ul
                      className="absolute z-10 w-full bg-bg1 mt-1 shadow-main rounded-b-xl"
                      ref={(el) => (refs.current.categoryNTRef = el)}
                    >
                      {optionsCategory
                        .filter((option) => option.id !== 1)
                        .map((option) => (
                          <li
                            key={option.id}
                            value={option.value}
                            onClick={() => {
                              handleCategoryChangeNT(option.value);
                              newTask.category = option.value;
                            }}
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
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                  />
                )}
                <div className="flex flex-row justify-between items-center gap-4">
                  {/* Input date for new task*/}
                  <input
                    type="date"
                    className="input shadow-main flex-4"
                    value={newTask.date}
                    onChange={(e) =>
                      setNewTask({ ...newTask, date: e.target.value })
                    }
                  />

                  {/* Save button for new task*/}
                  <button
                    className="flex-1 bg-details py-2 px-4 rounded-xl font-rubik text-base text-bg1 cursor-pointer"
                    onClick={() => {
                      addNewTask({
                        id: tasksData.length + 1,
                        title: newTask.title,
                        status: "Active",
                        category: newTask.category,
                        date: newTask.date,
                      });
                      setOpenNewTask(false);
                      setNewTask({ title: "", category: "", date: today });
                      setSelectedCategoryNT("");
                      setOpenCategoryListNT(false);
                    }}
                    disabled={!newTask.title || !newTask.category}
                    // Disable button if title or category is empty
                  >
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
