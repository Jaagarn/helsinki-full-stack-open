import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TogglableBlog from "./TogglableBlog";

test("renders content in collapsed form", () => {
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

test("pressing show button content renders expanded form", async () => {
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

  const hideButtonString = "hide";
  const viewButtonString = "view";

  const currentUser = {
    username: "root2",
    name: "name test2",
    id: "verylongidstring654654654",
  };

  render(
    <TogglableBlog
      blog={blog}
      currentUser={currentUser}
      viewButtonLabel={hideButtonString}
      hideButtonLabel={viewButtonString}
    />
  );

  const user = userEvent.setup();
  const viewButton = screen.getByTestId("blog-view-button");
  expect(viewButton).toBeDefined();
  await user.click(viewButton);

  const element2 = screen.queryByTestId("blog-title-expanded");
  expect(element2).toBeDefined();
  const element3 = screen.queryByTestId("blog-url");
  expect(element3).toBeDefined();
  expect(element3).toHaveTextContent(`url: ${blog.url}`);
  const element4 = screen.queryByTestId("blog-likes");
  expect(element4).toBeDefined();
  expect(element4).toHaveTextContent(`likes: ${blog.likes}`);
  const element5 = screen.queryByTestId("blog-username");
  expect(element5).toBeDefined();
});

test("pressing like button twice calls event handler twice", async () => {
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

  const hideButtonString = "hide";
  const viewButtonString = "view";

  const mockHandleLike = jest.fn();

  const currentUser = {
    username: "root2",
    name: "name test2",
    id: "verylongidstring654654654",
  };

  render(
    <TogglableBlog
      blog={blog}
      currentUser={currentUser}
      viewButtonLabel={hideButtonString}
      hideButtonLabel={viewButtonString}
      handleLike={mockHandleLike}
    />
  );

  const user = userEvent.setup();
  const viewButton = screen.getByTestId("blog-view-button");
  expect(viewButton).toBeDefined();
  await user.click(viewButton);

  const likeButton = screen.queryByTestId("blog-like-button");
  expect(likeButton).toBeDefined();
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandleLike.mock.calls).toHaveLength(2)
});
