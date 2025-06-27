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
  flex-direction: column;
`;

export default function LoginPage() {
  const { loginUser } = useCalendar();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Login failed");
        console.error(error);
        return;
      }

      if (data.user) {
        loginUser(data.user);
        setLoginData({ username: "", password: "" });
        setTimeout(() => {
          router.refresh();
          router.push("/");
        });
      }
    } catch (err) {
      setError("Something went wrong during login");
      console.error(err);
    }
  };

  return (
    <>
      <LoginWrapper>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

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
    </>
  );
}
