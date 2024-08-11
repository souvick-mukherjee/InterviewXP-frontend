"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
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
const Login = ({ toggleAuth }: { toggleAuth: () => void }) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e:FormEvent) => {

    e.preventDefault();
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
        
      };
      dispatch(setUser(user));

     localStorage.setItem("token", response.data.token);
     router.push("/");
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
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
  );
};

export default Login;
