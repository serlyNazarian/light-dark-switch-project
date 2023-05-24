import { useState, useEffect } from "react";
import {
  ConfigProvider,
  theme,
  Card,
  Input,
  Switch,
  Button,
  Modal,
  Space,
} from "antd";
import "./App.css";
import TextArea from "antd/es/input/TextArea";

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    console.log("savedTheme:", savedTheme);
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  // }, [isDarkMode]);

  console.log("isDarkMode:", isDarkMode);

  const onChange = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const saveName = () => {
    localStorage.setItem("name", name);
  };

  const saveTheme = () => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    console.log("theme :>> ", theme);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <Card style={{ height: "100vh" }}>
        <Switch onChange={onChange} checked={isDarkMode} />
        <Input style={{ margin: 10 }} placeholder="Basic usage" />
        <TextArea
          style={{ margin: 10 }}
          rows={4}
          placeholder="maxLength is 6"
          maxLength={6}
        />
        <Input style={{ margin: 10 }} value={name} onChange={onChangeName} />
        <Space style={{ margin: 15 }}>
          <Button onClick={saveName}>Save Name</Button>
          <Button onClick={saveTheme}>Save Theme</Button>
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
