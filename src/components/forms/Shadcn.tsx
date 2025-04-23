import {
	SubmitHandler,
	useForm
} from "react-hook-form";
import {
	Loader2,
	X
} from "lucide-react";
import {
	useState
} from "react";
import {
	zodResolver
} from "@hookform/resolvers/zod";
import {
	Label
} from "@/components/ui/label.tsx";
import {
	Input
} from "@/components/ui/input.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card.tsx";
import {
	Button
} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/ui/tooltip.tsx";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select.tsx";
import {
	Badge
} from "@/components/ui/badge.tsx";
import { formSchema, FormValues } from "@/zod/schema";

export const Shadcn = () => {
	// Form handling with React Hook Form
	const form = useForm<FormValues>( {
		resolver: zodResolver( formSchema ),
		defaultValues: {
			name: "",
			category: "",
		},
	} );

	// Tags state
	const [ tags, setTags ] = useState( [ "React", "UI", "Demo" ] );

	// Modal state
	const [ showModal, setShowModal ] = useState( false );

	// Handle form submission
	const onSubmit: SubmitHandler<FormValues> = ( data ) => {
		setShowModal( true );

		// Simulate API call
		setTimeout(
			() => {
				setShowModal( false );
				console.log( data );
			},
			200000
		);
	};

	const removeTag = ( tagToRemove: string ) => {
		setTags( tags.filter( ( tag ) => tag !== tagToRemove ) );
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<form onSubmit={ form.handleSubmit( onSubmit ) }>
				<Card className="shadow-md">
					<CardHeader>
						<CardTitle>Demo Form</CardTitle>

						<CardDescription>
							A simple demonstration of Shadcn UI components.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						{/* Input with Label */}
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>

							<Input
								id="name"
								placeholder="Enter your name"
								{ ...form.register( "name" ) }/>

							{
								form.formState.errors.name
									? (
										<p className="text-sm text-red-500">
											{form.formState.errors.name.message}
										</p>
									)
									: null
							}
						</div>

						{/* Select Input */}
						<div className="space-y-2">
							<Label htmlFor="category">Category</Label>

							<Select
								onValueChange={
									( value ) => {
										form.setValue(
											"category",
											value,
											{
												shouldValidate: true
											}
										);
									}
								}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select a category"/>
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="design">Design</SelectItem>

									<SelectItem value="development">Development</SelectItem>

									<SelectItem value="marketing">Marketing</SelectItem>
								</SelectContent>
							</Select>

							{
								form.formState.errors.category
									? (
										<p className="text-sm text-red-500">
											{form.formState.errors.category.message}
										</p>
									)
									: null
							}
						</div>

						{/* Badges */}
						<div className="space-y-2">
							<Label>Tags</Label>

							<div className="flex flex-wrap gap-2">
								{
									tags.map( ( tag ) => (
										<Badge
											className="px-2 py-1 cursor-pointer"
											key={ tag }
											onClick={
												() => {
													removeTag( tag );
												}
											}>
											{tag}

											<X className="ml-1 h-3 w-3 cursor-pointer"/>
										</Badge>
									) )
								}
							</div>
						</div>
					</CardContent>

					<CardFooter className="flex justify-between">
						{/* Button with Tooltip */}
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										type="button"
										variant="outline">
										Help
									</Button>
								</TooltipTrigger>

								<TooltipContent>
									<p>This is a tooltip with helpful information</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>

						{/* Submit Button */}
						<Button type="submit">Submit</Button>
					</CardFooter>
				</Card>
			</form>

			{/* Modal with Loading Spinner */}
			<Dialog
				open={ showModal }
				onOpenChange={ setShowModal }>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Processing</DialogTitle>
					</DialogHeader>

					<div className="flex items-center justify-center p-6">
						<div className="flex flex-col items-center space-y-4">
							<Loader2 className="h-8 w-8 animate-spin text-primary"/>

							<p>Please wait while we process your submission...</p>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
