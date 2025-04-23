import {
	useState
} from "react";
import {
	SubmitHandler,
	useForm
} from "react-hook-form";
import {
	zodResolver
} from "@hookform/resolvers/zod";
import {
	cardDescription,
	cardTitle,
	categoryOptions,
	tagValues
} from "@/shared.ts";
import {
	FormValues,
	formSchema
} from "@/zod/schema.ts";

const DaisyUI = () => {
	// Form handling with React Hook Form
	const {
		register,
		handleSubmit,
		setValue,
		formState: {
			errors
		}
	} = useForm<FormValues>( {
		resolver: zodResolver( formSchema ),
		defaultValues: {
			name: "",
			category: "",
		},
	} );

	// Tags state
	const [ tags, setTags ] = useState( tagValues );

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
			2000
		);
	};

	const removeTag = ( tagToRemove: string ) => {
		setTags( tags.filter( ( tag ) => tag !== tagToRemove ) );
	};

	return (
		<div className="max-w-md mx-auto">
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="card bg-white shadow-md border border-gray-100">
					<div className="card-body">
						{/* Card Header */}
						<div className="mb-4">
							<h2 className="card-title text-xl font-bold text-gray-900">{cardTitle}</h2>

							<p className="text-sm text-gray-500">{cardDescription}</p>
						</div>

						{/* Input with Label */}
						<div className="form-control w-full mb-4">
							<label className="label">
								<span className="label-text text-gray-700 font-medium">Name</span>
							</label>

							<input
								className={ `input input-bordered  bg-white text-gray-900 w-full ${ errors.name ? "input-error" : "" }` }
								placeholder="Enter your name"
								type="text"
								{ ...register( "name" ) }/>

							{
								errors.name
									? (
										<label className="label">
											<span className="label-text-alt text-error">{errors.name.message}</span>
										</label>
									)
									: null
							}
						</div>

						{/* Select Input */}
						<div className="form-control w-full mb-4">
							<label className="label">
								<span className="label-text text-gray-700 font-medium">Category</span>
							</label>

							<select
								className={ `select select-bordered bg-white text-gray-900 w-full ${ errors.category ? "select-error" : "" }` }
								defaultValue=""
								onChange={
									( e ) => {
										setValue(
											"category",
											e.target.value,
											{
												shouldValidate: true
											}
										);
									}
								}>
								<option
									disabled
									value="">
									Select a category
								</option>

								{
									categoryOptions.map( ( category ) => (
										<option
											key={ category }
											value={ category.toLowerCase() }>
											{category}
										</option>
									) )
								}
							</select>

							{
								errors.category
									? (
										<label className="label">
											<span className="label-text-alt text-error">{errors.category.message}</span>
										</label>
									)
									: null
							}
						</div>

						{/* Tags */}
						<div className="form-control w-full mb-4">
							<label className="label">
								<span className="label-text text-gray-700 font-medium">Tags</span>
							</label>

							<div className="flex flex-wrap gap-2">
								{
									tags.map( ( tag ) => (
										<div
											className="badge badge-outline badge-lg gap-1 bg-white text-gray-700"
											key={ tag }>
											{tag}

											<button
												className="btn btn-ghost btn-xs btn-circle"
												type="button"
												onClick={
													() => {
														removeTag( tag );
													}
												}>
												✕
											</button>
										</div>
									) )
								}
							</div>
						</div>

						{/* Card Actions */}
						<div className="card-actions justify-between mt-4">
							<div
								className="tooltip"
								data-tip="This is a tooltip with helpful information">
								<button
									className="btn bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
									type="button">
									Help
								</button>
							</div>

							<button
								className="btn bg-blue-500 hover:bg-blue-600 text-white border-none"
								type="submit">
								Submit
							</button>
						</div>
					</div>
				</div>
			</form>

			{/* Modal with Loading Spinner */}
			{
				showModal
					? (
						<div className="modal modal-open">
							<div className="modal-box relative bg-white text-gray-900">
								<h3 className="font-bold text-lg text-center">Processing</h3>

								<div className="flex flex-col items-center justify-center py-6">
									<span className="loading loading-spinner loading-lg text-blue-500" />

									<p className="mt-4 text-gray-700">Please wait while we process your submission...</p>
								</div>
							</div>

							<div
								className="modal-backdrop"
								onClick={
									() => {
										setShowModal( false );
									}
								} />
						</div>
					)
					: null
			}
		</div>
	);
};

export default DaisyUI;
