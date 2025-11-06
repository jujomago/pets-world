const p1 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("🍎"), 1000)
);
const p2 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("💣"), 2000)
);
const p3 = new Promise((resolve, reject) =>
  setTimeout(() => resolve("🍌"), 3000)
);

export default function SvgPage() {
  // 1️⃣ Promise.all — se rechaza si alguna falla
  Promise.all([p1, p2, p3])
    .then((results) => console.log("All resolved:", results))
    .catch((error) => console.log("Rejected:", error));

  return (
    <>
      <svg width={400} height={400} className="border border-black">
        <ellipse
          cx="200"
          cy={200}
          rx={200}
          ry={200}
          strokeWidth={3}
          className="stroke-amber-600 "
        />
      </svg>
      <svg
        width={400}
        height={400}
        viewBox="0 0 400"
        className="border border-black"
      >
        <circle cx="200" cy={200} r={200} className="fill-blue-600 " />
      </svg>
    </>
  );
}
