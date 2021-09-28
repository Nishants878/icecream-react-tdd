import { render, screen } from "@testing-library/react";

import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  // confirm alt text of images
  // @ts-ignore
  const imageTitle = images.map((img) => img.alt);
  expect(imageTitle).toEqual([
    "Cherries topping",
    "M&M topping",
    "Hot fudge topping",
  ]);
});
