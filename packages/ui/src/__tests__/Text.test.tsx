import React from "react";
import { render } from "@testing-library/react-native";
import { Text } from "@ui/Text";
import { AppProvider } from "@ui/AppProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AppProvider theme="light">{children}</AppProvider>
);

describe("Text", () => {
  it("renders h1 variant", () => {
    const { getByText } = render(<Text variant="h1">Heading 1</Text>, {
      wrapper,
    });
    expect(getByText("Heading 1")).toBeTruthy();
  });

  it("renders h2 variant", () => {
    const { getByText } = render(<Text variant="h2">Heading 2</Text>, {
      wrapper,
    });
    expect(getByText("Heading 2")).toBeTruthy();
  });

  it("renders p1 variant", () => {
    const { getByText } = render(<Text variant="p1">Paragraph 1</Text>, {
      wrapper,
    });
    expect(getByText("Paragraph 1")).toBeTruthy();
  });

  it("renders p2 variant (default)", () => {
    const { getByText } = render(<Text>Default paragraph</Text>, { wrapper });
    expect(getByText("Default paragraph")).toBeTruthy();
  });

  it("renders p3 variant", () => {
    const { getByText } = render(<Text variant="p3">Paragraph 3</Text>, {
      wrapper,
    });
    expect(getByText("Paragraph 3")).toBeTruthy();
  });
});
