import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const size = formData.get("size");
  const toppings = formData.getAll("toppings");

  console.log(`Ordering a ${size} pizza with ${toppings.join(", ")}`);

  return new Response(null, {
    status: 302,
    headers: { Location: "/confirmation" },
  });
}

export default function Index() {
  return (
    <main>
      <h2>Remixez votre pizza</h2>

      <form method="POST" action="?index">
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
        </fieldset>

        <fieldset>
          <legend>Choisissez votre garniture</legend>

          <label>
            <input type="checkbox" name="toppings" value="pepperoni" />
            Pepperoni
          </label>
        </fieldset>

        <button type="submit">Commander</button>
      </form>
    </main>
  );
}
