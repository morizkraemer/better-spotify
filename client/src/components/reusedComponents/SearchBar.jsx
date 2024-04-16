import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="text-2xl w-1/3 py-2 px-4 bg-background rounded-full border border-neutral-700"
      type="text"
      name="search"
      id="search"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search Playlist"
    />
  );
}
