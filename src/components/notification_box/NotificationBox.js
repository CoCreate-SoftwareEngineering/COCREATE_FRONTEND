import { useState } from "react";
import "./NotificationBox.css";

/* It is important that the parent container has display: inline or display: flex (with row) so that this box is next to whatever text you want it next to */
const NotificationBox = ({ num }) => {
	return <>{num > 0 && <span className="noti-box">{num}</span>}</>;
};

export default NotificationBox;
