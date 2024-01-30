const Input = ({
	label,
	value,
	type,
	multiline,
	handleChange,
	error,
	disabled,
	name,
}) => {
	return (
		<div className="formElement">
			<label htmlFor={label}>{label}</label>
			{multiline ? (
				<textarea name={label} value={value} onChange={handleChange} />
			) : (
				<div>
					<input
						type={type || "text"}
						id={label}
						name={name}
						onChange={handleChange}
						value={value}
						disabled={disabled}
					/>
					{error && <p>{error}</p>}
				</div>
			)}
		</div>
	);
};

export default Input;
