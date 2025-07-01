"use client";
import styled from "styled-components";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCalendar } from "@/context/CalendarContext";
import Button from "@/components/Button";
import Link from "next/link";
import RedirectPath from "@/components/Redirect";

const RegisterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  flex-direction: column;
  width: 300px;
`;

const RegisterFormWrapper = styled.div`
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

export default function RegisterForm() {
  const { loginUser } = useCalendar();

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      console.error(error);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: registerData.username,
          password: registerData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Registration failed");
        console.error(error);
        return;
      }

      if (data.user) {
        loginUser(data.user);
        setRegisterData({ username: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          router.refresh();
          router.push("/");
        }, 100);
      }
    } catch (err) {
      setError("Something went wrong during registration");
      console.error(err);
      return;
    }
  };

  return (
    <>
      <RedirectPath />
      <RegisterWrapper>
        <div>
          <div>
            <h1 style={{ fontSize: "2.8rem", marginBottom: "10px" }}>
              Register
            </h1>
            <RegisterFormWrapper>
              <form
                onSubmit={handleCreateUser}
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
                  value={registerData.username}
                  onChange={handleRegisterChange}
                  required
                />
                <InputBoxes
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <InputBoxes
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
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
                  Register
                </Button>
              </form>
            </RegisterFormWrapper>
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
            Already have an account?{" "}
            <Link href={"/register"}>
              <u>Log in!</u>
            </Link>
          </div>
        </div>
        <div></div>
      </RegisterWrapper>
    </>
  );
}
