import { useQuery } from "react-query";
import { getBookList } from "../api";

export function useBooksList() {
	return useQuery({
		queryKey: ["book-list"],
		queryFn: () => getBookList(),
		enabled: true,
	});
}
