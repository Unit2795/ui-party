import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
	Shadcn
} from "@/components/forms/Shadcn.tsx";
import MUI from "./components/forms/MUI";
import AntDesign from "./components/forms/AntDesign";

function App() {
	return (
		<div className="flex w-screen items-center justify-center flex-col my-12">
			<h1 className="text-4xl">Welcome to UI Party! 🎉</h1>

			<h2 className="text-2xl mt-24 mb-4">Shadcn/ui</h2>

			<Shadcn/>

			<h2 className="text-2xl mt-24 mb-4">Material UI</h2>

			<MUI/>

			<h2 className="text-2xl mt-24 mb-4">Ant Design</h2>

			<AntDesign/>
		</div>
	);
}

export default App;
