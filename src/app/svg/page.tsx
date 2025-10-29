export default function SvgPage() {
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
