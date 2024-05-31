import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

let nextOrderId = 1;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const size = formData.get("size");
  const toppings = formData.getAll("toppings");

  if (!size) {
    return { errors: { size: "Veuillez selectionner la taille" } };
  }

  const orderId = nextOrderId++;

  console.log(
    `[Order ${orderId}] Ordering a ${size} pizza with ${toppings.join(", ")}`
  );

  return new Response(null, {
    status: 302,
    headers: { Location: `/confirmation?orderId=${orderId}` },
  });
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main>
      <h2>Remixez votre pizza</h2>

      <Form method="POST" action="?index">
        <fieldset>
          <legend>Selectionnez la taille</legend>

          <label>
            <input type="radio" name="size" value="small" />
            Small
          </label>

          <label>
            <input type="radio" name="size" value="medium" />
            medium
          </label>

          <label>
            <input type="radio" name="size" value="large" />
            Large
          </label>
          {actionData?.errors?.size && (
            <p>
              <em>{actionData.errors.size}</em>
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend>Choisissez votre garniture</legend>

          <label>
            <input type="checkbox" name="toppings" value="pepperoni" />
            Pepperoni
          </label>
        </fieldset>

        <button type="submit">Commander</button>
      </Form>
    </main>
  );
}
