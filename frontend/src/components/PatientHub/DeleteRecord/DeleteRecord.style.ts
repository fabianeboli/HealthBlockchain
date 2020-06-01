import { withStyles, Theme, Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const DangerButton = withStyles((theme: Theme) => ({
	root: {
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		"&:hover": {
			backgroundColor: red[700],
		},
	},
}))(Button);
