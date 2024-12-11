import { ReactNode, Suspense, lazy } from "react";

const Eruda = lazy(() => import("./eruda-provider").then((c) => ({ default: c.Eruda })));

export const ErudaProvider = (props: { children: ReactNode }) => {
  if (process.env.PROD) {
    return props.children;
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
            <div className="loader animate-spin w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        </div>
      }
    >
      <Eruda>{props.children}</Eruda>
    </Suspense>
  );
};
