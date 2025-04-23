import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	CircularProgress,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Tooltip,
	Typography
} from "@mui/material";
import {
	Close
} from "@mui/icons-material";
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
	FormValues,
	formSchema
} from "@/zod/schema.ts";
import {
	cardDescription,
	cardTitle,
	categoryOptions,
	tagValues
} from "@/shared.ts";

const MUI = () => {
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
		<div
			style={
				{
					maxWidth: "500px",
					margin: "0 auto"
				}
			}>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<Card elevation={ 3 }>
					<CardHeader
						subheader={ cardDescription }
						title={ cardTitle }/>

					<CardContent
						sx={
							{
								display: "flex",
								flexDirection: "column",
								gap: 3
							}
						}>
						{/* Input with Label */}
						<TextField
							fullWidth
							label="Name"
							placeholder="Enter your name"
							{ ...register( "name" ) }
							error={ Boolean( errors.name ) }
							helperText={ errors.name?.message }/>

						{/* Select Input */}
						<FormControl
							error={ Boolean( errors.category ) }
							fullWidth>
							<InputLabel id="category-select-label">Category</InputLabel>

							<Select
								defaultValue=""
								label="Category"
								labelId="category-select-label"
								onChange={
									( e ) => {
										setValue(
											"category",
											e.target.value,
											{
												shouldValidate: true,
											}
										);
									}
								}>
								{
									categoryOptions.map( ( category ) => (
										<MenuItem
											key={ category }
											value={ category }>
											{ category }
										</MenuItem>
									) )
								}
							</Select>

							{
								errors.category ? <FormHelperText>{errors.category.message}</FormHelperText> : null
							}
						</FormControl>

						{/* Chips (Badges) */}
						<Box>
							<Typography
								sx={
									{
										mb: 1
									}
								}
								variant="body2">
								Tags
							</Typography>

							<Box
								sx={
									{
										display: "flex",
										flexWrap: "wrap",
										gap: 1
									}
								}>
								{
									tags.map( ( tag ) => (
										<Chip
											deleteIcon={ <Close fontSize="small" /> }
											key={ tag }
											label={ tag }
											onDelete={
												() => {
													removeTag( tag );
												}
											}/>
									) )
								}
							</Box>
						</Box>
					</CardContent>

					<CardActions
						sx={
							{
								display: "flex",
								justifyContent: "space-between",
								p: 2
							}
						}>
						<Tooltip title="This is a tooltip with helpful information">
							<Button variant="outlined">Help</Button>
						</Tooltip>

						<Button
							type="submit"
							variant="contained">
							Submit
						</Button>
					</CardActions>
				</Card>
			</form>

			{/* Modal with Loading Spinner */}
			<Modal
				aria-labelledby="modal-title"
				open={ showModal }
				onClose={
					() => {
						setShowModal( false );
					}
				}>
				<Box
					sx={
						{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: 400,
							bgcolor: "background.paper",
							borderRadius: 2,
							boxShadow: 24,
							p: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 2
						}
					}>
					<Typography
						component="h2"
						id="modal-title"
						variant="h6">
						Processing
					</Typography>

					<CircularProgress />

					<Typography variant="body1">
						Please wait while we process your submission...
					</Typography>
				</Box>
			</Modal>
		</div>
	);
};

export default MUI;
