export default function CalculatorLogo({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calculator body */}
      <rect
        x="8"
        y="4"
        width="48"
        height="56"
        rx="6"
        fill="currentColor"
        className="text-gray-800 dark:text-gray-200"
      />
      
      {/* Screen */}
      <rect
        x="12"
        y="8"
        width="40"
        height="16"
        rx="2"
        fill="currentColor"
        className="text-blue-100 dark:text-blue-900"
      />
      
      {/* Screen text/numbers */}
      <text
        x="32"
        y="19"
        textAnchor="middle"
        fill="currentColor"
        className="text-gray-800 dark:text-gray-100"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        x²-4
      </text>
      
      {/* Button grid */}
      {[0, 1, 2, 3].flatMap((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={12 + col * 10}
            y={28 + row * 8}
            width="8"
            height="6"
            rx="1"
            fill="currentColor"
            className={
              row === 0 && col === 3 ? "text-blue-500 dark:text-blue-400" :
              row === 3 ? "text-gray-600 dark:text-gray-400" :
              "text-gray-700 dark:text-gray-300"
            }
          />
        ))
      )}
      
      {/* Shadow effect */}
      <rect
        x="10"
        y="6"
        width="48"
        height="56"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
        className="text-gray-900 dark:text-gray-100"
      />
    </svg>
  );
}