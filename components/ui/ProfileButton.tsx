import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { useSelector,useDispatch } from "react-redux";
  import { RootState, AppDispatch } from "@/lib/store";
import { setUser, clearUser } from "@/lib/features/user/userSlice";
  
  const ProfileButton = () => {
  const user = useSelector((state: RootState) => state.user);
const dispatch: AppDispatch = useDispatch();

const handleLogout = () => {
  dispatch(clearUser());
  localStorage.removeItem("token");
}

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="/img/shadcn.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer"
          onClick={handleLogout}
          >Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default ProfileButton;