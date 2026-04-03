import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import App from "./App";

test("shows the new brand-led hero and primary CTA on the homepage", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /rf control manufacturing for global access brands/i
    })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /request oem quote/i })
  ).toBeInTheDocument();
});

test("navigates to the contact page from the global nav", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("button", { name: /^contact$/i })[0]);

  expect(
    screen.getByRole("heading", { name: /start an oem conversation/i })
  ).toBeInTheDocument();
});
