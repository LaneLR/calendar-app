"use client";
import styled from "styled-components";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flexdirection: "column";
`;

export default function LoginPage() {
  const { loginUser, setUser } = useCalendar();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type ": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error({ error: "Response was bad" });
      }
      loginUser(data.user);
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("error occurred: ", err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error({ error: "Response was bad" });
      }
      loginUser(data.user);
      setFormData({ username: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("error occurred: ", err);
    }
  };

  return (
    <>
      <LoginWrapper>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </LoginWrapper>
      <LoginWrapper>
        <form
          onSubmit={handleCreateUser}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={formData.username}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </LoginWrapper>
    </>
  );
}
