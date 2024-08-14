import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import ListPage from "./components/pages/ListPage";
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
