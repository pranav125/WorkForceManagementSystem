function validateForm(text_ssn) {
		var pattern = /^\d{3}-\d{2}-\d{4}$/;
		if (text_ssn.match(pattern))
			return true;
		else
			return false;
	}
