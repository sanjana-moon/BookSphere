import { fetchTransactions } from "@/lib/api/books/data";
import AllTransactionClient from "./AllTransactionClient";


const AllTransactionPage = async () => {
    const transactions = await fetchTransactions();

    return (
        <AllTransactionClient
            transactions={transactions}
        />
    );
};

export default AllTransactionPage;