import {
  render,
  screen,
  fireEvent,
  queryByText,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";
test("Initial Conditions", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click and disable on second click", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  render(<SummaryForm />);
  //popover starts out but hidden
  const nullPopover = screen.queryByText(
    /no icecream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();
  //popover appears on mouseover of checkbox label

  const termsAndCOnditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndCOnditions);

  const popOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();
  //popover disappears on mouseout of checkbox label

  userEvent.unhover(termsAndCOnditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
