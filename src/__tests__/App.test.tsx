/* eslint-env jest */
import React from "react";
import { render } from "@testing-library/react-native";

import App from "../../App";

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

describe("App", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<App />);
    // アプリが正常にレンダリングされることを確認
    expect(getByText).toBeTruthy();
  });
});
