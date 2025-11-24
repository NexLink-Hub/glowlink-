import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Pricing from "@/pages/Pricing";

describe("Pricing -> Payment flow", () => {
  beforeEach(() => {
    // Clear auth for tests by default
    localStorage.removeItem("authToken");
  });

  test("unauthenticated user is redirected to login when selecting a paid plan", async () => {
    render(
      <MemoryRouter initialEntries={["/pricing"]}>
        <Routes>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<div>LOGIN PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /Start Free Trial/i });
    await userEvent.click(btn);

    expect(await screen.findByText("LOGIN PAGE")).toBeDefined();
  });

  test("authenticated user goes to payment when selecting a paid plan", async () => {
    // set mock auth
    localStorage.setItem("authToken", "test-token");

    render(
      <MemoryRouter initialEntries={["/pricing"]}>
        <Routes>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payment" element={<div>PAYMENT PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    const btn = screen.getByRole("button", { name: /Start Free Trial/i });
    await userEvent.click(btn);

    expect(await screen.findByText("PAYMENT PAGE")).toBeDefined();
  });
});
