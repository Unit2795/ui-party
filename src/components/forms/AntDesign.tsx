import {
	Button,
	Card,
	Input,
	Modal,
	Select,
	Space,
	Spin,
	Tag,
	Tooltip,
	Typography
} from "antd";
import {
	CloseOutlined
} from "@ant-design/icons";
import {
	useState
} from "react";
import {
	zodResolver
} from "@hookform/resolvers/zod";
import {
	Controller,
	useForm
} from "react-hook-form";
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

const {
	Title,
	Text
} = Typography;
const {
	Option
} = Select;

const AntDesign = () => {
	// Form handling with React Hook Form
	const {
		control,
		handleSubmit,
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
	const onSubmit = ( data: FormValues ) => {
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
				<Card
					style={
						{
							width: "100%"
						}
					}>
					{/* Card Header */}
					<div
						style={
							{
								marginBottom: "16px"
							}
						}>
						<Title
							level={ 4 }
							style={
								{
									margin: "0 0 8px 0"
								}
							}>
							{cardTitle}
						</Title>

						<Text type="secondary">{cardDescription}</Text>
					</div>

					<Space
						direction="vertical"
						size="large"
						style={
							{
								width: "100%"
							}
						}>
						{/* Input with Label */}
						<div>
							<Controller
								control={ control }
								name="name"
								render={
									( {
										field
									} ) => (
										<div>
											<Text
												strong
												style={
													{
														display: "block",
														marginBottom: "8px"
													}
												}>
												Name
											</Text>

											<Input
												{ ...field }
												placeholder="Enter your name"/>

											{
												errors.name
													? (
														<Text
															style={
																{
																	display: "block",
																	marginTop: "4px"
																}
															}
															type="danger">
															{errors.name.message}
														</Text>
													)
													: null
											}
										</div>
									)
								}/>
						</div>

						{/* Select Input */}
						<div>
							<Controller
								control={ control }
								name="category"
								render={
									( {
										field
									} ) => (
										<div>
											<Text
												strong
												style={
													{
														display: "block",
														marginBottom: "8px"
													}
												}>
												Category
											</Text>

											<Select
												{ ...field }
												placeholder="Select a category"
												style={
													{
														width: "100%"
													}
												}>
												{
													categoryOptions.map( ( category ) => (
														<Option
															key={ category }
															value={ category.toLowerCase() }>
															{category}
														</Option>
													) )
												}
											</Select>

											{
												errors.category
													? (
														<Text
															style={
																{
																	display: "block",
																	marginTop: "4px"
																}
															}
															type="danger">
															{errors.category.message}
														</Text>
													)
													: null
											}
										</div>
									)
								}/>
						</div>

						{/* Tags */}
						<div>
							<Text
								strong
								style={
									{
										display: "block",
										marginBottom: "8px"
									}
								}>
								Tags
							</Text>

							<div
								style={
									{
										display: "flex",
										flexWrap: "wrap",
										gap: "8px"
									}
								}>
								{
									tags.map( ( tag ) => (
										<Tag
											closable
											closeIcon={ <CloseOutlined /> }
											key={ tag }
											style={
												{
													padding: "4px 8px"
												}
											}
											onClose={
												() => {
													removeTag( tag );
												}
											}>
											{tag}
										</Tag>
									) )
								}
							</div>
						</div>
					</Space>

					<div
						style={
							{
								display: "flex",
								justifyContent: "space-between",
								marginTop: "24px"
							}
						}>
						<Tooltip title="This is a tooltip with helpful information">
							<Button>Help</Button>
						</Tooltip>

						<Button
							htmlType="submit"
							type="primary">
							Submit
						</Button>
					</div>
				</Card>
			</form>

			{/* Modal with Loading Spinner */}
			<Modal
				centered
				footer={ null }
				open={ showModal }
				title="Processing"
				onCancel={
					() => {
						setShowModal( false );
					}
				}>
				<div
					style={
						{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							padding: "24px"
						}
					}>
					<Spin size="large" />

					<Text
						style={
							{
								marginTop: "16px"
							}
						}>
						Please wait while we process your submission...
					</Text>
				</div>
			</Modal>
		</div>
	);
};

export default AntDesign;
