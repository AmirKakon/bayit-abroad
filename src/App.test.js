import { render, screen } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from "./App";

window.scrollTo = jest.fn();

// Test navigation to different routes
describe("App routing", () => {
  test("navigates to HomePage when /home route is visited", () => {
    const history = createMemoryHistory();
    history.push("/home");

    render(
        <App history={history}/>
    );

    expect(screen.findByText("Feel At Home")).toBeInTheDocument();
  });

  // test("navigates to FormPage when /form route is visited", () => {
  //   const history = createMemoryHistory();
  //   history.push("/form");

  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );

  //   expect(screen.getByText("Bayit Abroad Order Form")).toBeInTheDocument();
  // });

  // test("navigates to SearchOrderPage when /orders/search route is visited", () => {
  //   const history = createMemoryHistory();
  //   history.push("/orders/search");

  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );

  //   expect(screen.getByText("Search for Existing Order")).toBeInTheDocument();
  // });

  // test("redirects to /home when visiting a non-existent route", () => {
  //   const history = createMemoryHistory();
  //   history.push("/non-existent-route");

  //   render(
  //     <Router history={history}>
  //       <App />
  //     </Router>
  //   );

  //   expect(screen.getByText("Feel At Home")).toBeInTheDocument();
  // });
});