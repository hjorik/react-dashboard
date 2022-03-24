import React from 'react';
import PropTypes from "prop-types";

function TagSelection({nav}) {
  	return (
		<option value={nav.tag}>{nav.title}</option>
  	);
}

TagSelection.propTypes = {
	nav: PropTypes.object.isRequired
};

export default TagSelection