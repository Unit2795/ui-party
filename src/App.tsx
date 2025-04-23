import {
	Shadcn
} from "@/components/forms/Shadcn.tsx";

function App() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-background flex-col">
			<h1 className="mb-24 text-4xl">Welcome to UI Party! 🎉</h1>

			<h2 className="text-2xl mb-4">Shadcn/ui</h2>

			<Shadcn/>
		</div>
	);
}

export default App;
