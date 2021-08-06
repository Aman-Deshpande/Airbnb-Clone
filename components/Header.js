import Image from "next/image";
import { useState } from "react";

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/solid";
import React from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setsearchInput] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [enddate, setenddate] = useState(new Date());
  const [numberofGuest, setNumberofGuest] = useState(1);
  const router = useRouter();

  function handleSelect(ranges) {
    setstartDate(ranges.selection.startDate);
    setenddate(ranges.selection.endDate);
  }

  const resetInput = () => {
    setsearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        enddate: enddate.toISOString(),
        numberofGuest,
      },
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: enddate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:p-8">
      {/* left */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle - Search*/}
      <div className="flex items-center border-2 rounded-full py-2 md:shadow-sm">
        <input
          className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
          value={searchInput}
          onChange={(e) => setsearchInput(e.target.value)}
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-1 cursor-pointer md:mx-2"
          onClick={search}
        />
      </div>

      {/* Right */}
      <div className="flex space-x-3 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />
        <div className="flex  items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-1">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5867"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-2">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UserIcon className="h-5" />
            <input
              value={numberofGuest}
              onChange={(e) => setNumberofGuest(e.target.value)}
              type="number"
              min={1}
              className="w-14 pl-2 text-lg outline-none text-red-400 border-2 rounded-md"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500 hover:text-gray-900 hover:scale-110 transition duration-75"
              onClick={resetInput}
            >
              Cancel
            </button>
            <button
              className="flex-grow text-red-400 hover:text-red-600 hover:scale-110 transition duration-75"
              onClick={search}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;

