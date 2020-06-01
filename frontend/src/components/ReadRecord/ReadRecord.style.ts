import { withStyles, Theme, createStyles, TableCell, TableRow } from "@material-ui/core";
import { blue, indigo } from "@material-ui/core/colors";

export const StyledTableCell = withStyles((theme: Theme) =>
	createStyles({
		head: {
			backgroundColor: indigo[600],
			color: theme.palette.getContrastText(indigo[600]),
		},
		body: {
			fontSize: 14,
		},
	}),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
	createStyles({
		root: {
			"&:nth-of-type(odd)": {
				backgroundColor: theme.palette.action.hover,
			},
		},
	}),
)(TableRow);

export const MedicalHistory = withStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: indigo[600],
			color: theme.palette.getContrastText(indigo[400]),
    },
    
	}),
)(TableCell);

export const ExaminationName = withStyles((theme: Theme) =>
	createStyles({
		root: {
			backgroundColor: indigo[400],
			color: theme.palette.getContrastText(indigo[400]),
		},
	}),
)(TableCell);
//774972
