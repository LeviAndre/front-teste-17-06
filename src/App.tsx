import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ConfigProvider, theme } from "antd";

const App = () => {
  return (
      <ConfigProvider
      theme={{
          algorithm: theme.darkAlgorithm,
          token: {
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
