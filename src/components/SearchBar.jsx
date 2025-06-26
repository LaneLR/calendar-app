"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";

const SearchBarWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: 5px 0 10px 0;
`;

const Search = styled.input`
  font-size: 1.4rem;
  width: 100%;
  padding: 5px;

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
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchBarWrapper>
    </>
  );
}
