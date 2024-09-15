import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./components/lib/loaders";
import { Layout, RequireAuth } from "./components/ui/Layout";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import RegisterPage from "./pages/RegisterPage";
import SingleDetailsPage from "./pages/SingleDetailsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProfileUpdatePage from "./pages/profile/UpdatedProfilePage";
import "./style/layout.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SingleDetailsPage />,
          loader: singlePageLoader,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <RegisterPage />,
        },
        {
          path: "/post",
          element: <NewPostPage />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/post",
          element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
