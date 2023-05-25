import { useEffect, useState } from "react";
import {
  ConfigProvider,
  theme,
  Card,
  Input,
  Switch,
  Button,
  Modal,
  Space,
  Select,
} from "antd";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import { useThemeDetector } from "./useThemeDetector";
import useTheme from "./useTheme";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { theme, saveTheme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isDarkTheme } = useThemeDetector();

  // console.log("isDarkTheme :>> ", isDarkTheme, isDarkMode);

  const onChange = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const newTheme = isDarkMode ? "dark" : "light";
    console.log("newTheme = ", newTheme);
    saveTheme(newTheme);
  }, [isDarkMode]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const themeLight = {
    colorBgBase: "#bde0fe",
    colorPrimary: "#ffc8dd",
  };

  const themeDark = {
    colorBgBase: "#5A5A5A",
    colorPrimary: "#FF4C29",
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: isDarkMode ? themeDark : themeLight,
      }}
    >
      <Card style={{ height: "100vh" }}>
        <Switch
          style={{ margin: 10 }}
          onChange={onChange}
          checked={isDarkMode}
        />
        <Select
          defaultValue={theme}
          style={{
            width: 120,
            margin: 10,
          }}
          onChange={handleChange}
          options={[
            {
              value: "light",
              label: "Light",
            },
            {
              value: "dark",
              label: "Dark",
            },
            {
              value: "System default",
              label: "System Default",
            },
          ]}
        />
        <Input style={{ margin: 10 }} placeholder="Basic usage" />
        <TextArea
          style={{ margin: 10 }}
          rows={4}
          placeholder="maxLength is 6"
          maxLength={6}
          value={theme}
        />
        <Space size="large" style={{ margin: 15 }}>
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
        </Space>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Card>
    </ConfigProvider>
  );
}

export default App;
