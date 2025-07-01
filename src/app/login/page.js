"use client";
import styled from "styled-components";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";

const LoginWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 300px;
`;

const LoginFormWrapper = styled.div`
  height: auto;
  padding: 20px;
  background-color: var(--color-toolbar-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const InputBoxes = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  width: 100%;
  margin: 10px 0;
  border-radius: 5px;
  border: none;

  &:focus {
    border: none;
  }
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
        <div>
          <div>
            <h1 style={{ fontSize: "2.8rem", marginBottom: "10px" }}>Login</h1>
            <LoginFormWrapper>
              <form
                onSubmit={handleLoginUser}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <InputBoxes
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
                <InputBoxes
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <Button
                  style={{
                    marginTop: "20px",
                    width: "130px",
                    fontWeight: "600",
                  }}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </LoginFormWrapper>
          </div>
          {error && (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "var(--color-error-text)",
                marginTop: "20px",
              }}
            >
              {error}
            </p>
          )}
          <div
            style={{ marginTop: "20px", width: "100%", textAlign: "center" }}
          >
            Don&apos;t have an account?{" "}
            <Link href={"/register"}>
              <u>Create one!</u>
            </Link>
          </div>
        </div>
        <div></div>
      </LoginWrapper>
    </>
  );
}
