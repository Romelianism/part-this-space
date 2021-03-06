import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { edit } = router.query;

  return (
    <>
      {edit === "true" ? <Edit /> : null}
      <div id="container">
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Your space</h1>
          <h2>Something</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
            tempora quia. Modi praesentium quas quos reprehenderit, consectetur
            reiciendis ut, eius repellendus, et nesciunt libero quidem error!
            Veniam non blanditiis adipisci.
          </p>
          <h2>Something</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum et
            quam reiciendis consequuntur, in nemo eveniet repellendus vitae,
            neque voluptate totam corrupti natus. Illo quisquam sed at dolores,
            voluptate rem.
          </p>
          <h2>Something</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
            molestiae possimus tempore suscipit ex minus eius quod nisi sequi
            iure! Mollitia sint quaerat doloribus ut quasi odit consequuntur
            labore tempore!
          </p>
        </main>

        <style jsx global>{`
          body {
            margin: 0px;
            padding: 0px;
          }
        `}</style>
      </div>
    </>
  );
};

export default Home;

function ExitButton() {
  const router = useRouter();
  return (
    <button
      onClick={() =>
        router.push(
          {
            pathname: router.pathname,
            query: { ...router.query, edit: undefined },
          },
          undefined,
          {
            shallow: true,
          }
        )
      }
    >
      Exit
    </button>
  );
}

const Edit = () => {
  const container = document.getElementById("container") as HTMLElement;
  const [selectedElement, setSelectedElement] = useState(container);

  selectedElement.style.setProperty("filter", "drop-shadow(0px 0px 20px)");

  console.log(selectedElement);
  document.onmousedown = (e) => {
    const newSelectedElement = e.target as HTMLElement | null;
    if (
      newSelectedElement &&
      container &&
      container.contains(newSelectedElement)
    ) {
      // Highlight current selectedElement
      if (newSelectedElement !== selectedElement) {
        selectedElement.style.setProperty("filter", "revert");
        setSelectedElement(newSelectedElement);
      }
    }
  };

  return (
    <div>
      <ExitButton />
      <label>
        Background Image:{" "}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            (selectedElement.style.backgroundImage = e.target.files?.[0]
              ? `url(${URL.createObjectURL(e.target.files[0])}`
              : selectedElement.style.backgroundImage)
          }
          onClick={(e) => ((e.target as any).value = null)}
        />
      </label>
      <label>
        Text Color:{" "}
        <input
          type="color"
          value={
            selectedElement.style.color
              ? rgbToHex(selectedElement.style.color)
              : undefined
          }
          onChange={(e) => (selectedElement.style.color = e.target.value)}
        />
      </label>
    </div>
  );
};
function rgbToHex(rgb: string) {
  const a = rgb.split("(")[1].split(")")[0];
  const [r, g, b] = a.split(",");
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c: string) {
  var hex = parseInt(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
