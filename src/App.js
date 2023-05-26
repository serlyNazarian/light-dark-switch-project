import { useEffect, useState } from "react";
import {
  ConfigProvider,
  theme,
  Card,
  Input,
  Button,
  Modal,
  Space,
  Select,
} from "antd";
import "./App.css";
import TextArea from "antd/es/input/TextArea";
import useThemeDetector from "./useThemeDetector";
import useTheme from "./useTheme";
import themeDarkConfig from "./themeDarkConfig.json";
import themeLightConfig from "./themeLightConfig.json";
import { useSelector } from "react-redux";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { theme, saveTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { systemTheme } = useThemeDetector();

  const isDarkMode = useSelector((state) => state.theme);

  const [selectedTheme, setselectedTheme] = useState(theme ? "dark" : "light");

  useEffect(() => {
    let isDark =
      selectedTheme === "dark" ||
      (selectedTheme === "system" && systemTheme === "dark");
    saveTheme(isDark);
    console.log("systemTheme :>> ", systemTheme);
  }, [systemTheme, selectedTheme]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const themeDark = themeDarkConfig;
  const themeLight = themeLightConfig;

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: isDarkMode ? themeDark : themeLight,
      }}
    >
      <Card style={{ height: "100vh" }}>
        <Select
          style={{
            width: 120,
            margin: 10,
          }}
          onChange={setselectedTheme}
          value={selectedTheme}
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
              value: "system",
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
