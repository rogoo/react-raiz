import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const RootComponent = () => {
  return (
    <>
      <div>
        <Link to="/" activeProps={{ className: "font-bold" }}>
          Home
        </Link>
        <Link to="/about" activeProps={{ className: "font-bold" }}>
          About
        </Link>
        <Link to="/posts" activeProps={{ className: "font-bold" }}>
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};
