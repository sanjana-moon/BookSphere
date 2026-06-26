import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { fetchDeliveries } from "@/lib/api/books/data";
import DeliveryClient from "./DeliveryClient";

const DeliveryPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Unauthorized</div>;
    }

    const deliveries = await fetchDeliveries(session.user.email);

    return <DeliveryClient deliveries={deliveries} />;
};

export default DeliveryPage;