"use client";
import { useCalendar } from "@/context/CalendarContext";

// ...styles moved to _searchbar.scss

export default function SearchBar() {
  const { user, setResult, searchTerm, setSearchTerm } = useCalendar();

  async function handleSearch(e) {
    const name = e.target.value;
    setSearchTerm(name);

    if (name.length < 3) {
      setResult([]);
      return;
    }

    // //user cant find themselves in search
    // data = data.filter(user => user.username !== currentUser)

    const res = await fetch(`/api/search?query=${name}&exclude=${user.id}`);
    const data = await res.json();

    setResult(data);
  }

  return (
    <>
      <div className="searchbar">
        <input
          className="searchbar__input"
          type="text"
          placeholder="Find new contacts..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </>
  );
}
