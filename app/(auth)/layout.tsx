export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-120">
        <div className="mb-10 flex items-center justify-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-[10px] bg-primary">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4.5 text-primary-foreground"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 2.5 L18 18 H14.5 L13.3 14 H6.7 L5.5 18 H2 Z M10 5.5 L13 12.5 H7 Z"
              />
            </svg>
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.015em] text-foreground">
            AI Creator Workspace
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}
