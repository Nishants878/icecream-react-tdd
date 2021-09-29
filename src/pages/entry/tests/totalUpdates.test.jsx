import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
test("update scoop subtotal when scoops change", async () => {
  //wrapper can be any provider redux or context one
  render(<Options optionType="scoops" />);

  //make sure total starts out $0.00
  const scoopsSubTotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopsSubTotal).toHaveTextContent("0.00");
  //update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);

  userEvent.type(vanillaInput, "1");
  expect(scoopsSubTotal).toHaveTextContent("2.00");
  //update chocolate scoops to 2 and check subtotal

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(vanillaInput);

  userEvent.type(chocolateInput, "2");
  expect(scoopsSubTotal).toHaveTextContent("6.00");
});

test("update scoop subtotal when toppings change", async () => {
  //wrapper can be any provider redux or context one
  render(<Options optionType="toppings" />);

  //make sure total starts out $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });

  expect(toppingsTotal).toHaveTextContent("0.00");
  //update vanilla scoops to 1 and check the subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  userEvent.click(cherriesCheckbox);

  expect(toppingsTotal).toHaveTextContent("1.50");
  //add hot fudge and check subtotal

  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge" });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  //remove hot fudge and check subtotal

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});
