"use client";
import styled from "styled-components";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flexdirection: "column";
`;

export default function LoginPage() {
  const { loginUser, setUser } = useCalendar();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error({ error: "Response was bad" });
      }
    if (data.user) {
      loginUser(data.user);
      setRegisterData({ username: "", password: ""});
      router.push("/");
    }
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
          username: registerData.username,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error({ error: "Response was bad" });
      }

      if (data.user) {
        loginUser(data.user);
        setRegisterData({ username: "", password: "", confirmPassword: "" });
        router.push("/");
      } 
    } catch (err) {
      console.error("error occurred: ", err);
    }
  };

  return (
    <>
      <LoginWrapper>
        <form
          onSubmit={handleLoginUser}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            placeholder="username"
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleLoginChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
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
            value={registerData.username}
            onChange={handleRegisterChange}
            required
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </LoginWrapper>
    </>
  );
}
