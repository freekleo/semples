import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown } from "@invitro_it/invitro-ui-kit";

import { PaymentClientTypes } from "@Client/payment-client/types";

import styles from "./SelectPayer.module.scss";
import ClientListItemModel = PaymentClientTypes.ClientListItemModel;

interface Props {
	anotherOption: string;
	isActive: boolean;
	onChange: (value: string) => void;
	clients: Array<ClientListItemModel>;
}

export const SelectPayer: FC<Props> = ({ anotherOption, isActive, onChange, clients }) => {
	const { t } = useTranslation();

	const patientMark = t("orderUpdate.patientBlock.title", { ns: "cart" });

	return (
		<Dropdown classes={styles.wrapper} onChange={(e) => onChange(e.target.value)} disabled={!isActive}>
			{clients.map((client) => {
				return (
					<Dropdown.Option key={client.id} value={client.id} selected={client.selected}>
						{client.name}
						{client.patient && ` (${patientMark})`}
					</Dropdown.Option>
				);
			})}
			<Dropdown.Option value={anotherOption}>{anotherOption}</Dropdown.Option>
		</Dropdown>
	);
};
