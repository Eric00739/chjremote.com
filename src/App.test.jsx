import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import App from "./App";

test("shows a concise product-led hero with direct contact paths", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /rf remotes and receivers for oem programs/i
    })
  ).toBeInTheDocument();

  expect(screen.getByRole("link", { name: /whatsapp sales/i })).toHaveAttribute("href", "https://wa.me/8618028993261");
  expect(screen.getByRole("link", { name: /email project brief/i })).toHaveAttribute("href", expect.stringContaining("mailto:sales@chjremote.com"));
});

test("does not publish unverified factory media on the homepage", () => {
  render(<App />);

  expect(screen.queryByLabelText(/factory floor video/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/production footage reference/i)).not.toBeInTheDocument();
});

test("gives the mobile navigation button an accessible state", async () => {
  const user = userEvent.setup();
  render(<App />);

  const menuButton = screen.getByRole("button", { name: /open navigation menu/i });
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  expect(menuButton).toHaveAttribute("aria-controls", "mobile-navigation");

  await user.click(menuButton);

  expect(screen.getByRole("button", { name: /close navigation menu/i })).toHaveAttribute("aria-expanded", "true");
});

test("does not expose internal redesign commentary on the homepage", () => {
  render(<App />);

  expect(screen.queryByText(/The site now|The original page|This version/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/revised About page|layout now|blog is reframed|contact page now/i)).not.toBeInTheDocument();
});

test("navigates to the contact page from the global nav", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /^contact$/i })[0]);

  expect(
    screen.getByRole("heading", { name: /contact chj remotes/i })
  ).toBeInTheDocument();
});

test("provides direct contact paths without a mail-client form", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /^contact$/i })[0]);

  expect(screen.getAllByRole("link", { name: "sales@chjremote.com" }).map((link) => link.getAttribute("href"))).toContain("mailto:sales@chjremote.com");
  const phoneLinks = screen.getAllByRole("link", { name: "+86 18028993261" }).map((link) => link.getAttribute("href"));
  expect(phoneLinks).toEqual(expect.arrayContaining(["tel:+8618028993261", "https://wa.me/8618028993261"]));
  expect(screen.getByRole("heading", { name: /send a useful first brief/i })).toBeInTheDocument();
  expect(document.querySelector("form")).toBeNull();
  expect(screen.queryByLabelText("Company")).not.toBeInTheDocument();
  expect(screen.queryByText(/Inquiry simulated/i)).not.toBeInTheDocument();
});

test("publishes only the reviewed receiver-sensitivity article", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /^blog$/i })[0]);

  expect(screen.getByRole("heading", { name: /your remote controller might be hard of hearing/i })).toBeInTheDocument();
  expect(screen.queryByText(/how to choose a gate remote control supplier/i)).not.toBeInTheDocument();

  await user.click(screen.getByText(/Your Remote Controller Might Be Hard of Hearing/i));

  expect(screen.getByText(/31\.6 times lower power/i)).toBeInTheDocument();
  expect(screen.queryByText(/30,000 times/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/15 dBm difference/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/sensitivity does not/i)).not.toBeInTheDocument();
});

test("uses crawlable navigation links and updates the URL", async () => {
  const user = userEvent.setup();
  render(<App />);

  const aboutLink = screen.getAllByRole("link", { name: /^about$/i })[0];
  expect(aboutLink).toHaveAttribute("href", "/about/");

  await user.click(aboutLink);

  expect(window.location.pathname).toBe("/about/");
  expect(screen.getByRole("heading", { name: /direct starting point for rf control discussions/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /^about$/i })[0]).toHaveAttribute("aria-current", "page");
  expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://www.chjremote.com/about/");
  expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute("content", "https://www.chjremote.com/about/");
});

test("preserves native modified-click navigation", () => {
  render(<App />);

  const aboutLink = screen.getAllByRole("link", { name: /^about$/i })[0];
  let preventedByApp = true;
  document.addEventListener("click", (event) => {
    preventedByApp = event.defaultPrevented;
    event.preventDefault();
  }, { once: true });
  fireEvent.click(aboutLink, { metaKey: true });

  expect(preventedByApp).toBe(false);
  expect(window.location.pathname).toBe("/");
});
