"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { setUser, clearUser } from "@/lib/features/user/userSlice";

function Authenticate() {
  const [auth, setAuth] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  // Function to toggle between Login and Register
  const toggleAuth = () => {
    setAuth((prevAuth) => (prevAuth === "Login" ? "Register" : "Login"));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/api/user/login`, {
        email: email,
        password: password,
      });

      const user = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
        token: response.data.token,
      };
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
    router.push("/");
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${serverUrl}/api/user/register`, {
        email: email,
        password: password,
        fullName: fullName,
      });

      const user = {
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
        token: response.data.token,
      };
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }

    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto mt-24">
      {auth === "Login" ? (
        <div>
          {/* Your Login form goes here */}
          <Card className="w-[350px] p-5">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Enter your Email ID"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
            <p className="pl-5">
              Don&apos;t have an account?{" "}
              <Link href="#" onClick={toggleAuth} className="text-blue-600">
                Register here
              </Link>
            </p>
          </Card>
        </div>
      ) : (
        <div>
          {/* Your Register form goes here */}
          <Card className="w-[350px] p-5">
            <CardHeader>
              <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your Full Name"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="name"
                      type="email"
                      placeholder="Enter your Email ID"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      id="name"
                      type="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleRegister}>Register</Button>
            </CardFooter>
            <p className="pl-5">
              Already have an account?{" "}
              <Link href="#" onClick={toggleAuth} className="text-blue-600">
                Login here
              </Link>
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Authenticate;
