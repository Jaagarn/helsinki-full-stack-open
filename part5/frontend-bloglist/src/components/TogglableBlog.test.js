import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import TogglableBlog from "./TogglableBlog";

test("renders content", () => {
  const blog = {
    title: "Blog 1 test title",
    author: "Blog 1 test author",
    url: "www.blog1testsite.xyz",
    likes: 1,
    user: {
      username: "root",
      name: "name test",
      id: "verylongidstring2321321",
    },
  };

  const currentUser = {
    username: "root2",
    name: "name test2",
    id: "verylongidstring654654654",
  };

  render(<TogglableBlog blog={blog} currentUser={currentUser} />);

  const element1 = screen.getByTestId("blog-title-collapsed");
  expect(element1).toBeDefined();
  expect(element1).toHaveTextContent(
    `title: ${blog.title}, author: ${blog.author}`
  );

  const element2 = screen.queryByTestId("blog-title-expanded");
  expect(element2).toBeNull();
  const element3 = screen.queryByTestId("blog-url");
  expect(element3).toBeNull();
  const element4 = screen.queryByTestId("blog-likes");
  expect(element4).toBeNull();
  const element5 = screen.queryByTestId("blog-username");
  expect(element5).toBeNull();
});
