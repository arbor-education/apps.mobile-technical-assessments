import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "@ui/button";
import { AppProvider } from "@ui/AppProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider theme="light">{children}</AppProvider>
);

describe("Button", () => {
  it("renders primary variant", () => {
    const { getByText } = render(<Button text="Press me" variant="primary" />, {
      wrapper,
    });
    expect(getByText("Press me")).toBeTruthy();
  });

  it("renders secondary variant", () => {
    const { getByText } = render(
      <Button text="Secondary" variant="secondary" />,
      { wrapper },
    );
    expect(getByText("Secondary")).toBeTruthy();
  });

  it("renders outline variant", () => {
    const { getByText } = render(<Button text="Outline" variant="outline" />, {
      wrapper,
    });
    expect(getByText("Outline")).toBeTruthy();
  });

  it("renders ghost variant", () => {
    const { getByText } = render(<Button text="Ghost" variant="ghost" />, {
      wrapper,
    });
    expect(getByText("Ghost")).toBeTruthy();
  });

  it("fires onClick on press", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button text="Click" onClick={onClick} />, {
      wrapper,
    });
    fireEvent.press(getByText("Click"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders with disabled prop without throwing", () => {
    const { getByText } = render(<Button text="Disabled" disabled />, {
      wrapper,
    });
    expect(getByText("Disabled")).toBeTruthy();
  });
});
