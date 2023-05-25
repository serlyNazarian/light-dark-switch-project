import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const useTheme = () => {
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const saveTheme = (newTheme) => {
    dispatch({
      type: "SET_THEME",
      theme: newTheme,
    });
  };

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return { theme, saveTheme };
};

export default useTheme;
