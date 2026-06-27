import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchDeliveryHistory } from "@/lib/api/books/data";
import DeliveryHistoryClient from "./DeliveryHistoryClient";

const DeliveryHistoryPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const deliveries = await fetchDeliveryHistory(
        session.user.email
    );
    console.log(session.user.email);

    console.log(deliveries);
    

    return (
        <DeliveryHistoryClient deliveries={deliveries} />
    );
};

export default DeliveryHistoryPage;