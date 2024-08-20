import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ListPage from "./components/pages/ListPage";
import LoginPage from "./components/pages/LoginPage";
import NewPostPage from "./components/pages/NewPostPage";
import ProfilePage from "./components/pages/profile/ProfilePage";
import RegisterPage from "./components/pages/RegisterPage";
import SingleDetailsPage from "./components/pages/SingleDetailsPage";
import Layout from "./components/ui/Layout";
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
        },
        {
          path: "/:id",
          element: <SingleDetailsPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
