import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";
import { Providers } from "@/redux/provider";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Navbar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
