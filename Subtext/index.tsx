import React, { memo } from "react";

import styles from "./Subtext.module.scss";

interface Props {
	text: string;
}

export const Subtext = memo<Props>(({ text }) => {
	return <div className={styles.subtext}>{text}</div>;
});
