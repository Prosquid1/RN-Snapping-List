import React from "react";

import { cleanup, render, fireEvent, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-dom/extend-expect";
import ProfileImageItem from "./ProfileImageItem";

describe("ProfileImageItem", () => {
  const itemProps = {
    index: 2,
    onAvatarItemPressed: jest.fn(),
    userImage: require("../../assets/avatars/test.png"),
  };

  afterEach(cleanup);

  it("clicks avatar item with index", () => {
    const { getByTestId } = render(<ProfileImageItem {...itemProps} />);
    fireEvent.press(getByTestId("avatarClickID"));
    expect(itemProps.onAvatarItemPressed).toHaveBeenCalledWith(
      itemProps.index
    );
  });

  it("has an image with a valid file path", async() => {
    const { getByTestId } = render(<ProfileImageItem {...itemProps} />);
    await waitFor(() => expect(getByTestId('avatarImg')).toBeTruthy())
    expect(getByTestId('avatarImg').props.source.uri !== null).toBeTruthy()
  });
});
