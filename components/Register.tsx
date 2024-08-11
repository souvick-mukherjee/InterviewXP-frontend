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
const Register = ({ toggleAuth }: { toggleAuth: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const dispatch: AppDispatch = useDispatch();

  const handleRegister = async (e:FormEvent) => {
    e.preventDefault();
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
        
      };
      dispatch(setUser(user));
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
    }

    router.push("/");
  };

  return (
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
  );
};

export default Register;
