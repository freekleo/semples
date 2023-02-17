import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { Subtext } from "@Pages/Cart/Payment/Sections/ClientSection/Subtext";

import styles from "./Comment.module.scss";

interface Props {
	text: string;
}

export const Comment = memo<Props>(({ text }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.comment}>{t("orderUpdate.patientBlock.commentary", { ns: "cart" })}</div>
			<Subtext text={text} />
		</>
	);
});
