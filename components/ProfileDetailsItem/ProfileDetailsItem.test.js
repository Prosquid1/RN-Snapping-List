import React from "react";
import { cleanup, render } from "@testing-library/react-native";

import ProfileDetailsItem from "./ProfileDetailsItem";

//Renders avatar, render scrolling, scrolling clips, renders text correctly, 

describe("ProductItem", () => {
  const defaultProps = {
      detailsViewHeight: 100,
      user: {
          firstName: "Test firstName",
          lastName: "Test lastName",
          image: null, //Not required for this test
          about: "Test bio",
      }
  };

  afterEach(cleanup);
  it("renders user's first name correctly", () => {
    const { getByText } = render(<ProfileDetailsItem {...defaultProps} />);
    expect(getByText("Test firstName")).toBeTruthy();
  });


  it("renders user's last name correctly", () => {
    const { getByText } = render(<ProfileDetailsItem {...defaultProps} />);
    expect(getByText("Test lastName")).toBeTruthy();
  });

  it("renders user's bio correctly", () => {
    const { getByText } = render(<ProfileDetailsItem {...defaultProps} />);
    expect(getByText("Test bio")).toBeTruthy();
  });
});
