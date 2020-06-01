import { withStyles, Theme, Button, makeStyles, createStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

export const SubmitButton = withStyles((theme: Theme) => ({
	root: {
		color: theme.palette.getContrastText(green[600]),
		backgroundColor: green[600],
		"&:hover": {
			backgroundColor: green[700],
		},
	},
}))(Button);

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1),
				// width: '100%',
			},
        },
        textField: {
            "& > *": {
				margin: theme.spacing(1),
            }
        }
	}),
);

export const mainUseStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary,
			margin: "10%",
		},
	}),
);
