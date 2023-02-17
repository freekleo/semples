import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@invitro_it/invitro-ui-kit";

import { ContactType, Paths } from "@/constants/appRoutes";
import { paramsSelectors } from "@/redux/params/selectors";
import { paymentActionCreators } from "@/redux/payment/action-creators";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { PaymentClientTypes } from "@Client/payment-client/types";
import { Comment } from "@Pages/Cart/Payment/Sections/ClientSection/Comment";
import { SelectPayer } from "@Pages/Cart/Payment/Sections/ClientSection/SelectPayer";
import { Subtext } from "@Pages/Cart/Payment/Sections/ClientSection/Subtext";
import { getLinkFromPath } from "@Utils/urlHelpers";
import ClientListItemModel = PaymentClientTypes.ClientListItemModel;
import ClientModel = PaymentClientTypes.ClientModel;

interface Props {
	clients?: Array<ClientListItemModel>;
	client?: ClientModel;
	inz?: Array<string>;
	id?: string;
	comment?: string;
	isDropdownActive?: boolean;
}

const Client = memo<Props>(({ clients, client, inz, id, comment, isDropdownActive = false }) => {
	const [payer, setPayer] = useState(clients?.find((client) => client.selected));
	const orderId = useAppSelector(paramsSelectors.getOrderId);
	const finishType = useAppSelector(paramsSelectors.getFinishType);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const anotherOption = t("another", { ns: "common" });

	const goToSelectPayer = () => {
		if (orderId && finishType) {
			navigate(
				getLinkFromPath(Paths.cart.order.payment.payerSearch, {
					contactType: ContactType.PAYER,
					orderId,
					finishType,
				})
			);
		}
	};

	const selectPayer = (id: string) => {
		if (id === anotherOption) {
			goToSelectPayer();
		} else {
			const newPayer: ClientListItemModel | undefined = clients?.find((client) => client.id === id);
			if (newPayer) {
				if (orderId && newPayer.id !== payer?.id) {
					dispatch(paymentActionCreators.setPayer({ contactId: newPayer.id, orderId }));
				}
				setPayer(newPayer);
			}
		}
	};

	return (
		<>
			{clients && (
				<SelectPayer
					anotherOption={anotherOption}
					isActive={isDropdownActive}
					onChange={selectPayer}
					clients={clients}
				/>
			)}
			{client && <Button type="link">{client.name}</Button>}

			{inz && (
				<Subtext text={t("discrepancy.list.table.orderProduct.INZ", { ns: "errors" }) + " " + inz.join(", ")} />
			)}

			{id && <Subtext text={t("Order.title", { ns: "orders" }) + " " + id} />}
			{comment && comment !== " " && <Comment text={comment} />}
		</>
	);
});

Client.whyDidYouRender = true;

export default Client;
