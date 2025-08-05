import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";
function Home() {
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

  const [selectedStatus, setSelectedStatus] = useState("");
  const [openStatusList, setOpenStatusList] = useState(false);

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
    <div className="h-screen bg-bg1 bg-gradient-to-b from-bg1 to-accent1">
      <div className="flex flex-row justify-between items-center px-[15%] py-2.5">
        <div className="flex items-center gap-4">
          <input
            type="date"
            className="bg-details py-[13px] px-[15px] rounded-xl font-rubik text-xl h-full w-[195px] max-w-xs text-bg1"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div className="relative inline-block w-[195px] max-w-xs">
            <div
              className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-xl appearance-none w-[195px] flex items-center justify-between shadow-main "
              onClick={() => setOpenStatusList(!openStatusList)}
            >
              {selectedStatus === "" ? "Status" : selectedStatus}
              {openStatusList && <IoIosArrowDropupCircle />}
              {!openStatusList && <IoIosArrowDropdownCircle />}
            </div>
            {openStatusList && (
              <ul className="absolute z-10 w-full bg-bg1 rounded-b-xl shadow-lg mt-1">
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

          <div className="relative inline-block w-[195px] max-w-xs">
            <div
              className="text-text bg-bg1 py-[13px] px-[15px] pr-4 rounded-xl font-rubik text-xl appearance-none w-[195px] flex items-center justify-between shadow-main"
              onClick={() => setOpenCategoryList(!openCategoryList)}
            >
              {selectedCategory === "" ? "Category" : selectedCategory}
              {openCategoryList && <IoIosArrowDropupCircle />}
              {!openCategoryList && <IoIosArrowDropdownCircle />}
            </div>
            {openCategoryList && (
              <ul className="absolute z-10 w-full bg-bg1 shadow-lg mt-1 shadow-main rounded-b-xl">
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
          <div>
            <button
              onClick={toggleTheme}
              className={`w-14 h-8 flex items-center rounded-full px-1 transition duration-300 ${
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
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 aspect-square rounded-full bg-[url(/persone.png)] bg-cover bg-center bg-no-repeat"></div>
            {/* This is a placeholder for user photo */}
            <p className="text-signika text-xl text-text">Login</p>{" "}
            {/* This is a placeholder for user login */}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
export default Home;
