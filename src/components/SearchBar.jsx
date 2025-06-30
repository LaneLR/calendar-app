"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 5px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Search = styled.input`
  font-size: 1.3rem;
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid var(--color-toolbar-bg);

  &:focus {
    outline: none;
  }
`;

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
      <SearchBarWrapper>
        <Search
          type="text"
          placeholder="Find new contacts..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBarWrapper>
    </>
  );
}
