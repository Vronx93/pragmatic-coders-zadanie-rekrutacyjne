/* eslint-disable prettier/prettier */
"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export const queryClient = new QueryClient();

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>["push"]>[1]
		>;
	}
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();
	const [isWorkerReady, setIsWorkerReady] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("msw/browser").then(async ({ setupWorker }) => {
				const { handlers } = require("../mocks/handlers");
				const worker = setupWorker(...handlers);

				await worker.start();
				setIsWorkerReady(true);
			});
		}
	}, []);

	if (!isWorkerReady) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>
					{children}
				</NextThemesProvider>
			</NextUIProvider>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
}
