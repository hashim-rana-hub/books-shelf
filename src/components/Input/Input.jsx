const Input = ({ label, value, type, multiline, handleChange }) => {
	return (
		<div className="formElement">
			<label htmlFor={label}>{label}</label>
			{multiline ? (
				<textarea name={label} value={value} onChange={handleChange} />
			) : (
				<input
					type={type || "text"}
					id={label}
					name={label}
					onChange={handleChange}
					value={value}
				/>
			)}
		</div>
	);
};

export default Input;
