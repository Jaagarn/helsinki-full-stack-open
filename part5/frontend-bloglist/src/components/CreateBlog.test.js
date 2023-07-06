import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import CreateBlog from "./CreateBlog";

test("creating a new blog sends correct data", async () => {
  const newBlog = {
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

  const mockHandleCreationBlog = jest.fn();

  render(<CreateBlog createNewBlog={mockHandleCreationBlog} />);

  const user = userEvent.setup();

  const titleInput = screen.getByTestId("create-blog-title-input");
  expect(titleInput).toBeDefined();
  await user.type(titleInput, newBlog.title);

  const authorInput = screen.getByTestId("create-blog-author-input");
  expect(authorInput).toBeDefined();
  await user.type(authorInput, newBlog.author);

  const urlInput = screen.getByTestId("create-blog-url-input");
  expect(urlInput).toBeDefined();
  await user.type(urlInput, newBlog.url);

  const submitButton = screen.getByTestId("create-blog-submit-button");
  expect(submitButton).toBeDefined();
  await user.click(submitButton);

  expect(mockHandleCreationBlog.mock.calls).toHaveLength(1);
  expect(mockHandleCreationBlog.mock.calls[0][0]).toStrictEqual({
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
  })
});
